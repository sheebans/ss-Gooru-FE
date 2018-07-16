import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Collapses the header section
     * @param {boolean} state
     */
    toggleHeader: function(state) {
      var $panels = $('.header .panel');
      if (state) {
        $panels.slideUp();
      } else {
        $panels.slideDown();
      }
    },

    /**
     *  teacher class assessment report view  backbutton to pass  class report  page
     */
    backToClassReport: function() {
      this.get('router').transitionTo(this.get('backUrls'));
    },
    profileTeacher: function(teacher) {
      let controller = this;
      let teacherId = teacher.get('id');
      let classId = controller.get('class.id');
      localStorage.setItem('classId', classId);
      this.transitionToRoute(`/${teacherId}/about?classId=${classId}`);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get('menuItem');
    this.selectItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,

  /**
   * The class is rescoped
   * @property {String}
   */
  isRescopedClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting.rescope : false;
  }),

  /**
   * @property {boolean} Indicates if course has 1 or more units
   */
  hasUnits: Ember.computed.gt('course.unitCount', 0),

  /**
   * @property {boolean} Indicates if class has 1 or more students
   */
  hasStudents: Ember.computed.gt('class.countMembers', 0),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item) {
    this.set('menuItem', item);
  },

  /**
   * @function updateLastAccessedClass
   * Method to update last accessed data into the localStorage using key userId_recent_class
   */
  updateLastAccessedClass(classData) {
    let controller = this;
    let userId = controller.get('session.userId');
    let lastAccessedClassData = {};
    if (classData) {
      lastAccessedClassData = {
        id: classData.id,
        title: classData.title,
        performance: controller.getClassPerformance(
          classData.performanceSummary
        )
      };
    }
    localStorage.setItem(
      `${userId}_recent_class`,
      JSON.stringify(lastAccessedClassData)
    );
    return lastAccessedClassData;
  },

  /**
   * @function getClassPerformance
   * Method to get class performance from given class performance summary
   */
  getClassPerformance(performanceSummary) {
    let classPerformance = null;
    if (performanceSummary) {
      classPerformance = {
        score: performanceSummary.score,
        timeSpent: performanceSummary.timeSpent,
        total: performanceSummary.total,
        totalCompleted: performanceSummary.totalCompleted
      };
    }
    return classPerformance;
  }
});
