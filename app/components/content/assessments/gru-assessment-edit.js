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
      let component = this;
      let editedAssessment = component.get('tempCollection');
      let assessment = component.get('collection');
      editedAssessment.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          let imageIdPromise = new Ember.RSVP.resolve(editedAssessment.get('thumbnailUrl'));
          if(editedAssessment.get('thumbnailUrl') && editedAssessment.get('thumbnailUrl') !== assessment.get('thumbnailUrl')) {
            imageIdPromise = component.get('mediaService').uploadContentFile(editedAssessment.get('thumbnailUrl'));
          }
          imageIdPromise.then(function(imageId) {
            editedAssessment.set('thumbnailUrl', imageId);
            component.get('assessmentService').updateAssessment(editedAssessment.get('id'), editedAssessment)
              .then(function () {
                assessment.merge(editedAssessment, ['title', 'learningObjectives', 'isVisibleOnProfile', 'thumbnailUrl']);
                component.set('isEditing', false);
              })
              .catch(function (error) {
                var message = component.get('i18n').t('common.errors.assessment-not-updated').string;
                component.get('notifications').error(message);
                Ember.Logger.error(error);
              });
          });
        }
        component.set('didValidate', true);
      });
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
