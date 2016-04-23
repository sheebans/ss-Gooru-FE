import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import { RESOURCE_COMPONENT_MAP, RESOURCE_TYPES } from "../../../config/config";

export default Ember.Component.extend(ContentEditMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

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
     * Save Content
     */
    updateContent: function () {
      console.log('UPDATE');
    },

    /**
     * Select resource type
     */
    selectType:function(type){
      this.set('tempResource.format', type);
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
   * @property {Course}
   */
  tempResource: null,

  /**
   * List of resource types
   * @property {Array}
   */
  resourceTypes: RESOURCE_TYPES,

  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })]),

  /**
   * Determines the name of the component that renders the resource
   * @property {String}
   */
  resourceComponent: Ember.computed('resource.resourceType', function() {
    return RESOURCE_COMPONENT_MAP[this.get('resource.resourceType')];
  })
});
