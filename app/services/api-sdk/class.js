import Ember from 'ember';
import StoreMixin from '../../mixins/store';

/**
 * @typedef {Object} ClassService
 */
export default Ember.Service.extend(StoreMixin, {

  /**
   * Returns the list of the classes the user is joined (as student).
   * @param {Object} options request options, like limit, offset, etc
   * @returns {Promise.<Class[]>}
   */
  findClassesIJoined: function(options = {}) {
    return this.get('store').queryRecord('class/class', {
      isStudent: true,
      limit: (options.limit ? options.limit : 10),
      offset: (options.offset ? options.offset : 0)
    }).then(function(response) {
      return response;
    }, function (error) {
      Ember.Logger.error('Error querying Classes I Joined: %s', error.message);
      return '[]';
    });
  },

  /**
   * Returns the list of classes the user teach (as teacher)
   * @param {Object} options request options, like limit, offset, etc
   * @returns {Promise.<Class[]>}
   */
  findClassesITeach: function(options = {}) {
    return this.get('store').queryRecord('class/class', {
      limit: (options.limit ? options.limit : 10),
      offset: (options.offset ? options.offset : 0),
      'flt.exclude.empty.course': (options['flt.exclude.empty.course'] ? options['flt.exclude.empty.course'] : false)
    }).then(function(response) {
      return response;
    }, function (error) {
      Ember.Logger.error('Error querying Classes I Teach: %s', error.message);
      return '[]';
    });
  },

  /**
   * Returns a class by id
   * @param {string} id
   * @returns {Promise.<Class>}
   */
  findById: function(id){
    return this.get('store').findRecord('class/class', id)
      .then(function(response) {
        return response;
      }, function (error) {
        Ember.Logger.error('Error finding Class by Id: %s', error.message);
        return '{}';
      });
  }

});
