import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {CollectionService} Course service API SDK
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-collection-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


    actions: {

      createCollection: function () {
        const component = this;
        const collection = this.get('collection');
        collection.validate().then(function ({ model, validations }) {
          if (validations.get('isValid')) {
            component.get('collectionService')
              .createCollection(collection)
              .then(function(newCollection) {
                  component.triggerAction({ action: 'closeModal' });
                  component.get('router').transitionTo('content.collections.edit', { collectionId : newCollection.get('id') });
                },
                function() {
                  const message = this.get('i18n').t('common.errors.collection-not-created').string;
                  this.get('notifications').error(message);
                }
              );
          }
          this.set('didValidate', true);
        }.bind(this));
      }

    },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var collection = Collection.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('collection', collection);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Collection} collection
   */
  collection: null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});
