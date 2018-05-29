import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * taxonomy service dependency injection
   * @type {Object}
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  parentController: Ember.inject.controller('profile'),

  // -------------------------------------------------------------------------
  // Events

  init() {
    let controller = this;
    let subjectCategory = controller.get('selectedSubjectCategory');
    controller.fetchSubjectsByCategory(subjectCategory);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    //Action triggered when the user click a subject from the right panel
    onSelectItem(item) {
      let controller = this;
      controller.set('selectedSubject', item);
    },

    /**
     * Action triggered when the use toggle matrix view
     */
    onToggleView(item) {
      let controller = this;
      controller.set('selectedMatrixView', item);
    },

    onToggleChart(isChecked) {
      let controller = this;
      controller.set('isExpandChartEnabled', isChecked);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function fetchSubjectsByCategory
   * @param subjectCategory
   * Method to fetch list of subjects using given category level
   */
  fetchSubjectsByCategory(subjectCategory) {
    let controller = this;
    controller
      .get('taxonomyService')
      .getTaxonomySubjects(subjectCategory)
      .then(subjects => {
        let subject = subjects.objectAt(1);
        controller.set('taxonomySubjects', subjects);
        controller.set('selectedSubject', subject);
      });
  },

  // -------------------------------------------------------------------------
  // Properties

  queryParams: ['classId'],

  /**
   * @type {String}
   * User selected class id
   */
  classId: null,

  /**
   * @property {String}
   * Property to store user selected category level
   */
  selectedSubjectCategory: 'k_12',

  /**
   * @property {Array}
   * Property to store list of taxonomy subjects
   */
  taxonomySubjects: null,

  /**
   * @property {Object}
   * Property to store user selected subject info
   */
  selectedSubject: null,

  /**
   * @property {String}
   * Property to store userId of the student
   */
  userId: null,

  /**
   * @type {String}
   * Property to store user selected matrix view
   */
  selectedMatrixView: 'domain',

  /**
   * Property to show/hide expanded chart
   */
  isExpandChartEnabled: false
});
