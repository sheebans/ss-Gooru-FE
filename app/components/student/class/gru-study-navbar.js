import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gru-study-navbar'],

  session: Ember.inject.service('session'),


  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      let component = this;
      if (component.get('onItemSelected')) {
        component.selectItem(item);
        if (item === 'class-info') {
          $('.classroom-information').toggle({ direction: 'left' }, 1000);
        } else {
          component.sendAction('onItemSelected', item);
        }
      }
    },

    /**
     * Triggered when a menu item is selected. Set the class icon for the item selected showing in the mobiles dropdown menu.
     */
    toggleHeader: function() {
      this.set('toggleState', !this.get('toggleState'));
      if (this.onCollapseExpandClicked) {
        this.sendAction('onCollapseExpandClicked', this.get('toggleState'));
      }
    },

    /**
     * Action triggered when click brand logo
     */
    onClickBrand() {
      Ember.$('body').removeClass('fullscreen').removeClass('fullscreen-exit');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    let component = this;
    var item = component.get('selectedMenuItem');
    component.selectItem(item);
    if (component.get('isStudyPlayer')) {
      Ember.$('body').removeClass('fullscreen-exit');
      if (component.get('isFullScreen')) {
        Ember.$('body').addClass('fullscreen');
      }
    } else {
      Ember.$('body').addClass('fullscreen-exit');
    }

  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('selectedMenuItem', null);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class
   */
  class: null,

  /**
   * @property {String|Function} onItemSelected - event handler for when an menu item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedMenuItem - menu Item selected
   */
  selectedMenuItem: null,

  /**
   * @property {boolean|Function} onCollapseExpandClicked - event handler for when the toggle button is clicked
   */
  onCollapseExpandClicked: null,

  /**
   * @property {boolean} toggleState - indicates the toggle button state, false means open, true means closed
   */
  toggleState: false,

  sourceType: null, // 'IlActivity/Other'

  hasClassInfo: null,

  navTitle: null,

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected menu item
   */
  refreshSelectedMenuItem: function() {
    var item = this.get('selectedMenuItem');
    this.selectItem(item);
  }.observes('selectedMenuItem'),

  // -------------------------------------------------------------------------

  // Methods
  /**
   * Triggered when a menu item is selected. Set the class icon for the item selected showing in the mobiles dropdown menu.
   * @param {string} item
   */
  selectItem: function(selection) {
    if (selection) {
      let item = selection;
      let itemElement = `.${item}`;
      if (item === 'class-info') {
        this.$(itemElement).removeClass('vactive');
        return false;
      } else {
        this.$('.tab').removeClass('vactive');
        this.$(itemElement).addClass('vactive');
      }
    }
  }
});
