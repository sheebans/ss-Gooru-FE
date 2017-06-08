import Ember from 'ember';
import { createDataMatrix } from 'gooru-web/utils/performance-data';
import ReportData from 'gooru-web/models/result/report-data';

/**
 * Teacher Performance Route
 *
 * Route responsible of the transitions and loading the model/data for the teacher class performance
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Route.extend({

  queryParams: {
    filterBy: {
      refreshModel: true
    },
    unitId: {
      refreshModel: true
    },
    lessonId: {
      refreshModel: true
    },
    collectionId: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {CourseService}
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService}
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {LessonService}
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type AnalyticsService
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @type CollectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @type AssessmentService
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),



  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Navigates to the assessment report
     */
    navigateToReport: function (performance, userPerformance){
      if (!performance.get('isAverage')) {
        const route = this;

        const queryParams = {
          collectionId: performance.get('id'),
          userId: userPerformance.get('userId'),
          type: performance.get('collectionType'),
          role: 'teacher',
          classId: route.get('controller.class.id'),
          unitId: route.get('controller.unit.id'),
          lessonId: route.get('controller.lesson.id'),
          courseId: route.get('controller.course.id')
        };

        const reportController = route.controllerFor('reports.student-collection-analytics');

        var currentUrl = route.router.get('url');
        reportController.set('backUrl',currentUrl);
        route.transitionTo('reports.student-collection-analytics', { queryParams: queryParams});
      }
    }

  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    const route = this;

    const courseId = route.modelFor('teacher.class').course.get('id');
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const collectionId = params.collectionId;
    const filterBy = params.filterBy;
    const isAssessment = !filterBy || filterBy === 'assessment';
    return Ember.RSVP.hash({
      course: courseId ? route.get('courseService').fetchById(courseId) : undefined,
      unit: unitId ? route.get('unitService').fetchById(courseId, unitId) : undefined,
      lesson: lessonId ? route.get('lessonService').fetchById(courseId, unitId, lessonId) : undefined,
      collection: collectionId ?
        (isAssessment ?
          route.get('assessmentService').readAssessment(collectionId) :
          route.get('collectionService').readCollection(collectionId)) : undefined
    });
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const route = this;
    controller.set('unit', model.unit);
    controller.set('lesson', model.lesson);
    controller.set('collection', model.collection ? model.collection.toPlayerCollection() : undefined);

    const course = controller.get('course');
    const unit = controller.get('unit');
    const lesson = controller.get('lesson');

    controller.updateBreadcrumb(course, 'course');
    if (unit) {
      course.children.find((child) => {
        if(unit.id === child.id) {
          unit.sequence = child.sequence;
        }
      });
      controller.updateBreadcrumb(unit, 'unit');
    }
    if (lesson) {
      unit.children.find((child) => {
        if(lesson.id === child.id) {
          lesson.sequence = child.sequence;
        }
      });
      controller.updateBreadcrumb(lesson, 'lesson');
    }

    route.loadData(controller);
    controller.get('classController').selectMenuItem('performance');
  },

  loadData: function (controller) {
    const route = this;
    controller.set('performanceDataMatrix', []);
    controller.set('reportData', null);

    if (controller.get('isAtCourseLevel')) {
      route.loadCourseData(controller);
    }
    else if (controller.get('isAtUnitLevel')) {
      route.loadUnitData(controller);
    }
    else if (controller.get('isAtLessonLevel')) {
      route.loadLessonData(controller);
    }
    else if (controller.get('isAtCollectionLevel')) {
      route.loadCollectionData(controller);
    }
    controller.restoreSelectedOptions();
  },

  /**
   * Loads course data
   */
  loadCourseData: function(controller) {
    const route = this;
    const filterBy = controller.get('filterBy');
    const classId = controller.get('class.id');
    const courseId = controller.get('class.courseId');
    const members = controller.get('class.members');
    let units = controller.get('course.children');
    units.forEach((child, index) => {
      child.set('sequence', index + 1);
    });
    if(courseId) {
      controller.get('performanceService').findClassPerformance(classId, courseId, members, {collectionType: filterBy})
        .then(function(classPerformanceData) {
          route.fixUnitsTotalCounts(controller, classPerformanceData, controller.get('filteredByAssessment'));
          const performanceData = createDataMatrix(units, classPerformanceData, 'course');
          controller.set('performanceDataMatrix', performanceData);
          controller.set('performanceDataHeaders', units);
          controller.set('headerType', 'unit');
        });
    }
  },

  /**
   * Loads unit data
   * @param controller
     */
  loadUnitData: function(controller) {
    const route = this;
    const filterBy = controller.get('filterBy');
    const classId = controller.get('class.id');
    const courseId = controller.get('class.courseId');
    const members = controller.get('class.members');
    const unitId = controller.get('unit.id');
    let lessons = controller.get('unit.children');
    lessons.forEach((child, index) => {
      child.set('sequence', index + 1);
    });
    controller.get('performanceService').findClassPerformanceByUnit(classId, courseId, unitId, members, {collectionType: filterBy})
      .then(function(classPerformanceData) {
        route.fixLessonTotalCounts(controller, unitId, classPerformanceData, controller.get('filteredByAssessment'));
        const performanceData = createDataMatrix(lessons, classPerformanceData, 'unit');
        controller.set('performanceDataMatrix', performanceData);
        controller.set('performanceDataHeaders', lessons);
        controller.set('headerType', 'lesson');
      });
  },

  /**
   * Loads lesson data
   * @param controller
   */
  loadLessonData: function(controller) {
    const filterBy = controller.get('filterBy');
    const classId = controller.get('class.id');
    const courseId = controller.get('class.courseId');
    const members = controller.get('class.members');
    const unitId = controller.get('unit.id');
    const lessonId = controller.get('lesson.id');
    const collections = controller.get('lesson.children') || [];
    controller.get('performanceService').findClassPerformanceByUnitAndLesson(classId, courseId, unitId, lessonId, members, {collectionType: filterBy})
      .then(function(classPerformanceData) {
        const filteredCollections = collections.filter(function(collection) {
          return (filterBy === 'both') || (collection.get('format') === filterBy);
        });
        const performanceData = createDataMatrix(filteredCollections, classPerformanceData, 'lesson');
        controller.set('performanceDataMatrix', performanceData);
        controller.set('performanceDataHeaders', filteredCollections);
        controller.set('headerType', 'collection');
      });
  },

  /**
   * Loads lesson data
   * @param controller
   */
  loadCollectionData: function(controller) {
    const route = this;
    const classId = controller.get('class.id');
    const courseId = controller.get('class.courseId');
    const members = controller.get('class.members');
    const unitId = controller.get('unit.id');
    const lessonId = controller.get('lesson.id');
    const collectionId = controller.get('collection.id');
    const collectionType = controller.get('collection.collectionType');
    return route.get('analyticsService')
      .findResourcesByCollection(classId, courseId, unitId, lessonId, collectionId, collectionType)
      .then(function(userResourcesResults) {
        const reportData = ReportData.create({
          students: members,
          resources: controller.get('collection.resources')
        });
        reportData.merge(userResourcesResults);
        controller.set('reportData', reportData);
      });
  },
  /**
   * Fixes total counts using data from core
   * @param classPerformanceData
   * @param filteredByAssessment
     */
  fixUnitsTotalCounts: function(controller, classPerformanceData, filteredByAssessment) {
    const contentVisibility = controller.get('contentVisibility');
    const studentPerformanceData = classPerformanceData.get('studentPerformanceData');
    studentPerformanceData.forEach(function(studentPerformance) {
      const performanceData = studentPerformance.get('performanceData');
      performanceData.forEach(function(performance) {
        const totals = filteredByAssessment ?
          contentVisibility.getTotalAssessmentsByUnit(performance.get('realId')) :
          contentVisibility.getTotalCollectionsByUnit(performance.get('realId'));
        performance.set('completionTotal', totals);
      });
    });
  },

  /**
   * Fixes total counts using data from core
   * @param unitId
   * @param classPerformanceData
   * @param filterBy
     */
  fixLessonTotalCounts: function(controller, unitId, classPerformanceData, filteredByAssessment) {
    const contentVisibility = controller.get('contentVisibility');
    const studentPerformanceData = classPerformanceData.get('studentPerformanceData');
    studentPerformanceData.forEach(function(studentPerformance) {
      const performanceData = studentPerformance.get('performanceData');
      performanceData.forEach(function(performance) {
        const totals = filteredByAssessment ?
          contentVisibility.getTotalAssessmentsByUnitAndLesson(unitId, performance.get('realId')) :
          contentVisibility.getTotalCollectionsByUnitAndLesson(unitId, performance.get('realId'));
        performance.set('completionTotal', totals);
      });
    });
  },


  /**
   * Cleanse the controller values
   */
  deactivate: function(){
    this.get('controller').resetValues();
  }
});
