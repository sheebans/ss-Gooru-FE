import Ember from 'ember';
import CollectionSerializer from 'gooru-web/serializers/content/collection';
import CollectionAdapter from 'gooru-web/adapters/content/collection';
import { getContentCount } from 'gooru-web/utils/utils';

/**
 * @typedef {Object} CollectionService
 */
export default Ember.Service.extend({
  /**
   * @property {Profile} Profile service
   */
  profileService: Ember.inject.service('api-sdk/profile'),
  /**
   * @property {Store} Store service
   */
  store: Ember.inject.service(),

  /**
   * @property {CollectionSerializer} collectionSerializer
   */
  collectionSerializer: null,

  /**
   * @property {CollectionAdapter} collectionAdapter
   */
  collectionAdapter: null,

  /**
   * @property {CollectionService}
   */
  quizzesCollectionService: Ember.inject.service('quizzes/collection'),

  init: function() {
    this._super(...arguments);
    this.set(
      'collectionSerializer',
      CollectionSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'collectionAdapter',
      CollectionAdapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Creates a new collection
   *
   * @param collectionData object with the collection data
   * @returns {Promise}
   */
  createCollection: function(collectionData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedClassData = service
        .get('collectionSerializer')
        .serializeCreateCollection(collectionData);
      service
        .get('collectionAdapter')
        .createCollection({
          body: serializedClassData
        })
        .then(
          function(responseData, textStatus, request) {
            let collectionId = request.getResponseHeader('location');
            collectionData.set('id', collectionId);
            resolve(collectionData);
          },
          function(error) {
            reject(error);
          }
        );
    });
  },

  /**
   * Gets a Collection by id
   * @param {string} collectionId
   * @returns {Promise}
   */
  readCollection: function(collectionId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .readCollection(collectionId)
        .then(function(responseData) {
          //get resources and questions count, if it is not available
          if (typeof responseData.resource_count === 'undefined') {
            let content = getContentCount(responseData.content);
            responseData.resource_count = content.resourceCount;
            responseData.question_count = content.questionCount;
          }
          let collection = service
            .get('collectionSerializer')
            .normalizeReadCollection(responseData);
          let profileService = service.get('profileService');
          profileService
            .readUserProfile(collection.get('ownerId'))
            .then(function(profile) {
              collection.set('owner', profile);
              resolve(collection);
            });
        }, reject);
    });
  },

  /**
   * Updates a Collection
   *
   * @param collectionId the id of the Collection to be updated
   * @param collectionModel the Collection model with the data
   * @returns {Promise}
   */
  updateCollection: function(collectionId, collectionModel) {
    const service = this;
    let serializedData = service
      .get('collectionSerializer')
      .serializeUpdateCollection(collectionModel);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .updateCollection(collectionId, serializedData)
        .then(function() {
          service.notifyQuizzesCollectionChange(collectionId);
          resolve();
        }, reject);
    });
  },

  /**
   * Gets a Collection by id
   * @param {string} collectionId
   * @param {string} type collection|assessment
   * @param {boolean} refresh
   * @returns {Promise.<Collection>}
   */
  readQuizzesCollection: function(collectionId, type, refresh = false) {
    const service = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .readQuizzesCollection(collectionId, type, refresh)
        .then(function(responseData) {
          resolve(responseData);
        }, reject);
    });
  },
  /**
   * Gets a Collection by id
   * @param {string} collectionId
   * @param {string} type collection|assessment
   * @param {boolean} refresh
   * @returns {Promise.<Collection>}
   */
  readPerformanceData: function(classId, collectionId, startDate) {
    const service = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .readPerformanceCollection(classId, collectionId, startDate)
        .then(function(responseData) {
          resolve(responseData);
        }, reject);
    });
  },
  /**
   * Gets a Collection by id
   * @param {string} collectionId
   * @param {string} type collection|assessment
   * @param {boolean} refresh
   * @returns {Promise.<Collection>}
   */
  readPerformanceDataDCA: function(
    classId,
    collectionId,
    startDate,
    assessmentType
  ) {
    const service = this;
    let collectionType = 'assessment';
    if (!assessmentType) {
      collectionType = 'collection';
    }
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .readPerformanceCollectionDCA(
          classId,
          collectionId,
          startDate,
          collectionType
        )
        .then(function(responseData) {
          resolve(responseData);
        }, reject);
    });
  },

  /**
   * Updates the Collection title
   *
   * @param collectionId the id of the Collection to be updated
   * @param title the Collection title
   * @returns {Promise}
   */
  updateCollectionTitle: function(collectionId, title) {
    const service = this;
    let serializedData = service
      .get('collectionSerializer')
      .serializeUpdateCollectionTitle(title);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .updateCollection(collectionId, serializedData)
        .then(function() {
          service.notifyQuizzesCollectionChange(collectionId);
          resolve();
        }, reject);
    });
  },

  /**
   * Reorder collection resources
   *
   * @param collectionId the id of the Collection to be updated
   * @param {string[]} resourceIds
   * @returns {Promise}
   */
  reorderCollection: function(collectionId, resourceIds) {
    const service = this;
    let serializedData = service
      .get('collectionSerializer')
      .serializeReorderCollection(resourceIds);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .reorderCollection(collectionId, serializedData)
        .then(function() {
          service.notifyQuizzesCollectionChange(collectionId);
          resolve();
        }, reject);
    });
  },

  /**
   * Gets a specific collection|assessment by ID
   * @param {string} collectionId
   * @returns {Collection}
   */
  findById: function(collectionId) {
    return this.get('store').findRecord('collection/collection', collectionId, {
      reload: true
    });
  },

  /**
   * Gets all collections|assessments for an specific unit and lesson.
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @returns {Collection[]}
   */
  findByClassAndCourseAndUnitAndLesson: function(
    classId,
    courseId,
    unitId,
    lessonId
  ) {
    return this.get('store').queryRecord('collection/collection', {
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    });
  },

  /**
   * Adds a resource to a specific collection
   * @param collectionId
   * @param resourceId
   * @returns {Promise}
   */
  addResource: function(collectionId, resourceId) {
    var service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .addResource(collectionId, resourceId)
        .then(function() {
          service.notifyQuizzesCollectionChange(collectionId);
          resolve();
        }, reject);
    });
  },

  /**
   * Adds a question to a specific collection
   * @param collectionId
   * @param questionId
   * @returns {Promise}
   */
  addQuestion: function(collectionId, questionId) {
    var service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .addQuestion(collectionId, questionId)
        .then(function() {
          service.notifyQuizzesCollectionChange(collectionId);
          resolve();
        }, reject);
    });
  },

  /**
   * Delete collection
   *
   * @param collectionId The collection id to delete
   * @returns {Promise}
   */
  deleteCollection: function(collectionId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .deleteCollection(collectionId)
        .then(function() {
          service.notifyQuizzesCollectionChange(collectionId);
          resolve();
        }, reject);
    });
  },

  /**
   * Copies a collection by id
   * @param {string} collectionId
   * @returns {Ember.RSVP.Promise}
   */
  copyCollection: function(collectionId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service
        .get('collectionAdapter')
        .copyCollection(collectionId)
        .then(function(responseData, textStatus, request) {
          resolve(request.getResponseHeader('location'));
        }, reject);
    });
  },

  /**
   * Notify a collection change at quizzes
   * @param {string} collectionId
   */
  notifyQuizzesCollectionChange: function(collectionId) {
    const quizzesCollectionService = this.get('quizzesCollectionService');
    Ember.Logger.info('Notifying collection change');
    return quizzesCollectionService.notifyCollectionChange(
      collectionId,
      'collection'
    );
  }
});
