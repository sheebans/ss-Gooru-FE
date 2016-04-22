import Ember from 'ember';
import NewCollectionModal from 'gooru-web/components/content/modals/gru-collection-new';
import Assessment from 'gooru-web/models/content/assessment';

export default NewCollectionModal.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {AssessmentService} Assessment service API SDK
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-assessment-new'],

  // -------------------------------------------------------------------------
  // Actions

  validate: function() {
    const assessment = this.get('assessment');
    return assessment.validate();
  },

  createAssessmentOrCollection: function() {
    return this.get('assessmentService').createAssessment(this.get('assessment'));
  },

  associateToLesson: function(courseId, unitId, lessonId, assessmentOrCollectionId) {
    return this.get('lessonService')
      .associateAssessmentOrCollectionToLesson(courseId, unitId, lessonId, assessmentOrCollectionId, false);
  },

  closeModal: function(assessmentId) {
    this.triggerAction({ action: 'closeModal' });
    this.get('router').transitionTo('content.assessments.edit', assessmentId);
  },

  showErrorMessage: function(error) {
    Ember.Logger.error(error);
    const message = this.get('i18n').t('common.errors.assessment-not-created').string;
    this.get('notifications').error(message);
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var assessment = Assessment.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('assessment', assessment);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Assessment} assessment
   */
  assessment: null

});

