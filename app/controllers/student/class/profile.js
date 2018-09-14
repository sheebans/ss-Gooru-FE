import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import { getSubjectIdFromSubjectBucket } from 'gooru-web/utils/utils';
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * Competency service dependency injection
   * @type {Object}
   */
  competencyService: Ember.inject.service('api-sdk/competency'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when select a month from chart
     */
    onSelectMonth(date) {
      let timeLine = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
      this.set('timeLine', timeLine);
    },

    /**
     * Action triggered when select a subject
     */
    onSelectSubject(subject) {
      let component = this;
      component.set('activeSubject', subject);
    },

    /**
     * Action triggered at once the baseline is drawn
     */
    onShownBaseLine(createdDate) {
      let component = this;
      component.set(
        'timeSeriesStartDate',
        createdDate ? new Date(createdDate) : component.get('courseStartDate')
      );
      component.set('isShowTimeSeries', true);
    },

    /**
     * Action triggered when select a competency
     */
    onSelectCompetency(competency) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('isShowCompetencyContentReport', true);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchSubjectsByCategory
   * @param subjectCategory
   * Method to fetch list of subjects using given category level
   */
  fetchSubjectsByCategory(category) {
    let component = this;
    component
      .get('taxonomyService')
      .getTaxonomySubjects(category.value)
      .then(subjects => {
        let subject = component.getActiveSubject(subjects);
        component.set('taxonomySubjects', subjects);
        component.set('activeSubject', subject);
      });
  },

  /**
   * @property {Boolean} isShowMatrixChart
   */
  isShowMatrixChart: Ember.computed('taxonomySubjects', function() {
    let component = this;
    let course = component.get('course');
    let isShowMatrixChart = false;
    if (course.get('id')) {
      let taxonomySubjects = component.get('taxonomySubjects');
      let subjectBucket = component.get('subjectBucket');
      let subjectCode = subjectBucket
        ? getSubjectIdFromSubjectBucket(subjectBucket)
        : null;
      let isSupportedTaxonomySubject = taxonomySubjects.findBy(
        'code',
        subjectCode
      );
      let aggregatedTaxonomy = course.get('aggregatedTaxonomy');
      isShowMatrixChart = !!(aggregatedTaxonomy && isSupportedTaxonomySubject);
    }
    return isShowMatrixChart;
  }),

  /**
   * @function getActiveSubject
   * Method to get active subject by using subject bucket
   */
  getActiveSubject(subjects) {
    let component = this;
    let activeSubject = subjects.objectAt(1);
    let subjectBucket = component.get('subjectBucket');
    subjects.map(subject => {
      if (subjectBucket.split(subject.id).length > 1) {
        activeSubject = subject;
      }
    });
    return activeSubject;
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {JSON}
   * Property to store currently selected month and year
   */
  timeLine: Ember.computed(function() {
    let curDate = new Date();
    return {
      month: curDate.getMonth() + 1,
      year: curDate.getFullYear()
    };
  }),

  /**
   * @property {Array}
   * Property to store list of taxonomy subjects
   */
  taxonomySubjects: Ember.A([]),

  /**
   * @property {JSON}
   * Property to store active category //TODO for now it is always K12
   */
  activeCategory: TAXONOMY_CATEGORIES[0],

  /** @property */
  courseId: null,

  /**
   * @property {Object}
   * Property to store active subject
   */
  activeSubject: null,

  /**
   * @property {Date}
   * Property to store course started date or one year before date
   */
  courseStartDate: Ember.computed('course', function() {
    let component = this;
    let course = component.get('course');
    let courseCreatedDate = new Date();
    if (course && course.createdDate) {
      courseCreatedDate = new Date(course.createdDate);
    } else {
      let curMonth = courseCreatedDate.getMonth();
      let curYear = courseCreatedDate.getFullYear();
      let oneYearBeforeFromCurrentDate = courseCreatedDate;
      courseCreatedDate = new Date(
        oneYearBeforeFromCurrentDate.setMonth(curMonth - 11)
      );
      courseCreatedDate = new Date(
        oneYearBeforeFromCurrentDate.setFullYear(curYear - 1)
      );
    }
    return courseCreatedDate;
  }),

  /**
   * @property {Boolean} isShowTimeSeries
   */
  isShowTimeSeries: false,

  /**
   * @property {Date} timeSeriesStartDate
   */
  timeSeriesStartDate: null,

  /**
   * @property {String}
   * Property to store coruse subject bucket or K12.MA will be default
   */
  subjectBucket: Ember.computed('course', function() {
    let controller = this;
    return controller.get('course.subject') || 'K12.MA';
  }),

  /**
   * @property {Boolean}
   * Property to show/hide competency content report
   */
  isShowCompetencyContentReport: false
});
