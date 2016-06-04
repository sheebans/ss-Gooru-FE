import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import { RESOURCE_COMPONENT_MAP, RESOURCE_TYPES,CONTENT_TYPES, K12_CATEGORY } from "gooru-web/config/config";
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ContentEditMixin, ModalMixin,{
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/resource
   */
  resourceService: Ember.inject.service("api-sdk/resource"),

  /**
   * @requires service:api-sdk/profile
   */
  profileService: Ember.inject.service("api-sdk/profile"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'resources', 'gru-resource-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Edit Content
     */
    editContent: function () {
      var resourceForEditing = this.get('resource').copy();
      this.set('tempResource', resourceForEditing);
      this.set('isEditing', true);
    },

    /**
     * Select resource type
     */
    selectType:function(type){
      this.set('tempResource.format', type);
    },

    /**
     * Save updated content
     */
    updateContent: function() {
      this.saveContent();
    },

    /**
     * Save settings profile visibility option
     */
    publishToProfile: function(isChecked) {
      var resourceForEditing = this.get('resource').copy();
      this.set('tempResource', resourceForEditing);
      this.set('tempResource.isVisibleOnProfile', isChecked);
      this.saveContent();
    },
    /**
     * Delete resource
     */
    deleteResource: function () {
      const myId = this.get("session.userId");
      var model = {
        content: this.get('resource'),
        deleteMethod: function () {
          return this.get('resourceService').deleteResource(this.get('resource.id'));
        }.bind(this),
        type: CONTENT_TYPES.RESOURCE,
        redirect: {
          route: 'profile.content.courses',
          params: {
            id: myId
          }
        }
      };

      this.actions.showModal.call(this,
        'content.modals.gru-delete-content',
        model, null, null, null, false);
    },

    addToCollection: function() {
      const component = this;
      if (component.get('session.isAnonymous')) {
        component.send('showModal', 'content.modals.gru-login-prompt');
      } else {
        component.get('profileService').readCollections(component.get('session.userId')).then(
          function(collections) {
            component.send('showModal', 'content.modals.gru-add-to-collection', {
              content: component.get('resource'),
              collections
            }, null, "add-to");
        });
      }
    },

    selectSubject: function(subject){
      this.set("selectedSubject", subject);
    }

  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Resource model as instantiated by the route. This is the model used when not editing
   * or after any resource changes have been saved.
   * @property {Resource}
   */
  resource: null,

  /**
   * Copy of the resource model used for editing.
   * @property {Resource}
   */
  tempResource: null,

  /**
   * List of resource types
   * @property {Array}
   */
  resourceTypes: RESOURCE_TYPES,

  /**
   * Determines the name of the component that renders the resource
   * @property {String}
   */
  resourceComponent: Ember.computed('resource.resourceType', function() {
    return RESOURCE_COMPONENT_MAP[this.get('resource.resourceType')];
  }),

  /**
   *
   * @property {TaxonomyRoot}
   */
  selectedSubject: null,

  /**
   * @property {string}
   */
  k12Category: K12_CATEGORY.value,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Save Content
   */
  saveContent: function () {
    const component = this;
    var editedResource = component.get('tempResource');
    editedResource.validate().then(function({model, validations}) {
      if (validations.get('isValid')) {
        component.get('resourceService').updateResource(component.get('resource.id'), editedResource)
          .then(function () {
            component.set('resource', editedResource);
            component.set('isEditing', false);
          })
          .catch(function () {
            var message = component.get('i18n').t('common.errors.resource-not-updated').string;
            component.get('notifications').error(message);
          });
      }
      component.set('didValidate', true);
    });
  }
});
