import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';

export default Ember.Component.extend(ContentEditMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/course
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service("api-sdk/media"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'collections', 'gru-collection-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Edit Content
     */
    editContent: function () {
      var collectionForEditing = this.get('collection').copy();
      this.set('tempCollection', collectionForEditing);
      this.set('isEditing', true);
    },

    /**
     * Save Content
     */
    updateContent: function () {
      let component = this;
      let editedCollection = component.get('tempCollection');
      let collection = component.get('collection');
      editedCollection.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          let imageIdPromise = new Ember.RSVP.resolve(editedCollection.get('thumbnailUrl'));
          if(editedCollection.get('thumbnailUrl') && editedCollection.get('thumbnailUrl') !== collection.get('thumbnailUrl')) {
            imageIdPromise = component.get('mediaService').uploadContentFile(editedCollection.get('thumbnailUrl'));
          }
          imageIdPromise.then(function(imageId) {
            editedCollection.set('thumbnailUrl', imageId);
            component.get('collectionService').updateCollection(editedCollection.get('id'), editedCollection)
              .then(function () {
                collection.merge(editedCollection, ['title', 'learningObjectives', 'isVisibleOnProfile', 'thumbnailUrl']);
                component.set('isEditing', false);
              })
              .catch(function (error) {
                var message = component.get('i18n').t('common.errors.collection-not-updated').string;
                component.get('notifications').error(message);
                Ember.Logger.error(error);
              });
          });
        }
        this.set('didValidate', true);
      }.bind(this));
    },

    /**
     * Save setting for visibility of collection in profile
     */
    publishToProfile: function(isChecked) {
      var collectionForEditing = this.get('collection').copy();
      this.set('tempCollection', collectionForEditing);
      this.set('tempCollection.isVisibleOnProfile', isChecked);
      this.actions.updateContent.call(this);
    }
  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Collection model as instantiated by the route. This is the model used when not editing
   * or after any collection changes have been saved.
   * @property {Collection}
   */
  collection: null,

  /**
   * Course model as instantiated by the route. This is the course that have the assigned collection
   * @property {Course}
   */
  course: null,

  /**
   * Copy of the collection model used for editing.
   * @property {Collection}
   */
  tempCollection: null

});
