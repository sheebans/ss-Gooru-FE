import Ember from 'ember';
import CollectionEdit from 'gooru-web/components/content/collections/gru-collection-edit';

export default CollectionEdit.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'assessments', 'gru-assessment-edit'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Save Content
     */
    updateContent: function () {
      var editedAssessment = this.get('tempCollection');
      this.get('assessmentService').updateAssessment(editedAssessment.get('id'), editedAssessment)

        .then(function () {
          this.set('collection', editedAssessment);
          this.set('isEditing', false);
        }.bind(this))

        .catch(function () {
          var message = this.get('i18n').t('common.errors.assessment-not-updated').string;
          this.get('notifications').error(message);
        }.bind(this));
    }

  }


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties


});
