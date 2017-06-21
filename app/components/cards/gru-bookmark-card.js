import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-bookmark-card'],

  // Events
  didRender(){
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Bookmark} bookmark information
   */
  bookmark: null

});
