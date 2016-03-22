import Ember from 'ember';
/**
 * Audience component
 *
 * Component responsible for show the audience
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content','gru-audience'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    removeAudience:function(audience){
      $.map( this.get('audienceList'), function(object) {
        if(object===audience){
          return object.checked ===false;
        }
        return object;
      });
    },
  },
  /**
   * Overwrites didUpdate hook.
   */
  didUpdate: function() {
    $('.dropdown-menu.audience li label').on('click', function (e) {
      e.stopPropagation();
    });
  },
  // -------------------------------------------------------------------------
  // Events
  sendUpdatedAudienceValues: Ember.observer('audienceList.@each.checked', function() {
    this.sendAction('onChangeAudience', this.get('audienceList'));
  }),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEditing:null,

  /**
   * @type {Ember.A} audienceList - List of audiences
   */
  audienceList:null,


  /**
   * @property {String|Function} onChangeAudience - event handler when the selected audience is changed
   */
  onChangeAudience: null,


});
