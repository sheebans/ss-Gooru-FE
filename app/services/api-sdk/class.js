import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import ClassSerializer from 'gooru-web/serializers/content/class';
import ClassAdapter from 'gooru-web/adapters/content/class';

/**
 * @typedef {Object} ClassService
 */
export default Ember.Service.extend(StoreMixin, {

  session: Ember.inject.service(),

  classSerializer: null,

  classAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('classSerializer', ClassSerializer.create());
    this.set('classAdapter', ClassAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Creates a new class
   *
   * @param classData object with the class data
   * @returns {Promise}
   */
  createClass: function(classData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedClassData = service.get('classSerializer').serializeCreateClass(classData);
      service.get('classAdapter').createClass({
        body: serializedClassData
      }).then(function(responseData, textStatus, request) {
        let classId = request.getResponseHeader('location');
        classData.set('id', classId);
        resolve(classData);
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Join class
   *
   * @param {string} code class code
   * @returns {Promise}
   */
  joinClass: function (code) {
    const service = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      service.get('classAdapter').joinClass(code)
        .then(function (responseData, textStatus, request) {
            let classId = request.getResponseHeader('location');
            resolve(classId);
        },
        function (error) { //handling server errors
          const status = error.status;
          if (status === 400) {
              reject({status: status, code: 'restricted'});
          }
          else if (status === 404) {
              reject({status: status, code: 'not-found'});
          }
          else {
            reject(error);
          }
        });
    });
  },

  /**
   * Return the list of classes related to a user
   * @returns {RSVP.Promise}
   */
  findMyClasses: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classAdapter').getMyClasses()
          .then(function(response) {
            resolve(service.get('classSerializer').normalizeClasses(response));
          }, function(error) {
            reject(error);
          });
    });
  },

  /**
   * Returns the list of the classes the user is joined (as student).
   * @param {Object} options request options, like limit, offset, etc
   * @returns {Promise.<Class[]>}
   */
  findClassesIJoined: function (options = {}) {
    return this.get('store').queryRecord('class/class', {
      isStudent: true,
      limit: (options.limit ? options.limit : -1),
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
      limit: (options.limit ? options.limit : -1),
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
  }

});
