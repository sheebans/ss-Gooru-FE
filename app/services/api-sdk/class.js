import Ember from 'ember';
import ClassSerializer from 'gooru-web/serializers/content/class';
import ClassAdapter from 'gooru-web/adapters/content/class';

/**
 * @typedef {Object} ClassService
 */
export default Ember.Service.extend({

  store: Ember.inject.service(),

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
   * Reads class information for a specified class ID
   * @param classId the class id to read
   * @returns {Promise}
   */
  readClassInfo: function(classId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classAdapter').readClassInfo(classId)
        .then(function(response) {
          resolve(service.get('classSerializer').normalizeReadClassInfo(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Gets the members, collaborators, invitees and owner for a specified class ID
   * @param classId the class id to read
   * @returns {Promise}
   */
  readClassMembers: function(classId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classAdapter').readClassMembers(classId)
        .then(function(response) {
          resolve(service.get('classSerializer').normalizeReadClassMembers(response));
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
