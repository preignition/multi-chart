import { select } from 'd3-selection';
import { camelToDashCase, dashToCamelCase } from '@polymer/polymer/lib/utils/case-map.js';

// Capitalize the first letter od a word.
const capitalize = str => str[0].toUpperCase() + str.slice(1)

//  fitTo set transform attribute of source so that it fits target container.
const fitTo = (source, target, factor = 0.05, duration) => {

  let sel = select(source);

  if (duration) {
    sel = sel.transition().duration(duration)
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
    scale = factor / Math.max(dx / targetRect.width, dy / targetRect.height),
    translate = [targetRect.width / 2 - scale * x, targetRect.height / 2 - scale * y];

  sel.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ') scale(' + scale + ')');
};

const shapeProperties = (keys, props = {}) =>  {
  keys.forEach(key => {
    if (!props[key]) {
      props[key] = {
        type: Function,
        attribute: camelToDashCase(key)
      }
    }
  })
  return props;
}

export {
  fitTo,
  capitalize,
  camelToDashCase,
  dashToCamelCase,
  shapeProperties
};