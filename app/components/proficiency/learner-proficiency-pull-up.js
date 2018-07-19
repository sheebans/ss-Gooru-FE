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
  // Properties

  didInsertElement(){
    let component = this;
    let activeCategory = component.get('activeCategory');
    component.fetchSubjectsByCategory(activeCategory);
  },

  observer: Ember.observer('isShowProficiencyPullup', function() {
    let component = this;
    let activeCategory = component.get('activeCategory');
    component.fetchSubjectsByCategory(activeCategory);
  }),

  actions: {
    onSelectMonth(date) {
      let timeLine = {
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
      this.set('timeLine', timeLine);
    },

    onSelectCategory(category) {
      let component = this;
      component.fetchSubjectsByCategory(category);
      component.set('activeCategory', category);
    },

    onSelectSubject(subject) {
      let component = this;
      component.set('activeSubject', subject);
    }
  },

  /**
   * @function fetchSubjectsByCategory
   * @param subjectCategory
   * Method to fetch list of subjects using given category level
   */
  fetchSubjectsByCategory(category) {
    let controller = this;
    controller
      .get('taxonomyService')
      .getSubjects(category.value)
      .then(subjects => {
        let subject = subjects.objectAt(0);
        controller.set('taxonomySubjects', subjects);
        controller.set('activeSubject', subject);
      });
  },

  timeLine: Ember.computed(function() {
    let curDate = new Date;
    return {
      month: curDate.getMonth() + 1,
      year: curDate.getFullYear()
    };
  }),

  taxonomyCategories: TAXONOMY_CATEGORIES,

  taxonomySubjects: Ember.A([]),

  activeCategory: TAXONOMY_CATEGORIES[0],

  activeSubject: null,

  studentFullName: Ember.computed('student', function() {
    let component = this;
    let firstName = component.get('student.firstName') || '';
    let lastName = component.get('student.lastName') || '';
    return `${firstName  } ${  lastName}`;
  })
});
