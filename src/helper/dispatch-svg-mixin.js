import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * ##  DispatchSVG
 * 
 * dispatch template elements marked as slot-svg="svgID" to svgHost
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */

const DispatchSVG = dedupingMixin(superClass => {

  return class extends superClass {

    static get properties() {
      
      return {

        ...super.properties,

        /* 
         * `svgHost` the host to which [slog-svg] nodes must be stamped
         */
        svgHost: {
          type: Object,
          attribute: 'svg-host'
        }

      };
    }

    constructor() {
      super();
      this._hostedNodes = {};
    }

    getHostedNode(target) {
      return this._hostedNodes[target] || null;
    }

    update(props) {
      super.update(props);
      if(props.has('svgHost')) {
        if(this.svgHost && this.resize) {
          this.resize(this.svgHost.width, this.svgHost.height);     
        }
        this.observeSvgHost(this.svgHost,  props.get('svgHost'));
      }
    }

    observeSvgHost(host, old) {
      if (host && this.renderRoot) {
        this.renderRoot.querySelectorAll('[slot-svg]').forEach(node => {
          const target = node.getAttribute('slot-svg');
          const targetNode = (host.$ && host.$[target])|| host.renderRoot.querySelector(`#${target}`);
          if (targetNode) {
            this._hostedNodes[node.id || target] = node;
            return targetNode.appendChild(node);
          }
          throw new Error(`cannot dispatch node ${target}`);
        });
        this.setHostStyle(host, old);
      }
      if (host === null && old) {
        Object.keys(this._hostedNodes).forEach(k => {
          this.renderRoot.appendChild(this._hostedNodes[k]);
          delete this._hostedNodes[k];
        });
      }
    }

    getRootHost(host) {
      while (host.svgHost) {
        host = host.svgHost;
      }
      return host;
    }

    // Note(cg): hack to inject style in host.
    setHostStyle(host) {
      if(this.constructor.hostStyles) {
        const name = this.constructor.name;
        host = this.getRootHost(host);
        if(!host.renderRoot.querySelector(`style[id=${name}]`)) {
          const st = document.createElement('style')
          st.id = name;
          st.innerHTML = this.constructor.hostStyles.cssText;
          host.renderRoot.appendChild(st);

        }
      }
    }

    // Note(cg): after Register is called by `multi-register-mixin` (multi-container-svg) once 
    afterRegister(host, containerName = 'svgHost') {
      this[containerName] = host;
    }

    afterUnregister(host, containerName = 'svgHost') {
      this[containerName] = null;
    }

    /* 
     * `postRemove` is called by `multi-registerable-mixin` on disconnectedCallback. 
     * It unregisters this element from svgHost. 
     */
    postRemove() {
      if (this.svgHost && this.svgHost.unregister) {
        this.svgHost.unregister(this);
      }
      super.postRemove && super.postRemove();
    }

  };
});

/*
 * @mixinFunction
 */
export default DispatchSVG ;
