import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-welcome-message'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{

    /**
     * Check if 'Dont show again' checkbox is selected and create variable on localStorage
     */
    close: function () {
      const $checkboxShowAgain = $('#dontShowAgain');

      if($checkboxShowAgain.prop("checked")){
        let localStorage = this.getLocalStorage();
        const userId = this.get("session.userId");
        const showWelcomeMessage = userId+'_showWelcomeMessage';
        localStorage.setItem(showWelcomeMessage, true);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Returns the local storage
   * @returns {Storage}
   */
  getLocalStorage: function(){
    return window.localStorage;
  }

});
