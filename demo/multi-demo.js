window.MultiChart = window.MultiChart || {};
window.MultiChart.Demo = superClass => {
  return class extends superClass {
    static get properties() {
      return {
      };
    }
    
    static rnd(keys, max) {
        var r = d3.randomUniform(max);
        return keys.map(function(d, i) {
          return { key: d, value: { count: r() } };
        });
    }

    static multipleRnd(keys, max, size= 8) {
      return d3.range(size).map(function(d,i) {
        var value = {};
        var r = d3.randomUniform(max);
        keys.forEach(function(k){
          value[k] = r();
        });
        return {key: i, value: value};
      });
    }
  };
};

window.addEventListener('WebComponentsReady', () => {
  document.body.removeAttribute('unresolved');
});
