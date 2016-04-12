import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {ResourceService} Resource service API SDK
   */
  questionService: Ember.inject.service("api-sdk/resource"),

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
          var resourceService = component.get('resourceService');
          resourceService.createResource(resource)
            .then(function (newResource) {
                component.onNewResource(newResource);
              },
              function (data) {
                if (data.resourceId) { //already exists
                  component.displayExistingResource(data.resourceId);
                }
                else {
                  const message = component.get('i18n').t('common.errors.resource-not-created').string;
                  component.get('notifications').error(message);
                }
              }
            );
        }
        component.set('didValidate', true);
      });
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
   * @type {Content/Resource} resource
   */
  resource: null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null,


  /**
   * @type {Content/Resource} resource
   */
  existingResource: null,



  //
  // Methods
  /**
   * After a resource is saved
   * @param {Content/Resource} newResource
   */
  onNewResource: function(newResource){
    const component = this;
    component.triggerAction({ action: 'closeModal' });
    component.get('router').transitionTo('content.resources.edit', { resourceId : newResource.get('id') });
  },

  /**
   * Display an existing resource
   * @param {string} resourceId
   */
  displayExistingResource: function(resourceId){
    const component = this;
    const resourceService = component.get('questionService');
    resourceService.readResource(resourceId)
      .then(function(resource){
        component.set("existingResource", resource);
      });
  }

});
