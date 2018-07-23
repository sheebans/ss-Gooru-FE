import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  classNames: ['learner-proficiency-pull-up'],

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
  // Events

  didInsertElement() {
    let component = this;
    let activeCategory = component.get('activeCategory');
    if (component.get('activeCategory')) {
      component.fetchSubjectsByCategory(activeCategory);
    }
  },

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
    }
  },

  // -------------------------------------------------------------------------
  // Actions
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

  /**
   * @property {Object}
   * Property to store active subject
   */
  activeSubject: null,

  /**
   * @property {String}
   * Property to store currently selected student's full name
   */
  studentFullName: Ember.computed('student', function() {
    let component = this;
    let firstName = component.get('student.firstName') || '';
    let lastName = component.get('student.lastName') || '';
    return `${firstName} ${lastName}`;
  })
});
