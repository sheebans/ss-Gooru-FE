import Ember from 'ember';
import ReportData from 'gooru-web/models/result/report-data';
/**
 * Teacher Analytics Collection Report
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type CollectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),
  /**
   * @type UnitService
   */
  unitService: Ember.inject.service('api-sdk/unit'),


  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function(params) {

    const classModel = this.modelFor('class');
    const lessonId = params.lessonId;
    const unitId = params.unitId;
    const collectionId = params.collectionId;
    const courseId = classModel.class.get('course');

    const collectionService = this.get("collectionService");
    const collection = collectionService.findById(collectionId);
    const unit = this.get('unitService').findById(courseId, unitId);
    const lesson = this.get('lessonService').findById(courseId, unitId, lessonId);

    return Ember.RSVP.hash({
      unit: unit,
      lesson: lesson,
      collection: collection,
      userResults: Ember.A([]) //todo integrate with BE
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    let collection = model.collection;
    let reportData = ReportData.create({
      students: controller.get("students"),
      resources: collection.get("resources")
    });
    reportData.merge(model.userResults);

    controller.set("collection", collection);
    controller.set("reportData", reportData);
    controller.set("showFilters", false);

    //updating the breadcrumb with the unit, useful when refreshing the page
    controller.get("teacherController").updateBreadcrumb(model.unit, 'unit');
    //updating the breadcrumb with the lesson
    controller.get("teacherController").updateBreadcrumb(model.lesson, 'lesson');

    //disabling filters
    controller.set("teacherController.showFilters", false);
  }

});
