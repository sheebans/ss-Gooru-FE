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
      const component = this;
      let editedCollection = component.get('tempCollection');
      editedCollection.validate().then(function ({validations }) {
        if (validations.get('isValid')) {
          component.get('collectionService').updateCollection(editedCollection.get('id'), editedCollection)
            .then(function () {
              component.set('collection', editedCollection);
              component.set('isEditing', false);
            })
            .catch(function () {
              var message = component.get('i18n').t('common.errors.collection-not-updated').string;
              component.get('notifications').error(message);
            });
        }
        component.set('didValidate', true);
      });
    },

    /**
     * Send request to publish a course
     */
    sendRequest: function () {
      this.set('wasRequestSent', true);
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
  tempCollection: null,

  /**
   * Request pending approval
   * // TODO: Change this to a computed property of a course property
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Request to make the course searchable been sent?
   * // TODO: Change this to a computed property of a course property
   * @property {Boolean}
   */
  wasRequestSent: false,

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions:Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })])

});
