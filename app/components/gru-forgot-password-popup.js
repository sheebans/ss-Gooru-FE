import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['gru-forgot-password-popup'],
  classNameBindings: ['component-class'],

  /**
   * @type {?String} specific class
   */
  'component-class':null,
});
