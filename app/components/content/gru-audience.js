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
    /**
     * Remove audience from active audience
     */
    removeAudience:function(audience){
      $.map( this.get('activeAudience'), function(object) {
        if(object===audience){
          Ember.set(object,'checked', false);
        }
      });
    },
  },
  /**
   * Overwrites didUpdate hook.
   */
  didUpdate: function() {
    this.$('.dropdown-menu.audience li label').on('click', function (e) {
      e.stopPropagation();
    });
  },
  // -------------------------------------------------------------------------
  // Events
  sendUpdatedAudienceValues: Ember.observer('activeAudience.@each.checked', function() {
      this.get('onChangeAudience')(this.get('activeAudience'));
  }),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEditing:null,

  /**
   * @type {Ember.A} audienceList - List of course audiences
   */
  audienceList:null,

  /**
   * @type {Ember.A} audienceList - List of active audiences
   */
  activeAudience:Ember.computed('audienceList.@each.checked','isEditing',function(){
    var list = Ember.copy(this.get('audienceList'),true);
    return list;
  }),
});
