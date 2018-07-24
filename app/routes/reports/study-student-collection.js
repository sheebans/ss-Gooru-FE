import Ember from 'ember';
import StudentCollection from 'gooru-web/routes/reports/student-collection';

/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default StudentCollection.extend({
  templateName: 'reports/study-student-collection',

  // -------------------------------------------------------------------------
  // Dependencies

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
   * @type {LessonService} Service to retrieve unit information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * provides route 0
   */
  route0Service: Ember.inject.service('api-sdk/route0'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  model(params, transition) {
    let route = this;
    let courseId = params.courseId;
    let unitId = params.unitId;
    let lessonId = params.lessonId;
    let navigateMapService = route.get('navigateMapService');
    let studentCollectionModel;
    const pathType = params.pathType || transition.queryParams.pathType; //pathType gets trucated by deserializer hook thus used from transition
    return route
      .studentCollectionModel(params)
      .then(collectionModel => {
        studentCollectionModel = collectionModel;
        var unitPromise = null;
        var lessonPromise = null;

        if (pathType === 'route0') {
          let route0Model = route
            .get('route0Service')
            .getRoute0({ classId: params.classId, courseId: courseId });
          if (route0Model) {
            let units = Ember.Object.create(),
              lessono = Ember.Object.create();
            route0Model.route0Content.units.forEach(function(unit) {
              if (unit.unitId === unitId) {
                units = Ember.Object.create({
                  id: unitId,
                  title: unit.unitTitle,
                  sequence: unit.unitSequence
                });
              }
            });

            route0Model.route0Content.units.forEach(function(unit) {
              if (unit.unitId === unitId) {
                unit.lessons.forEach(function(lesson) {
                  if (lesson.lessonId === lessonId) {
                    let cols = [];
                    lesson.collections.forEach(function(col) {
                      cols.push(
                        Ember.Object.create({
                          id: col.collectionId,
                          title: col.collectionTitle,
                          sequence: col.collectionSequence
                        })
                      );
                    });
                    let colobj = Ember.A(cols);
                    lessono = Ember.Object.create({
                      id: lessonId,
                      title: lesson.lessonTitle,
                      sequence: lesson.lessonSequence,
                      children: colobj
                    });
                  }
                });
              }
            });
            let unitmodeldata = Ember.Object.create(units);
            let lessonmodeldata = Ember.Object.create(lessono);
            unitPromise = Ember.RSVP.Promise.resolve(unitmodeldata);
            lessonPromise = Ember.RSVP.Promise.resolve(lessonmodeldata);
          }
        } else {
          unitPromise = route.get('unitService').fetchById(courseId, unitId);
          lessonPromise = route
            .get('lessonService')
            .fetchById(courseId, unitId, lessonId);
        }
        return Ember.RSVP.hash({
          course: route.get('courseService').fetchById(courseId),
          unit: unitPromise,
          lesson: lessonPromise,
          mapLocation: navigateMapService.getMapLocation(params),
          minScore: params.minScore
        });
      })
      .then(function(hash) {
        if (pathType !== 'route0') {
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
        }
        return Object.assign(studentCollectionModel, hash);
      });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties({
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      mapLocation: model.mapLocation,
      profile: model.profile,
      minScore: model.minScore
    });
    controller.confettiSetup();
  },

  deactivate: function() {
    this.get('controller').resetValues();
  }
});
