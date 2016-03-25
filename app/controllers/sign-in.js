import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    authenticate: function() {
      var controller = this;

      controller.get("sessionService")
        .signInWithUser(controller.get("credentials"), controller.get('useApi3'))
        .then(function() {
          // Trigger action in parent
          controller.send('signIn');
        })
        .catch((reason) => {
          controller.set("errorMessage", reason.error);
        });
    }

  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} authentication error message
   */
  errorMessage: null,

  /**
   * Object with credentials for signing in
   *
   * @type {Ember.Object}
   */
  credentials: Ember.Object.create({
    username: null,
    password: ''
  }),

  target: null,

  useApi3: true


});
