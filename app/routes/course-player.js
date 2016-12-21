import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import Context from 'gooru-web/models/result/context';
import {generateUUID} from 'gooru-web/utils/utils';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Course Player Route
 *
 * The course player route extends the player route to provide the context player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend(PrivateRouteMixin, {


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type CourseService
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type UnitService
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Gets player model, overrides parent method and loads lesson
   * @param {*} params
   * @param {Context} context
   * @param {Collection} collection
   * @returns {Promise.<*>}
   */
  playerModel: function(params, context, collection, originalCollection) {
    const route = this;
    return this._super(params, context, collection).then(function(model) {
      const courseId = context.get('courseId');
      const unitId = context.get('unitId');
      const lessonId = context.get('lessonId');

      model.originalcollection = originalCollection;

      return Ember.RSVP.hash({
        course: route.get('courseService').fetchById(courseId),
        unit: route.get('unitService').fetchById(courseId, unitId),
        lesson: route.get('lessonService').fetchById(courseId, unitId,lessonId)
      }).then(function(hash) {
        model.course = hash.course;
        model.unit = hash.unit;
        model.lesson = hash.lesson;
        return model;
      });
    });
  },

  setupController(controller, model) {
    controller.set('course', model.course);
    controller.set('unit', model.unit);
    controller.set('lesson', model.lesson);
    controller.set('originalCollection', model.originalCollection);
    // Call parent method
    this._super(...arguments);
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params){
    const route = this;
    const userId = route.get('session.userId');
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const sourceId = route.get("configuration.sourceId");

    return Context.create({
      userId: userId,
      collectionId: collectionId,
      parentEventId: generateUUID(), //TODO is this coming from BE?
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId,
      sourceId: sourceId
    });
  }
});
