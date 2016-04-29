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
   * @property {Profile} profile the owner of classes
   * @returns {RSVP.Promise}
   */
  findMyClasses: function(profile) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classAdapter').getMyClasses()
          .then(function(response) {
            var classesModel = service.get('classSerializer').normalizeClasses(response);
            Ember.$.each(classesModel.get("classes"), function(index, aClass){
              //when it has no owner we asume is the provided profile
              if (!aClass.get("owner")){
                aClass.set("owner", profile);
              }
            });
            resolve(classesModel);
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
   * Associates a Course with a Class
   *
   * @param classId the class id
   * @param courseId the course id
   * @returns {Promise}
   */
  associateCourseToClass: function(courseId, classId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classAdapter').associateCourseToClass(courseId, classId)
        .then(resolve, reject);
    });
  },

  // TODO These method will be removed once we have full integration with API 3.0

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
