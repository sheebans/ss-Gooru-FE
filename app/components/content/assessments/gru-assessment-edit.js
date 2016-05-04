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
          let imageIdPromise = new Ember.RSVP.resolve(editedAssessment.get('image'));
          if(editedAssessment.get('image') && editedAssessment.get('image') !== assessment.get('image')) {
            imageIdPromise = component.get('mediaService').uploadContentFile(editedAssessment.get('image'));
          }
          imageIdPromise.then(function(imageId) {
            editedAssessment.set('image', imageId);
            component.get('assessmentService').updateAssessment(editedAssessment.get('id'), editedAssessment)
              .then(function () {
                assessment.merge(editedAssessment, ['title', 'learningObjectives', 'isVisibleOnProfile', 'image']);
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
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route. This is the course that have the assigned assessment
   * @property {Course}
   */
  course: null,

});
