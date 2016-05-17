import Ember from 'ember';

/**
 * Standards Framework
 *
 * @typedef {Object} StandardsFramework
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - Framework ID
   */
  id: null,

  /**
   * @property {string} title  - Framework code
   */
  code: null,

  /**
   * @property {string} title  - Framework title
   */
  title: null

});
