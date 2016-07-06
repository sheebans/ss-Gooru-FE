import Ember from 'ember';

/**
 * Make ember-18n service available to all components, models and controllers
 *
 * @module
 */
export default {
  name: 'ajax',

  initialize: function(/* app */) {
    Ember.$.ajaxSetup({
      crossDomain: true,
      beforeSend: function(jqXHR, settings) {
        const url = settings.url;
        if (url.startsWith("/")){
          settings.url = "http://nucleus-qa.gooru.org" + settings.url;
        }
        else {
          settings.url = settings.url.replace("localhost", "nucleus-qa.gooru.org");
        }
        console.debug(settings.url);
      }
    });
  }
};
