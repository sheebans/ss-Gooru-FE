import Ember from 'ember';
import NavigateMapSerializer from 'gooru-web/serializers/map/navigate-map';
import NavigateMapAdapter from 'gooru-web/adapters/map/navigate-map';
import MapContext from 'gooru-web/models/map/map-context';
import MapLocation from 'gooru-web/models/map/map-location';
import Utils from 'gooru-web/utils/utils';
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
  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    this._super(...arguments);
    this.set(
      'serializer',
      NavigateMapSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'adapter',
      NavigateMapAdapter.create(Ember.getOwner(this).ownerInjection())
    );
    this.set('router', Ember.getOwner(this).lookup('router:main'));
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

  /**
   * @property {Router} router
   */
  router: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Returns the next map location based on a specific map context
   * This method is used to know what is next based on where the user is right now
   * @param {MapContext} mapContext the current map context returned by the API
   * @returns {Promise.<MapLocation>}
   */
  next: function(mapContext) {
    const service = this;
    const mapSerializer = service.get('serializer');
    const serializedMap = mapSerializer.serializeMapContext(mapContext);
    return service
      .get('adapter')
      .next(serializedMap)
      .then(payload => {
        this.getLocalStorage().setItem(
          this.generateKey(),
          JSON.stringify(payload)
        );
        return MapLocation.create({
          context: mapSerializer.normalizeMapContext(payload.context),
          suggestions: mapSerializer.normalizeMapSuggestions(
            payload.suggestions
          ),
          hasContent: payload.content && !!Object.keys(payload.content).length
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
  continueCourse: function(courseId, classId = undefined) {
    const service = this;
    const mapContext = MapContext.create({
      courseId,
      classId,
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
  startCollection: function(
    courseId,
    unitId,
    lessonId,
    collectionId,
    collectionType,
    classId = undefined
  ) {
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
   * Starts alternate path taken.
   * @param options as context params
   */
  startAlternatePathSuggestion: function(options) {
    const service = this;
    const mapContext = {
      course_id: options.ctx_course_id,
      unit_id: options.ctx_unit_id,
      lesson_id: options.ctx_lesson_id,
      collection_id: options.ctx_collection_id,
      class_id: options.ctx_class_id,
      current_item_id: null,
      current_item_type: null,
      current_item_subtype: null,
      state: 'start',
      score_percent: null,
      path_id: parseInt(options.pathId)
    };
    return service
      .get('adapter')
      .next(mapContext)
      .then(payload => {
        this.getLocalStorage().setItem(
          this.generateKey(),
          JSON.stringify(payload)
        );
      });
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
  startSuggestion: function(
    courseId,
    unitId,
    lessonId,
    collectionId,
    collectionType,
    collectionSubType,
    pathId,
    classId
  ) {
    const service = this;
    let isBackfillOrResource =
      collectionSubType === ASSESSMENT_SUB_TYPES.BACKFILL ||
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
   * Starts a resource
   *
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {string} collectionId
   * @param {string} resourceId
   * @param {string} pathId
   * @param {string} classId
   * @returns {Promise.<MapLocation>}
   */
  startResource: function(
    courseId,
    unitId,
    lessonId,
    collectionId,
    resourceId,
    pathId,
    classId
  ) {
    const service = this;
    const mapContext = MapContext.create({
      courseId,
      unitId,
      lessonId,
      collectionId,
      itemId: resourceId,
      itemType: 'resource',
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
  startLesson: function(courseId, unitId, lessonId, classId = undefined) {
    const service = this;
    const mapContext = MapContext.create({
      courseId,
      unitId,
      lessonId,
      classId,
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
  getCurrentMapContext: function(courseId, classId = undefined) {
    const service = this;
    const mapSerializer = service.get('serializer');
    return service
      .get('adapter')
      .getCurrentMapContext(courseId, classId)
      .then(payload => mapSerializer.normalizeMapContext(payload));
  },

  /**
   * Returns the stored next response
   * @returns {Promise.<MapLocation>}
   */
  getStoredNext: function() {
    let service = this;
    const mapSerializer = service.get('serializer');
    const storedResponse = service
      .getLocalStorage()
      .getItem(service.generateKey());
    let parsedResponse = JSON.parse(storedResponse);
    let hasContent =
      parsedResponse.content && !!Object.keys(parsedResponse.content).length;
    return Ember.RSVP.resolve(
      MapLocation.create({
        context: mapSerializer.normalizeMapContext(parsedResponse.context),
        suggestions: mapSerializer.normalizeMapSuggestions(
          parsedResponse.suggestions
        ),
        hasContent,
        content: hasContent
          ? mapSerializer.normalizeMapContent(parsedResponse.content)
          : null
      })
    );
  },

  /**
   * Generate a key based on user id and route info
   * @returns {String}
   */
  generateKey: function() {
    const userId = this.get('session.userId');
    return `${userId}_next`;
  },

  /**
   * Returns the local storage
   * @returns {Storage}
   */
  getLocalStorage: function() {
    return window.localStorage;
  },

  /**
   * Gets the map location for the study player based on parameters
   * @param params
   * @returns {*}
   */
  getMapLocation: function(params) {
    const classId = params.classId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const collectionType = params.type;
    const collectionId = params.collectionId;
    const pathId = params.pathId;
    const collectionSubType = params.subtype;
    const collectionUrl = params.collectionUrl;
    const resourceId = params.resourceId;
    const continueCourse = !unitId;
    const startLesson = lessonId && !collectionId;

    const navigateMapService = this;

    let mapLocationPromise = null;
    const storedResponse = navigateMapService
      .getLocalStorage()
      .getItem(navigateMapService.generateKey());
    if (storedResponse) {
      mapLocationPromise = navigateMapService.getStoredNext();
    } else if (continueCourse) {
      mapLocationPromise = navigateMapService
        .getCurrentMapContext(courseId, classId)
        .then(mapContext => navigateMapService.next(mapContext, false));
    } else if (startLesson) {
      mapLocationPromise = navigateMapService.startLesson(
        courseId,
        unitId,
        lessonId,
        classId
      );
    } else if (collectionSubType) {
      mapLocationPromise = navigateMapService.startSuggestion(
        courseId,
        unitId,
        lessonId,
        collectionId,
        collectionType,
        collectionSubType,
        pathId,
        classId
      );
    } else if (collectionUrl && resourceId) {
      const ctxUnitId = Utils.getParameterByName('unitId', collectionUrl);
      const ctxLessonId = Utils.getParameterByName('lessonId', collectionUrl);
      const ctxCollectionType = Utils.getParameterByName('type', collectionUrl);
      mapLocationPromise = navigateMapService.startCollection(
        courseId,
        ctxUnitId,
        ctxLessonId,
        collectionId,
        ctxCollectionType,
        classId
      );
    } else {
      mapLocationPromise = navigateMapService.startCollection(
        courseId,
        unitId,
        lessonId,
        collectionId,
        collectionType,
        classId
      );
    }
    return mapLocationPromise;
  }
});
