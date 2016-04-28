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
      let editedCollection = this.get('tempCollection');
      editedCollection.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          this.get('collectionService').updateCollection(editedCollection.get('id'), editedCollection)
            .then(function () {
              this.get('collection').merge(editedCollection, ['title', 'learningObjectives', 'isVisibleOnProfile']);
              this.set('isEditing', false);
            }.bind(this))
            .catch(function (error) {
              var message = this.get('i18n').t('common.errors.collection-not-updated').string;
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
   * Copy of the collection model used for editing.
   * @property {Collection}
   */
  tempCollection: null

});
