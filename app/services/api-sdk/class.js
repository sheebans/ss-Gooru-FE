import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import ClassSerializer from 'gooru-web/serializers/content/class';
import MyClassesSerializer from 'gooru-web/serializers/class/my-classes';
import ClassAdapter from 'gooru-web/adapters/content/class';

/**
 * @typedef {Object} ClassService
 */
export default Ember.Service.extend(StoreMixin, {

  session: Ember.inject.service(),

  classSerializer: null,

  myClassesSerializer: null,

  classAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('classSerializer', ClassSerializer.create());
    this.set('myClassesSerializer', MyClassesSerializer.create());
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
   * Return the list of classes related to a user
   * @returns {RSVP.Promise}
   */
  findMyClasses: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classAdapter').getMyClasses()
          .then(function(response) {
            resolve(service.get('myClassesSerializer').normalizeMyClasses(response));
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
