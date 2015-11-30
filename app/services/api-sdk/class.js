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
  findClassesIJoined: function (options = {}) {
    return this.get('store').queryRecord('class/class', {
      isStudent: true,
      limit: (options.limit ? options.limit : 10),
      offset: (options.offset ? options.offset : 0)
    });
  },

  /**
   * Returns the list of classes the user teach (as teacher)
   * @param {Object} options request options, like limit, offset, etc
   * @returns {Promise.<Class[]>}
   */
  findClassesITeach: function (options = {}) {
    return this.get('store').queryRecord('class/class', {
      limit: (options.limit ? options.limit : 10),
      offset: (options.offset ? options.offset : 0),
      'flt.exclude.empty.course': (options['flt.exclude.empty.course'] ? options['flt.exclude.empty.course'] : false)
    });
  },

  /**
   * Returns a class by id
   * @param {string} id
   * @returns {Promise.<Class>}
   */
  findById: function (id) {
    return this.get('store').findRecord('class/class', id);
  },

  // TODO: This is a mocked implementation, we need to replace this by results returned by the endpoint
  findStudentsByClass: function (classId) {
    return Ember.A([
      Ember.Object.create({
        id: '7c74a27d-3748-49bd-83b4-4a3523ff370a',
        username: 'JeffreyStudent02',
        firstname: 'Jeffrey',
        lastname: 'Bermudez',
        email: 'jeffreystudent02@test.com'
      }),
      Ember.Object.create({
        id: '7c74a27d-3748-49bd-83b4-4a3523ff370a',
        username: 'JeffreyStudent03',
        firstname: 'Jeffrey',
        lastname: 'Bermudez',
        email: 'jeffreystudent03@test.com'
      })
    ]);
  }

});
