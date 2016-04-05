import Ember from 'ember';

/**
 * Resource model
 *
 * @typedef {Object} Content/Resource
 */
export default Ember.Object.extend({

  /**
   * @property {String} url
   */
  url: '',

  /**
   * @property {Number} id
   */
  id: 0,

  /**
   * @property {Boolean} isEditing
   */
  isEditing: false,

});
