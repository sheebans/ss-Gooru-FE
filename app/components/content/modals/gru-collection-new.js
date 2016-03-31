import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} collection service API SDK
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
      const collection = this.get('collection');
      collection.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {

          this.get("collectionService")
            .create(collection)
            .then(function (collection) {
              this.triggerAction({
                action: 'closeModal'
              });
              this.get('router').transitionTo('content.collection.edit', course.get('id'));

            }.bind(this),

            function () {
              const message = this.get('i18n').t('common.errors.course-not-created').string;
              this.get('notifications').error(message);
            }.bind(this)
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
   * @type {Ember.A} categories - List of collection categories
   */
  categories: TAXONOMY_CATEGORIES,

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
