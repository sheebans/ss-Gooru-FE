import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-question-options'],

  // -------------------------------------------------------------------------
  // Actions

  actions:{

    /**
     * selectOption selects menu option
     */
    selectOption: function(option){
      this.sendAction("onSelectedOption", option);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Types of question selected
   *  @property {array} selectedOptionTypes
   *
   */
  selectedOptionTypes: Ember.A([]),

  /**
   * True if multiple-choice option is selected
   *  @property {boolean} multipleChoiceSelected
   *
   */

  multipleChoiceSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("multiple-choice");
  }),

  /**
   * True if multiple-answer option is selected
   *  @property {boolean} multipleAnswerSelected
   *
   */

  multipleAnswerSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("multiple-answer");
  }),

  /**
   * True if true-false option is selected
   *  @property {boolean} trueFalseSelected
   *
   */

  trueFalseSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("true-false");
  }),

  /**
   * True if fib option is selected
   *  @property {boolean} fibSelected
   *
   */

  fibSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("fib");
  }),

  /**
   * True if ht-highlight option is selected
   *  @property {boolean} htHighlightSelected
   *
   */

  htHighlightSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("ht-highlight");
  }),

  /**
   * True if ht-reorder option is selected
   *  @property {boolean} htReorderSelected
   *
   */

  htReorderSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get("selectedOptionTypes");
    return selectedOptions.contains('ht-reorder');
  }),

  /**
   * True if hs-text option is selected
   *  @property {boolean} hsTextSelected
   *
   */

  hsTextSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("hs-text");
  }),

  /**
   * True if hs-images option is selected
   *  @property {boolean} hsImagesSelected
   *
   */

  hsImagesSelected: Ember.computed('selectedOptionTypes.[]', function() {
    const selectedOptions = this.get('selectedOptionTypes');
    return selectedOptions.contains("hs-images");
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
