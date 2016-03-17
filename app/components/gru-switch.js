import Ember from 'ember';
/**
 * Switch component
 * Component responsible for show two options to switch
 * Use Bootstrap Toggle component that helps
 * you turn your default HTML checkboxes into toggles.
 * @see https://github.com/minhur/bootstrap-toggle/
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
      }else{
        this.sendAction("onOptionSwitch", this.get("optionA"));
      }
    }

  },
  // -------------------------------------------------------------------------
  // Events

  /**
   * Overwrites didInsertElement hook.
   */
  didInsertElement: function() {
    $('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
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
    return this.$('.switch input').checked;
  }
});


