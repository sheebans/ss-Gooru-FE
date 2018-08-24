import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Teacher class navigation
 *
 * Component responsible for enabling more flexible navigation options for the teacher class.
 * For example, where {@link teacher/class/gru-class-nav-bar.js}} allows access the teacher class information and navigate through the menu options.
 * @module
 * @see controllers/teacher/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-navbar', 'teacher'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    onOpenCourseReport() {
      let component = this;
      component.sendAction('onOpenCourseReport');
    },

    onOpenPerfReport() {
      let component = this;
      if (component.get('isPremiumClass')) {
        component.sendAction('onOpenCompetencyReport');
      } else {
        component.sendAction('onOpenCourseReport');
      }
    },

    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      let isPremiumClass = this.get('isPremiumClass');
      if (this.get('onItemSelected')) {
        if (!(item === 'performance' && isPremiumClass)) {
          this.selectItem(item);
        }
        this.sendAction('onItemSelected', item);
        if (item === 'class-info') {
          $('.classroom-information').toggleClass('hide-classroom-information');
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
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('selectedMenuItem');
    this.selectItem(item);
    Ember.$('header.gru-header').hide();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('selectedMenuItem', null);
    Ember.$('header.gru-header').show();
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

  navTitle: null,

  /**
   * @property {Boolean}
   * Computed property  to identify class is started or not
   */
  hasStarted: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage !== null && scorePercentage >= 0;
  }),

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
  selectItem: function(item) {
    if (item) {
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
