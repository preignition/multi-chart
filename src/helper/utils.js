import { select } from 'd3-selection';
import { camelToDashCase, dashToCamelCase } from '@polymer/polymer/lib/utils/case-map.js';

// Capitalize the first letter od a word.
const capitalize = str => str[0].toUpperCase() + str.slice(1);

//  fitTo set transform attribute of source so that it fits target container.
const fitTo = (source, target, factor = 0.95, duration) => {

  let sel = select(source);

  if (duration) {
    sel = sel.transition().duration(duration);
  }

  if (!target) {
    // Note(cg): reset.
    return sel.attr('transform', 'translate(0,0)scale(1)');
  }

  sel.attr('transform', null);

  const sourceRect = source.getBoundingClientRect(),
    dx = sourceRect.width,
    dy = sourceRect.height;

  if (!dx || !dy) {
    return;
  }
  const targetRect = target.getBoundingClientRect(),
    x = (-sourceRect.left + sourceRect.right) / 2,
    y = (-sourceRect.top + sourceRect.bottom) / 2,
    xOffset = targetRect.x - sourceRect.x,
    yOffset = targetRect.y - sourceRect.y,
    scale = factor / Math.max(dx / targetRect.width, dy / targetRect.height),
    translate = [xOffset * scale + (targetRect.width / 2 - scale * x), yOffset * scale + (targetRect.height / 2 - scale * y)];

  sel.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ') scale(' + scale + ')');
};

const shapeProperties = (keys, props = {}) => {
  keys.forEach(key => {
    if (!props[key]) {
      props[key] = {
        type: Function,
        attribute: camelToDashCase(key)
      };
    }
  });
  return props;
};

// Note(cg): from https://bl.ocks.org/mbostock/7555321.
const wrap = (text, width) => {
  text.each(function() {

    const text = select(this),
      words = text.text().split(/\s+/).reverse(),
      lineHeight = 1.1, // ems
      y = text.attr('y'),
      x = text.attr('x'),
      dy = parseFloat(text.attr('dy'));
   
    let word,
      line = [],
      lineNumber = 0,
      tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        // tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
      }
    }
  });
};

export {
  fitTo,
  capitalize,
  camelToDashCase,
  dashToCamelCase,
  shapeProperties,
  wrap
};
