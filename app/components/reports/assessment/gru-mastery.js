import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-mastery'],
  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessmentResult: null,

  /**
   * List of learning targets to be displayed by the component
   *
   * @constant {Array}
   */
  learningTargets:null,




});
