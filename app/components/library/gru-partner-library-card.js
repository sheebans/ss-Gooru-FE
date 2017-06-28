import Ember from 'ember';

/**
 * Library card
 *
 * Component responsible of showing the library information in cards, so that most useful information is summarized there.
 * @module
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-partner-library-card'],

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
  },

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Library} content
   */
  content: null,

  /**
   * @property {boolean} Indicates if library has 1 or more resources
   */
  hasResources: Ember.computed.gt('content.resourceCount', 0),

  /**
   * @property {boolean} Indicates if collection has 1 or more questions
   */
  hasCollections: Ember.computed.gt('collectionCount', 0),

  /**
   * @property {boolean} Indicates if collection has 1 or more resources
   */
  hasAssessments: Ember.computed.gt('assessmentCount', 0),

  /**
   * @property {boolean} Indicates if collection has 1 or more questions
   */
  hasQuestions: Ember.computed.gt('content.questionCount', 0),

  /**
   * @property {boolean}
   */
  hasRubrics: Ember.computed.gt('content.rubricCount', 0),

  /**
   * @property {boolean}
   */
  hasCourses: Ember.computed.gt('content.courseCount', 0),


  // -------------------------------------------------------------------------
  // Methods


});
