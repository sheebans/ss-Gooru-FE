import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import QuizzesReport from 'quizzes-addon/routes/reports/context';
import QuizzesContext from 'quizzes-addon/models/context/context';

/**
 * Route for collection/assessment report
 *
 * Gathers and passes initialization data for class performance
 * from analytics to the controller
 *
 * @module
 * @augments ember/Route
 */
export default QuizzesReport.extend(PrivateRouteMixin, {

  templateName: 'reports/context',

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  tourService: Ember.inject.service('tours'),

  collectionService: Ember.inject.service('api-sdk/collection'),

  assessmentService: Ember.inject.service('api-sdk/assessment'),

  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {ContextService} contextService
   * @property {Ember.Service} Service to send context related events
   */
  quizzesContextService: Ember.inject.service('quizzes/context'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    navigateBack: function () {
      window.history.back();
    }

  },


  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    const route = this;
    const collectionId = params.collectionId;
    const anonymous = params.anonymous;
    let collection;

    // Get initialization data from analytics
    return route.get('assessmentService').readAssessment(collectionId).then(function(assessment) {
      collection = assessment;
      return route.createContext(params, collection);
    }).then(function({ id }) {
      params.cdnURL = route.get('session.cdnUrls.content');
      params.type = collection.get('collectionType');
      params.contextId = id;
      params.anonymous = anonymous;
      return route.quizzesModel(params);
    });
  },

  /**
   * @param {All route params} params
   * @param {Collection} collection
   */
  createContext(params, collection) {
    return this.get('quizzesContextService').createContext(QuizzesContext.create({
      collectionId: collection.get('id'),
      title: collection.get('title'),
      isCollection: collection.get('isCollection'),
      classId: params.classId,
      contextMapping: {
        courseId: collection.get('courseId'),
        unitId: collection.get('unitId'),
        lessonId: collection.get('lessonId')
      }
    }));
  }

});
