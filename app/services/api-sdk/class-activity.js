import Ember from 'ember';
import ClassActivityAdapter from 'gooru-web/adapters/content/class-activity';
import ClassActivitySerializer from 'gooru-web/serializers/content/class-activity';

/**
 * @typedef {Object} ClassActivityService
 */
export default Ember.Service.extend({


  /**
   * @property {ClassActivityAdapter} classActivityAdapter
   */
  classActivityAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('classActivitySerializer', ClassActivitySerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('classActivityAdapter', ClassActivityAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Adds a new content to class
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {string} contentType
   * @param { { courseId: string, unitId: string, lessonId: string } } context
   * @returns {boolean}
   */
  addContentToClass: function (classId, contentId, contentType, context = {}) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter').addContentToClass(classId, contentId, contentType, context).then(function() {
        resolve(true);
      }, reject);
    });
  },


  /**
   * Enables the class content
   *
   * @param {string} classId
   * @param {string} contentId
   * @param {Date} activationDate
   * @returns {boolean}
   */
  enableClassContent: function (classId, contentId, activationDate = new Date()) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter').enableClassContent(classId, contentId, activationDate).then(function() {
        resolve(true);
      }, reject);
    });
  },


  /**
   * Gets all class activity for the authorized user (student|teacher)
   *
   * @param {string} classId
   * @param {string} contentType collection|assessment|resource|question
   * @returns {Promise}
   */
  findClassContent: function(classId, contentType = undefined) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter')
        .findClassContent(classId, contentType).then(function(payload) {
        resolve(service.get('classActivitySerializer').normalizeFindClassActivities(payload));
      }, reject);
    });
  }
});
