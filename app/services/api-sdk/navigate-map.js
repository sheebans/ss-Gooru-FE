import Ember from 'ember';
import NavigateMapSerializer from 'gooru-web/serializers/map/navigate-map';
import NavigateMapAdapter from 'gooru-web/adapters/map/navigate-map';
import MapContext from 'gooru-web/models/map/map-context';
import MapLocation from 'gooru-web/models/map/map-location';
import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';

/**
 * Navigate Map Service
 *
 * Service responsible for navigate map functionality
 *
 * @typedef {Object} NavigateMapService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('serializer', NavigateMapSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', NavigateMapAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {NavigateMapSerializer} serializer
   */
  serializer: null,

  /**
   * @property {NavigateMapAdapter} adapter
   */
  adapter: null,


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Returns the next map location based on a specific map context
   * This method is used to know what is next based on where the user is right now
   * @param {MapContext} mapContext the current map context returned by the API
   * @returns {Promise.<MapLocation>}
   */
  next: function (mapContext) {
    const service = this;
    const mapSerializer = service.get('serializer');
    return service.get('adapter').next(mapSerializer.serializeMapContext(mapContext))
      .then(function (payload) {
        return MapLocation.create({
          context: mapSerializer.normalizeMapContext(payload.context),
          suggestions: mapSerializer.normalizeMapSuggestions(payload.suggestions)
        });
      });
  },

  /**
   * Returns the first/current map location for a course
   * This method is used to start a course or continue a course without knowing the exact location
   * @param {string} courseId
   * @param {string} classId optional
   * @returns {Promise.<MapLocation>}
   */
  continueCourse: function (courseId, classId = undefined) {
    const service = this;
    const mapContext = MapContext.create({
      courseId: courseId,
      classId: classId,
      status: 'continue'
    });
    return service.next(mapContext);
  },

  /**
   * Starts a collection
   *
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} collectionId
   * @param {string} collectionType
   * @param {string} classId
   * @returns {Promise.<MapLocation>}
   */
  startCollection: function (courseId, unitId, lessonId, collectionId, collectionType, classId=undefined) {
    const service = this;
    const mapContext = MapContext.create({
      courseId,
      unitId,
      lessonId,
      collectionId,
      collectionType,
      itemId: collectionId,
      itemType: collectionType,
      classId,
      status: 'start'
    });
    return service.next(mapContext);
  },

  /**
   * Starts a suggestion
   *
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} collectionId
   * @param {string} collectionType
   * @param {string} collectionSubType
   * @param {string} pathId
   * @param {string} classId
   * @returns {Promise.<MapLocation>}
   */
  startSuggestion: function (courseId, unitId, lessonId, collectionId, collectionType, collectionSubType, pathId, classId) {
    const service = this;
    let isBackfillOrResource = collectionSubType === ASSESSMENT_SUB_TYPES.BACKFILL ||
      collectionSubType === ASSESSMENT_SUB_TYPES.RESOURCE;
    let subType = isBackfillOrResource ? null : collectionSubType;
    const mapContext = MapContext.create({
      courseId,
      unitId,
      lessonId,
      collectionId,
      collectionType,
      collectionSubType: subType,
      itemId: collectionId,
      itemType: collectionType,
      itemSubType: subType,
      pathId: +pathId,
      classId,
      status: 'start'
    });
    return service.next(mapContext);
  },

  /**
   * Starts a lesson
   *
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} classId
   * @returns {Promise.<MapLocation>}
   */
  startLesson: function (courseId, unitId, lessonId, classId = undefined) {
    const service = this;
    const mapContext = MapContext.create({
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId,
      classId: classId,
      status: 'start'
    });
    return service.next(mapContext);
  },

  /**
   * Returns the current map context for a course
   * @param {string} courseId
   * @param {string} classId optional
   * @returns {Promise.<MapLocation>}
   */
  getCurrentMapContext: function (courseId, classId = undefined) {
    const service = this;
    const mapSerializer = service.get('serializer');
    return service.get('adapter').getCurrentMapContext(courseId, classId)
      .then(function (payload) {
        return mapSerializer.normalizeMapContext(payload);
      });
  }


});
