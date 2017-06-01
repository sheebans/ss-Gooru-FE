import Ember from 'ember';
import QuizzesResourcePlayer from 'quizzes-addon/routes/resource-player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

/**
 * Study Player Route
 *
 * The context player route extends the player route to provide the study player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default QuizzesResourcePlayer.extend(PrivateRouteMixin, {
  templateName: 'resource-player',

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {UnitService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {LessonService} Service to retrieve lesson information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @type {AssessmentService} Service to retrieve assessment information
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @type {CollectionService} Service to retrieve collection information
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const { classId, courseId, collectionUrl } = params;
    return route.getMapLocation(params, !collectionUrl).then(currentContext => {
      const unitId = currentContext.get('unitId');
      const lessonId = currentContext.get('lessonId');
      const collectionId = currentContext.get('collectionId');
      const collectionType = currentContext.get('collectionType');
      params.unitId = unitId;
      params.lessonId = lessonId;
      params.collectionId = collectionId;
      params.pathId = currentContext.get('pathId');
      params.sourceUrl = location.host;
      params.partnerId = this.get('session.partnerId');
      params.tenantId = this.get('session.tenantId');

      return Ember.RSVP.hash({ //loading breadcrumb information and navigation info
        course: route.get('courseService').fetchById(courseId),
        unit: route.get('unitService').fetchById(courseId, unitId),
        lesson: route.get('lessonService').fetchById(courseId, unitId, lessonId),
        collection: this.loadCollection(collectionId, collectionType)
      }).then(hash => {
        // Set the correct unit sequence number
        hash.course.children.find((child, index) => {
          let found = false;
          if (child.get('id') === hash.unit.get('id')) {
            found = true;
            hash.unit.set('sequence', index + 1);
          }
          return found;
        });

        // Set the correct lesson sequence number
        hash.unit.children.find((child, index) => {
          let found = false;
          if (child.get('id') === hash.lesson.get('id')) {
            found = true;
            hash.lesson.set('sequence', index + 1);
          }
          return found;
        });

        let { course, unit, lesson, collection } = hash;
        return this.quizzesModel(params).then(
          quizzesModel => Object.assign(quizzesModel, {
            course, unit, lesson, collection, classId, collectionUrl
          })
        );
      });
    });
  },

  setupController(controller, model) {
    controller.setProperties({
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      classId: model.classId,
      collection: model.collection,
      collectionUrl: model.collectionUrl
    });
    this._super(...arguments);
  },

  getMapLocation(params, sendToAnalytics) {
    const navigateMapService = this.get('navigateMapService');
    const { classId, courseId, pathId } = params;
    let mapLocationPromise = null;
    if(!sendToAnalytics) {
      mapLocationPromise = navigateMapService.getCurrentMapContext(courseId, classId);
    } else if (pathId) {
      // Commenting these lines until BE confirms that we don't need them
      /* mapLocationPromise = navigateMapService.startResource(
        courseId, unitId, lessonId, collectionId, resourceId, pathId, classId
      ).then(mapLocation => mapLocation.get('context')); */
      // Don't call next when the resource is played from the course map, use params
      mapLocationPromise = Ember.RSVP.resolve(Ember.Object.create({
        unitId: params.unitId,
        lessonId: params.lessonId,
        collectionId: params.collectionId,
        pathId: params.pathId
      }));
    } else {
      mapLocationPromise = navigateMapService.getCurrentMapContext(courseId, classId)
        .then(mapContext => navigateMapService.next(mapContext))
        .then(mapLocation => mapLocation.get('context'));
    }
    return mapLocationPromise;
  },

  loadCollection: function(collectionId, type) {
    const route = this;
    const isCollection = type === 'collection';
    const isAssessment = type === 'assessment';
    const loadAssessment = !type || isAssessment;
    const loadCollection = !type || isCollection;

    return Ember.RSVP.hashSettled({
      assessment: loadAssessment ? route.get('assessmentService').readAssessment(collectionId) : false,
      collection: loadCollection ? route.get('collectionService').readCollection(collectionId) : false
    }).then(function (hash) {
      let collectionFound = (hash.assessment.state === 'rejected') || (hash.assessment.value === false);
      return collectionFound ? (hash.collection.value ? hash.collection.value.toPlayerCollection() : undefined) : (hash.assessment.value ? hash.assessment.value.toPlayerCollection() : undefined);
    });
  }
});
