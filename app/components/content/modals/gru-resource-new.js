import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {ResourceService} Resource service API SDK
   */
  resourceService: Ember.inject.service("api-sdk/resource"),

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

  classNames: ['content', 'modals', 'gru-resource-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    createResource: function () {
      const component = this;
      const resource = this.get('resource');
      resource.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          component.get('resourceService')
            .createResource(resource)
            .then(function(newResource) {
                component.triggerAction({ action: 'closeModal' });
                component.get('router').transitionTo('content.resources.edit', { resourceId : newResource.get('id') });
              },
              function() {
                const message = component.get('i18n').t('common.errors.resource-not-created').string;
                component.get('notifications').error(message);
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
    var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {url: null});
    resource.set("title", "Untitled"); //TODO remove once fields are added to modal
    resource.set("format", "video_resource"); //TODO remove once fields are added to modal
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
