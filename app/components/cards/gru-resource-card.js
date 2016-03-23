import Ember from 'ember';
/**
 * Resource and Question card
 *
 * Component responsible of showing the resource or question information in cards, so that most useful information is summarized there.
 * @module
 */

export default Ember.Component.extend({
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-resource-card'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource/Question} resource
   */
  resource: null,

  /**
   * True if hs-images option is selected
   *  @property {boolean} hsImagesSelected
   *
   */

  isQuestion: Ember.computed('resource', function() {
    const resourceFormat = this.get('resource.format');
    console.log('resourceFormat',resourceFormat);
    return (resourceFormat==="question");

  })

});
