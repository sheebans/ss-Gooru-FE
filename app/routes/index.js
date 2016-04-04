import Ember from 'ember';
/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Events

  renderTemplate() {
    this.render('sign-in');
  }
});
