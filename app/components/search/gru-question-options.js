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
   * Type of question selected
   *  @property {string} selectedOptionType
   *
   */
  selectedOptionType: 'multiple-choice',

  /**
   * True if multiple-choice option is selected
   *  @property {boolean} multipleChoiceSelected
   *
   */

  multipleChoiceSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'multiple-choice');
  }),

  /**
   * True if multiple-answer option is selected
   *  @property {boolean} multipleAnswerSelected
   *
   */

  multipleAnswerSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'multiple-answer');
  }),

  /**
   * True if true-false option is selected
   *  @property {boolean} trueFalseSelected
   *
   */

  trueFalseSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'true-false');
  }),

  /**
   * True if fib option is selected
   *  @property {boolean} fibSelected
   *
   */

  fibSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'fib');
  }),

  /**
   * True if ht-highlight option is selected
   *  @property {boolean} htHighlightSelected
   *
   */

  htHighlightSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'ht-highlight');
  }),

  /**
   * True if ht-reorder option is selected
   *  @property {boolean} htReorderSelected
   *
   */

  htReorderSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'ht-reorder');
  }),

  /**
   * True if hs-text option is selected
   *  @property {boolean} hsTextSelected
   *
   */

  hsTextSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'hs-text');
  }),

  /**
   * True if hs-images option is selected
   *  @property {boolean} hsImagesSelected
   *
   */

  hsImagesSelected: Ember.computed('selectedOptionType', function() {
    var selectedOptionType = this.get('selectedOptionType');

    return (!selectedOptionType || selectedOptionType === 'hs-images');
  }),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
