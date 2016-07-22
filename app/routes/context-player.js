import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import Context from 'gooru-web/models/result/context';
import {generateUUID} from 'gooru-web/utils/utils';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Context Player Route
 *
 * The context player route extends the player route to provide the context player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend(PrivateRouteMixin, {


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),
  performanceService: Ember.inject.service('api-sdk/performance'),
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
      const classId = context.get("classId");
      const courseId = context.get("courseId");
      const unitId = context.get("unitId");
      const lessonId = context.get("lessonId");
      const userId = context.get('userId');
      return route.get('lessonService').fetchById(courseId, unitId, lessonId)
        .then(function(lesson){
          model.lesson = lesson;
          return route.get('performanceService').findStudentPerformanceByLesson(userId, classId, courseId, unitId, lessonId, [collection], {collectionType: 'assessment'})
          .then(function(result){
            if(collection.attempts === -1){
               model.assessmentAttemptsLeft = collection.attempts;
             }else {
               let attemptsLeft = collection.attempts - result.get(0).get('attempts');
               if (attemptsLeft > 0) {
                 model.assessmentAttemptsLeft = attemptsLeft;
               }else {
                 model.assessmentAttemptsLeft = 0;
               }
             }
            return model;
          });
      });
    });
  },


  setupController(controller, model) {
    controller.set("onAir", true); //TODO check for onAir
    controller.set("lesson", model.lesson);
    if (model.collection.isAssessment){
      controller.set('assessmentAttemptsLeft',model.assessmentAttemptsLeft);
      controller.set('showContent',false);
    }else{
      controller.set('showContent',true);
    }
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

    return Context.create({
      userId: userId,
      collectionId: collectionId,
      parentEventId: generateUUID(), //TODO is this coming from BE?
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  },

  deactivate: function(controller){
    this.get('controller').set('showContent',false)
  }

});
