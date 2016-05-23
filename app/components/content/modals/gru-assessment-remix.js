import Ember from 'ember';
import RemixBaseModal from 'gooru-web/components/content/modals/gru-base-remix';

export default RemixBaseModal.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Assessment service API SDK
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-assessment-remix'],

  // -------------------------------------------------------------------------
  // Actions

  copyContent: function(assessment) {
    return this.get("assessmentService").copyAssessment(assessment.get('id'));
  },

  updateContent: function(assessment) {
    return this.get('assessmentService').updateAssessment(assessment.get('id'), assessment);
  },

  showSuccessNotification: function(assessment) {
    var component = this;
    var successMsg = component.get('i18n').t('common.remix-assessment-success', {assessmentTitle: assessment.get('title')});
    var assessmentEditUrl = component.get('router').generate('content.assessments.edit', assessment.get('id'));
    var edit = component.get('i18n').t('common.edit');
    component.get('notifications').success(`${successMsg} <a class="btn btn-success" href="${assessmentEditUrl}">${edit}</a>`);
  },

  showFailureNotification: function() {
    const message = this.get('i18n').t('common.errors.assessment-not-copied').string;
    this.get('notifications').error(message);
  }

});
