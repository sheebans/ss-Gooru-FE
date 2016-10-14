import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-resources'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of resources to be displayed by the component
   *
   * @constant {Array}
   */
  results: null

});

