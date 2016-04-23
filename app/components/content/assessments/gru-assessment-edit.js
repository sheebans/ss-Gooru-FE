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
      const component = this;
      let editedAssessment = this.get('tempCollection');
      editedAssessment.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          component.get('collectionService').updateCollection(editedAssessment.get('id'), editedAssessment)
            .then(function () {
              component.set('collection', editedAssessment);
              component.set('isEditing', false);
            })
            .catch(function () {
              var message = component.get('i18n').t('common.errors.collection-not-updated').string;
              component.get('notifications').error(message);
            });
        }
        component.set('didValidate', true);
      });
    }
  }


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties


});
