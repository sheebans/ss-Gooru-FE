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
   * @property {string} close action name
   */
  onCloseAction: null,

  /**
   * @property {} modal element
   */
  modalElement: function(){
    return this.$(this.get("element")).find(".modal");
  }.property(),

  actions: {
    /**
     * On close action, configured as a data-down|action-up approach
     * @see app-modal.hbs yield setup
     */
    onClose: function(){
      var component = this;
      component.$(component.get("modalElement")).modal("hide");
      if (component.get("onCloseAction")){
        component.sendAction("onCloseAction");
      }
    }
  }

});
