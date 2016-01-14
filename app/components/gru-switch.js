import Ember from 'ember';
/**
 * Switch component
 * Component responsible for show two options to switch
 * Use Switchery component that helps
 * you turn your default HTML checkbox inputs into beautiful iOS 7 style
 * @see http://abpetkov.github.io/switchery/
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-switch'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Select a option
     * @function actions:selectOption
     */
    selectOption: function () {
      if(this.isChecked()){
        this.sendAction("onOptionSwitch", this.get("optionB"));
        this.activeOption("optionB");
      }else{
        this.sendAction("onOptionSwitch", this.get("optionA"));
        this.activeOption("optionA");
      }
    }

  },
  // -------------------------------------------------------------------------
  // Events

  /**
   * Overwrites didInsertElement hook.
   */
  didInsertElement: function() {
    var elem = document.querySelector('.js-switch');
    new Switchery(elem, {
      color: '#f0f0f0',
      secondaryColor: '#f0f0f0',
      jackColor: '#DEDEDE',
      jackSecondaryColor: '#DEDEDE',
      size:'small'
    });
  },
// -------------------------------------------------------------------------
// Properties
  /**
   * List of options to show in the switch
   *
   * @property {Array}
   */
  switchOptions: null,

  /**
   * Option in the left side of the switch
   * @property {Array} Option A
   */
  optionA:Ember.computed('switchOptions.[]', function() {
    return this.get("switchOptions")[0];
  }),
  /**
   * Option in the right side of the switch
   * @property {Array} Option B
   */
  optionB:Ember.computed('switchOptions.[]', function() {
    return this.get("switchOptions")[1];
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Checks the input has been checked
   */
  isChecked: function() {
    return document.querySelector('.js-switch').checked;
  },
  /**
   * Highlight the active label
   */
  activeOption: function(option) {
    this.$().find(".active").removeClass("active");
    this.$("."+option).addClass("active");
  }
});


