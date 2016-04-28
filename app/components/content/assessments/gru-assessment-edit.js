import Ember from 'ember';
import CollectionEdit from 'gooru-web/components/content/collections/gru-collection-edit';

export default CollectionEdit.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

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
      let editedAssessment = this.get('tempCollection');
      editedAssessment.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          this.get('assessmentService').updateAssessment(editedAssessment.get('id'), editedAssessment)
            .then(function () {
              this.get('collection').merge(editedAssessment, ['title', 'learningObjectives', 'isVisibleOnProfile']);
              this.set('isEditing', false);
            }.bind(this))
            .catch(function (error) {
              var message = this.get('i18n').t('common.errors.assessment-not-updated').string;
              this.get('notifications').error(message);
              Ember.Logger.error(error);
            }.bind(this));
        }
        this.set('didValidate', true);
      }.bind(this));
    },

    /**
     * Save setting for visibility of collection in profile
     */
    publishToProfile: function(isChecked) {
      var assessmentForEditing = this.get('collection').copy();
      this.set('tempCollection', assessmentForEditing);
      this.set('tempCollection.isVisibleOnProfile', isChecked);
      this.actions.updateContent.call(this);
    }
  }

});
