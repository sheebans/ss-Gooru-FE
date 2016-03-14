import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import Context from 'gooru-web/models/result/context';
import {generateUUID} from 'gooru-web/utils/utils';


/**
 * Context Player Route
 *
 * The context player route extends the player route to provide the context player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend({


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Gets player model, overrides parent method and loads lesson
   * @param {*} params
   * @param {Context} context
   * @param {Collection} collection
   * @returns {Promise.<*>}
   */
  playerModel: function(params, context, collection){
    const route = this;
    return this._super(params, context, collection).then(function(model){
      const courseId = context.get("courseId");
      const unitId = context.get("unitId");
      const lessonId = context.get("lessonId");
      return route.get('lessonService').findById(courseId, unitId, lessonId).then(function(lesson){
        model.lesson = lesson;
        return model;
      });
    });
  },


  setupController(controller, model) {
    // Call parent method
    controller.set("onAir", true); //TODO check for onAir
    controller.set("lesson", model.lesson);

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

    return Context.create({
      userId: userId,
      collectionId: collectionId,
      parentEventId: generateUUID(), //TODO is this coming from BE?
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  }

});
