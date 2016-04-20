import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';
import {RESOURCE_TYPES} from 'gooru-web/config/config';
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
    createResource: function (type) {
      const component = this;
      const resource = this.get('resource');

      resource.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          var resourceService = component.get('resourceService');
          resourceService.createResource(resource)
            .then(function (newResource) {
                if(type==="edit"){
                  component.onNewResource(newResource);
                }else{
                  component.triggerAction({ action: 'closeModal' });
                }
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
    },

    selectType:function(type){
      this.set('resource.format',type);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);

    var resource = Resource.create(Ember.getOwner(this).ownerInjection(), {url: null,title:null,format:"webpage"});
    this.set('resource', resource);
  },



  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Resource} resource
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
   * @type {String} selectedType
   */
  selectedType: Ember.computed.alias('resource.format'),


  /**
   * @type {Resource} resource
   */
  existingResource: null,

  /**
   * @type {Array{}} resourceTypes
   */
  resourceTypes:RESOURCE_TYPES,

  //
  // Methods
  /**
   * After a resource is saved
   * @param {Resource} newResource
   */
  onNewResource: function(newResource){
    const component = this;
    component.triggerAction({ action: 'closeModal' });
    component.get('router').transitionTo('content.resources.edit', newResource.get('id'));
  },

  /**
   * Display an existing resource
   * @param {string} resourceId
   */
  displayExistingResource: function(resourceId){
    const component = this;
    const resourceService = component.get('resourceService');
    resourceService.readResource(resourceId)
      .then(function(resource){
        component.set("existingResource", resource);
      });
  }

});
