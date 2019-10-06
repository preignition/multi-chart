import { css } from 'lit-element';
import { select, selectAll } from 'd3-selection';
import { MultiChartBase } from '../base-class';
// import { LitNotify } from '@morbidick/lit-element-notify';
// import { DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { default as DispatchSVG } from './dispatch-svg-mixin.js';
import { default as MultiRegisterable } from './multi-registerable-mixin.js';
import { default as TrackHover } from './track-hover-mixin.js';

const properties = {
  /**
   * Gets or sets the selected element. The default is to use the index of the
   * item.
   * @type {string|number}
   */
  selected: { type: String, notify: true },

  /**
   * Returns the currently selected item.
   *
   * @type {?Object}
   */
  selectedItem: { type: Object, notify: true },

  /**
   * If true, multiple selections are allowed.
   */
  multi: { type: Boolean, value: false },

  /**
   * Gets or sets the selected elements. This is used instead of `selected`
   * when `multi` is true.
   */
  selectedValues: {
    type: Array,
    notify: true,
    value: []
  },

  /**
   * Returns an array of currently selected items.
   */
  selectedItems: {
    type: Array,
    notify: true,
    value: []
  },
  
  /* 
   * `selecType` for charts that can implement brush and select at the same time (e.g. bar), set 'brush' to acticate brush. 
   * Otherwise, default behavior is 'select'
   */
  selectType: {
    type: String,
    value: ''
  }

}

/**
 * ## MultiSelect
 *
 * `<multi-select>` is an element for selecting ranges or chart shapes. 
 *  
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.DispatchSVG
 * @appliesMixin MultiChart.mixin.MultiRegisterable
 * @appliesMixin MultiChart.mixin.TrackHover
 * @demo
 **/
class MultiSelect extends
DispatchSVG(
  MultiRegisterable(
    TrackHover(
      MultiChartBase))) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `
      .selectable {
        cursor: pointer;
      }
      
      :host([has-selection]) .selectable {
        opacity: 0.7;
      }

      :host([has-selection]) [selected] {
        opacity: 1;
        @apply --multi-select-selected;
      }

      :host([is-hovered]) rect, :host([is-hovered]) .selectable
      {
        opacity: 0.7;
        @apply --multi-select-hovered;
      }    

      :host([is-hovered]) [hovered] rect,  :host([is-hovered]) .selectable[hovered] {
        opacity: 1;
        @apply --multi-select-selected;
      }    

      /* For muilt-graph */
      / :host([is-hovered]) .selectable[hovered] polygon,
      :host([is-hovered]) .selectable[hovered] ellipse,
      :host([is-hovered]) .selectable[hovered] rect {
        @apply --multi-select-selected-inner;
      }
    */
    `
  }

  static get properties() {
    return {

      ...super.properties,

      ...properties,
      /* 
       * `registerOrder` - registerable elements are sorted on the basis of this property. 
       * `multi-select` need to be last in the list of registered items, so that we attach 
       * events after all shapes are drawn.
       */
      registerOrder: {
        type: Number,
        attribute: 'register-order',
        value: 100
      },

      /**
       * If you want to use an attribute value or property of an element for
       * `selected` instead of the index, set this to the name of the attribute
       * or property. Hyphenated values are converted to camel case when used to
       * look up the property of a selectable element. Camel cased values are
       * *not* converted to hyphenated values for attribute lookup. It's
       * recommended that you provide the hyphenated form of the name so that
       * selection works in both cases. (Use `attr-or-property-name` instead of
       * `attrOrPropertyName`.)
       */
      attrForSelected: {
        type: String,
        value: 'key'
      },


      /**
       * The attribute to set on elements when selected.
       */
      selectedAttribute: {
        type: String,
        value: 'selected'
      }
    };
  }

  update(props) {
    super.update(props)
    if (props.has('selectedValues')) {
      this.updateSelectedValues();
    }
    if (props.has('selected')) {
      this.updateSelected();
    }
  }

  dataChanged() {
    this.attachListeners();
  }

  onDrawn() {
    this.attachListeners();
    this.reSelect();
  }

  reSelect() {
    if (this.multi) {
      this.updateSelectedValues();
    } else {
      this.updateSelected();
    }

    // if (this.selectedItems.length) {
    //   this.selectedItems.forEach(item => this.select(item));
    // } else if (this.selected) {
    //   const s = this.selected;
    //   this.select(null);
    //   this.select(s);
    // }

  }

  postRemove() {
    this.detatchListeners();
  }

  /* 
   * `attachListeners` listen to click, mouseenter and mouseleave and 
   * fires their respective `multi` events (`multi-tap`, `multi-mouse-enter` and `multi-mouse-leave`)
   */
  attachListeners() {
    const me = this;
    const sel = this.selectableItems
      .on('click', function(d, i) { me.onClick(d, i, this); });

    // attach Listeners in TrackHover
    if (super.attachListeners) {
      super.attachListeners(sel);
    }
  }

  detatchListeners() {
    const sel = this.selectableItems.on('click', null);

    // detatch Listeners in TrackHover
    if (super.detatchListeners) {
      super.detatchListeners(sel);
    }
  }

  getKey(d, el) {
    const keyHolder = this.attrForSelected;
    return d.data ? d.data[keyHolder] : d[keyHolder] || d.__key__ || el.getAttribute(keyHolder) || el.dataset[keyHolder] || d;
  }

  onClick(d, i, el) {
    // handle selection 
    const key = this.getKey(d, el);
    if (!key) {
      this._error(`unable to fetch key`);
    }
    if (!this.multi && key === this.selected) {
      this.select(null);
    } else {
      this.select(key);
    }
    // let the world know we have a multi-tap event.
    this.dispatchEvent(new CustomEvent('multi-tap', { detail: { data: d, index: i, element: el }, bubbles: true, composed: true }));
  }

  select(value) {
    if (this.multi) {
      let wasSelected = false;
      const selectedValues = this.selectedValues.filter(val => {
        if (val === value) {
          wasSelected = false;
          return false
        }
        return true
      })
      if (wasSelected) {
        selectedValues.push(value);
      }
      this.selectedValues = selectedValues;
      return;
    }
    this.selected = value;
  }

  get selectableItems() {
    return this.svgHost && select(this.svgHost.renderRoot).selectAll('.selectable') || selectAll();
  }

  updateSelected() {
    const selected = this.selected;
    const me = this;
    let item = null;
    this.selectableItems.attr(this.selectedAttribute, function(d, i) {
      if (me.getKey(d, this) === selected) {
        item = this;
        return true;
      }
      return null;
    })
    this.selectedItem = item;
    this._updateSelected()
  }

  updateSelectedValues() {
    const selected = this.selectedValues;
    const me = this;
    const items = [];
    this.selectableItems.attr(this.selectedAttribute, function(d, i) {
      if (selected.indexOf(me.getKey(d, this)) > -1) {
        items.push(this);
        return true;
      }
      return null;
    })
    this.selectedItems = items;
    this._updateSelected()
  }

  get _hasSelection() {
    return this.multi ? this.selectedValues && this.selectedValues.length : !!this.selected;
  }
  /* 
   * `_updateSelected` will set `has-selection` attribute to svgHost. 
   * This is used in multi-container-svg css rules.
   */
  _updateSelected() {
    // super._updateSelected();
    if (this.svgHost) {
      select(this.svgHost).attr('has-selection', this._hasSelection ? true : null);
    }
    // Note(cg): use multi select event to potentially inform multi-verse elementes that we have a selection
    this.dispatchEvent(new CustomEvent('multi-select', {
      detail: {
        isRange: false,
        selection: this.multi ? [...this.selectedValues] : this.selected
      },
      bubbles: true,
      composed: true
    }));
  }

}

export default MultiSelect;