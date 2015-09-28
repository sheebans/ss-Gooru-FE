import Ember from 'ember';

/**
 * Application modal component
 *
 *
 * @class
 */
export default Ember.Component.extend({

  /**
   * @property {string} modal title
   */
  title: "",

  /**
   * @property {boolean} show footer
   */
  footer: false,

  /**
   * @property {} modal element
   */
  modalElement: function(){
    return $(this.get("element")).find(".modal");
  }.property(),

  actions: {
    /**
     * On close action, configured as a data-down|action-up approach
     * @see app-modal.hbs yield setup
     */
    onClose: function(){
      var component = this;
      $(component.get("modalElement")).modal("hide");
    }
  }

});
