import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-collection-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

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
