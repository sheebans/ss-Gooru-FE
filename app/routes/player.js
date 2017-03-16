import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import QuizzesPlayer from 'quizzes-addon/routes/player';
import QuizzesContext from 'quizzes-addon/models/context/context';

/**
 * @typedef { Ember.Route } PlayerRoute
 *
 * @module
 * @augments ember/Route
 */
export default QuizzesPlayer.extend(ModalMixin, ConfigurationMixin, {

  templateName: 'player',

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * When closing the player
     */
    closePlayer: function(){
      const $appContainer = Ember.$( ".app-container" );
      if ($appContainer.hasClass( "navigator-on" )){
        $appContainer.removeClass( "navigator-on" );
      }
      var route = !this.get('history.lastRoute.name') ? 'index' : this.get('history.lastRoute.url');
      this.transitionTo(route);
    },

    startAssessment: function(){
      const controller = this.get("controller");
      controller.startAssessment();
    },

    /**
     * Navigates to the assessment report
     */
    navigateToReport: function (){
      const route = this;
      const controller = route.get("controller");
      let context = controller.get("context");
      let collection = controller.get("collection");
      const queryParams = {
        collectionId: context.get("collectionId"),
        userId: controller.get('session.userId'),
        type: collection.get("collectionType"),
        role: controller.get("role")
      };
      if (context.get("classId")) {
        queryParams.classId = context.get("classId");
        queryParams.courseId = context.get("courseId");
        queryParams.unitId = context.get("unitId");
        queryParams.lessonId = context.get("lessonId");
      }

      const reportController = route.controllerFor('reports.student-collection');

        //this doesn't work when refreshing the page, TODO
      reportController.set("backUrl", route.get('history.lastRoute.url'));
      route.transitionTo('reports.student-collection', { queryParams: queryParams});
    },

    /**
     * On navigator remix collection button click
     * @param {Collection} collection
     */
    remixCollection: function (collection) {
      var remixModel = {
        content: collection
      };
      if(collection.get('isCollection')) {
        this.send('showModal', 'content.modals.gru-collection-remix', remixModel);
      } else {
        this.send('showModal', 'content.modals.gru-assessment-remix', remixModel);
      }
    }

  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Ember.Service} Service to retrieve a collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {Ember.Service} Service to retrieve an asssessment
   */
  assessmentService: Ember.inject.service("api-sdk/assessment"),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const collectionId = params.collectionId;
    const type = params.type;
    const isCollection = type === 'collection';
    const isAssessment = type === 'assessment';

    const loadAssessment = !type || isAssessment;
    const loadCollection = !type || isCollection;

    let collection;

    return Ember.RSVP.hashSettled({
      assessment: loadAssessment ? route.get('assessmentService').readAssessment(collectionId) : false,
      collection: loadCollection ? route.get('collectionService').readCollection(collectionId) : false
    }).then(function(hash) {
      let collectionFound = (hash.assessment.state === 'rejected') || (hash.assessment.value === false);
      collection = collectionFound ? hash.collection.value : hash.assessment.value;
      return route.createContext(params, collection);
    }).then(function({ id }) {
      params.profileId = route.get('session.userData.gooruUId');
      params.role = params.role || 'teacher';
      params.cdnURL = route.get('session.cdnUrls.content');
      params.type = collection.get('collectionType');
      params.routeURL = '';
      params.contextId = id;
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
      isCollection: collection.get('isCollection')
    }));
  }
});
