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

    const navigateMapService = route.get('navigateMapService');

    return navigateMapService.getCurrentMapContext(courseId, classId).then(currentContext => {
      const unitId = currentContext.get('unitId');
      const lessonId = currentContext.get('lessonId');
      const collectionId = currentContext.get('collectionId');
      const collectionType = currentContext.get('collectionType');

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
      return collectionFound ? hash.collection.value.toPlayerCollection() : hash.assessment.value.toPlayerCollection();
    });
  }
});
