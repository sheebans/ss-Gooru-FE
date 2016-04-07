import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-resource-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    createResource: function () {
      const resource = this.get('resource');
      resource.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          Ember.logger("Collection Valid");
        }
        this.set('didValidate', true);
      }.bind(this));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {url: null});
    this.set('resource', resource);
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
  resource: null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});
