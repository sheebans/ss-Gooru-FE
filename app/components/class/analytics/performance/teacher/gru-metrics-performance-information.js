import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  tagName: '',

  // -------------------------------------------------------------------------
  // Actions
  actions:{

  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  dataPickerOptions: Ember.A(["score"]),

  /**
   * The performanceData information
   * @property {performance}
   */

  performanceData: null,

  /**
   * Show the score class
   * @property {String}
   */
  scoreClass: Ember.computed('performanceData', function() {
    var performanceDataScore = this.get('performanceData').score;
    var classScore= 'excellent';

    switch(true) {
      case (performanceDataScore<60):
        classScore = 'bad';
        break;
      case (performanceDataScore>59 && performanceDataScore< 70):
        classScore = 'regular';
        break;
      case (performanceDataScore>69 && performanceDataScore< 80):
        classScore = 'good';
        break;
      case (performanceDataScore>79 && performanceDataScore< 90):
        classScore = 'very-good';
        break;
    }
    return classScore;
  }),

  /**
   * If completion option is selected
   * @property {Boolean}
   */
  showCompletion: Ember.computed('dataPickerOptions', function() {
    const dataPickerOptions = this.get('dataPickerOptions');
    return dataPickerOptions.contains('completion');
  }),

  /**
   * If study time option is selected
   * @property {Boolean}
   */
  showStudyTime: Ember.computed('dataPickerOptions', function() {
    const dataPickerOptions = this.get('dataPickerOptions');
    return dataPickerOptions.contains('study-time');
  })

  // -------------------------------------------------------------------------

  // Methods

});
