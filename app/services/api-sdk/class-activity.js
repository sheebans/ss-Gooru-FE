import Ember from 'ember';
import ClassActivityAdapter from 'gooru-web/adapters/content/class-activity';
import ClassActivitySerializer from 'gooru-web/serializers/content/class-activity';

/**
 * @typedef {Object} ClassActivityService
 */
export default Ember.Service.extend({


  /**
   * @property {PerformanceService} performanceService
   */
  performanceService: Ember.inject.service("api-sdk/performance"),

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
  addActivityToClass: function (classId, contentId, contentType, context = {}) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter').addActivityToClass(classId, contentId, contentType, context).then(function() {
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
  enableClassActivity: function (classId, contentId, activationDate = new Date()) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter').enableClassActivity(classId, contentId, activationDate).then(function() {
        resolve(true);
      }, reject);
    });
  },


  /**
   * Gets all class activity for the authorized user (student|teacher)
   *
   * @param {string} userId
   * @param {string} classId
   * @param {string} contentType collection|assessment|resource|question
   * @returns {Promise.<ClassActivity[]>}
   */
  findClassActivities: function(userId, classId, contentType = undefined) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('classActivityAdapter')
        .findClassActivities(classId, contentType).then(function(payload) {
        const classActivities = service.get('classActivitySerializer').normalizeFindClassActivities(payload);
        service.findClassActivitiesPerformanceSummary(userId, classId, classActivities).then(resolve, reject);
      });
    });
  },

  /**
   * Gets all class activity for the authorized user (student|teacher)
   * @param {ClassActivity[]} classActivities
   * @returns {Promise.<ClassActivity[]>}
   */
  findClassActivitiesPerformanceSummary: function(userId, classId, classActivities) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const assessmentIds = classActivities.filterBy('collection.isAssessment').mapBy('collection.id');
      const collectionIds = classActivities.filterBy('collection.isCollection').mapBy('collection.id');
      const performanceService = service.get('performanceService');
      Ember.RSVP.hash({
        collectionPerformanceSummaryItems: collectionIds.length ?
          performanceService.findCollectionPerformanceSummaryByIds(userId, collectionIds, 'collection', classId) : [],
        assessmentPerformanceSummaryItems: assessmentIds.length ?
          performanceService.findCollectionPerformanceSummaryByIds(userId, assessmentIds, 'assessment', classId) : []
      }).then(function(hash){
        const collectionPerformanceSummaryItems = hash.collectionPerformanceSummaryItems;
        const assessmentPerformanceSummaryItems = hash.assessmentPerformanceSummaryItems;

        classActivities.forEach(function(classActivity){
          const collection = classActivity.get('collection');
          const collectionPerformanceSummary = collection.get('isAssessment') ?
            assessmentPerformanceSummaryItems.findBy('collectionId', collection.get('id')) :
            collectionPerformanceSummaryItems.findBy('collectionId', collection.get('id'));
          classActivity.set('collectionPerformanceSummary', collectionPerformanceSummary);
        });

        resolve(classActivities);
      }, reject);
    });
  }
});
