import Ember from 'ember';
/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend({

  session: Ember.inject.service(),

  beforeModel() {
    if (this.get('session.isAnonymous')) {
      this.transitionTo('sign-in');
    } else {
      this.transitionTo('user');
    }
  }


  // -------------------------------------------------------------------------
  // Events

  //renderTemplate() {
  //  this.render('sign-in');
  //}
});


