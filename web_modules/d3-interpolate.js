import { r as rgb, c as color, h as hsl$2, l as lab$1, a as hcl$2, b as cubehelix$2 } from './common/index-a99c6aaf.js';

function basis(t1, v0, v1, v2, v3) {
  const t2 = t1 * t1;
      const t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis$1 (values) {
  const n = values.length - 1;
  return function (t) {
    const i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n);
        const v1 = values[i];
        const v2 = values[i + 1];
        const v0 = i > 0 ? values[i - 1] : 2 * v1 - v2;
        const v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function basisClosed (values) {
  const n = values.length;
  return function (t) {
    const i = Math.floor(((t %= 1) < 0 ? ++t : t) * n);
        const v0 = values[(i + n - 1) % n];
        const v1 = values[i % n];
        const v2 = values[(i + 1) % n];
        const v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function constant (x) {
  return function () {
    return x;
  };
}

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  const d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  const d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

const interpolateRgb = (function rgbGamma(y) {
  const color = gamma(y);

  function rgb$1(start, end) {
    const r = color((start = rgb(start)).r, (end = rgb(end)).r);
        const g = color(start.g, end.g);
        const b = color(start.b, end.b);
        const opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return `${start  }`;
    };
  }

  rgb$1.gamma = rgbGamma;
  return rgb$1;
})(1);

function rgbSpline(spline) {
  return function (colors) {
    const n = colors.length;
        let r = new Array(n);
        let g = new Array(n);
        let b = new Array(n);
        let i;
        let color;

    for (i = 0; i < n; ++i) {
      color = rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }

    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return `${color  }`;
    };
  };
}

const rgbBasis = rgbSpline(basis$1);
const rgbBasisClosed = rgbSpline(basisClosed);

function array (a, b) {
  const nb = b ? b.length : 0;
      const na = a ? Math.min(nb, a.length) : 0;
      const x = new Array(na);
      const c = new Array(nb);
      let i;

  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);

  for (; i < nb; ++i) c[i] = b[i];

  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);

    return c;
  };
}

function date (a, b) {
  const d = new Date();
  return a = +a, b -= a, function (t) {
    return d.setTime(a + b * t), d;
  };
}

function interpolateNumber (a, b) {
  return a = +a, b -= a, function (t) {
    return a + b * t;
  };
}

function object (a, b) {
  const i = {};
      const c = {};
      let k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) c[k] = i[k](t);

    return c;
  };
}

const reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    const reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return `${b(t)  }`;
  };
}

function interpolateString (a, b) {
  let bi = reA.lastIndex = reB.lastIndex = 0;
      // scan index for next number in b
  let am;
      // current match in a
  let bm;
      // current match in b
  let bs;
      // string preceding current number in b, if any
  let i = -1;
      // index in s
  const s = [];
      // string constants and placeholders
  const q = []; // number interpolators
  // Coerce inputs to strings.

  a += "", b += ""; // Interpolate pairs of numbers in a & b.

  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i,
        x: interpolateNumber(am, bm)
      });
    }

    bi = reB.lastIndex;
  } // Add remains of b.


  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  } // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.


  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);

    return s.join("");
  });
}

function value (a, b) {
  const t = typeof b;
      let c;
  return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, interpolateRgb) : interpolateString : b instanceof color ? interpolateRgb : b instanceof Date ? date : Array.isArray(b) ? array : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
}

function discrete (range) {
  const n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

function hue$1 (a, b) {
  const i = hue(+a, +b);
  return function (t) {
    const x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}

function round (a, b) {
  return a = +a, b -= a, function (t) {
    return Math.round(a + b * t);
  };
}

const degrees = 180 / Math.PI;
const identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose (a, b, c, d, e, f) {
  let scaleX; let scaleY; let skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

let cssNode; let cssRoot; let cssView; let svgNode;
function parseCss(value) {
  if (value === "none") return identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? `${s.pop()  } ` : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      const i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: interpolateNumber(xa, xb)
      }, {
        i: i - 2,
        x: interpolateNumber(ya, yb)
      });
    } else if (xb || yb) {
      s.push(`translate(${  xb  }${pxComma  }${yb  }${pxParen}`);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path

      q.push({
        i: s.push(`${pop(s)  }rotate(`, null, degParen) - 2,
        x: interpolateNumber(a, b)
      });
    } else if (b) {
      s.push(`${pop(s)  }rotate(${  b  }${degParen}`);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(`${pop(s)  }skewX(`, null, degParen) - 2,
        x: interpolateNumber(a, b)
      });
    } else if (b) {
      s.push(`${pop(s)  }skewX(${  b  }${degParen}`);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      const i = s.push(`${pop(s)  }scale(`, null, ",", null, ")");
      q.push({
        i: i - 4,
        x: interpolateNumber(xa, xb)
      }, {
        i: i - 2,
        x: interpolateNumber(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(`${pop(s)  }scale(${  xb  },${  yb  })`);
    }
  }

  return function (a, b) {
    const s = [];
        // string constants and placeholders
    const q = []; // number interpolators

    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc

    return function (t) {
      let i = -1;
          const n = q.length;
          let o;

      while (++i < n) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    };
  };
}

const interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
const interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

const rho = Math.SQRT2;
    const rho2 = 2;
    const rho4 = 4;
    const epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
} // p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]


function zoom (p0, p1) {
  const ux0 = p0[0];
      const uy0 = p0[1];
      const w0 = p0[2];
      const ux1 = p1[0];
      const uy1 = p1[1];
      const w1 = p1[2];
      const dx = ux1 - ux0;
      const dy = uy1 - uy0;
      const d2 = dx * dx + dy * dy;
      let i;
      let S; // Special case for u0 ≅ u1.

  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;

    i = function i(t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
    };
  } // General case.
  else {
      const d1 = Math.sqrt(d2);
          const b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1);
          const b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1);
          const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
          const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;

      i = function i(t) {
        const s = t * S;
            const coshr0 = cosh(r0);
            const u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }

  i.duration = S * 1000;
  return i;
}

function hsl(hue) {
  return function (start, end) {
    const h = hue((start = hsl$2(start)).h, (end = hsl$2(end)).h);
        const s = nogamma(start.s, end.s);
        const l = nogamma(start.l, end.l);
        const opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return `${start  }`;
    };
  };
}

const hsl$1 = hsl(hue);
const hslLong = hsl(nogamma);

function lab(start, end) {
  const l = nogamma((start = lab$1(start)).l, (end = lab$1(end)).l);
      const a = nogamma(start.a, end.a);
      const b = nogamma(start.b, end.b);
      const opacity = nogamma(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return `${start  }`;
  };
}

function hcl(hue) {
  return function (start, end) {
    const h = hue((start = hcl$2(start)).h, (end = hcl$2(end)).h);
        const c = nogamma(start.c, end.c);
        const l = nogamma(start.l, end.l);
        const opacity = nogamma(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return `${start  }`;
    };
  };
}

const hcl$1 = hcl(hue);
const hclLong = hcl(nogamma);

function cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      const h = hue((start = cubehelix$2(start)).h, (end = cubehelix$2(end)).h);
          const s = nogamma(start.s, end.s);
          const l = nogamma(start.l, end.l);
          const opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return `${start  }`;
      };
    }

    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  }(1);
}

const cubehelix$1 = cubehelix(hue);
const cubehelixLong = cubehelix(nogamma);

function piecewise(interpolate, values) {
  let i = 0;
      const n = values.length - 1;
      let v = values[0];
      const I = new Array(n < 0 ? 0 : n);

  while (i < n) I[i] = interpolate(v, v = values[++i]);

  return function (t) {
    const i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}

function quantize (interpolator, n) {
  const samples = new Array(n);

  for (let i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));

  return samples;
}

export { value as interpolate, array as interpolateArray, basis$1 as interpolateBasis, basisClosed as interpolateBasisClosed, cubehelix$1 as interpolateCubehelix, cubehelixLong as interpolateCubehelixLong, date as interpolateDate, discrete as interpolateDiscrete, hcl$1 as interpolateHcl, hclLong as interpolateHclLong, hsl$1 as interpolateHsl, hslLong as interpolateHslLong, hue$1 as interpolateHue, lab as interpolateLab, interpolateNumber, object as interpolateObject, interpolateRgb, rgbBasis as interpolateRgbBasis, rgbBasisClosed as interpolateRgbBasisClosed, round as interpolateRound, interpolateString, interpolateTransformCss, interpolateTransformSvg, zoom as interpolateZoom, piecewise, quantize };
