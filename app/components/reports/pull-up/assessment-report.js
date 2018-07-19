import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-assessment-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    onChooseGridView() {
      this.set('isGridView', true);
      this.set('isListView', false);
    },

    onChooseListView() {
      this.set('isGridView', false);
      this.set('isListView', true);
    },

    onToggleTimeSpentFlt() {
      this.toggleProperty('isTimeSpentFltApplied');
    },

    onToggleReactionFlt() {
      this.toggleProperty('isReactionFltApplied');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this assessment report.
   * @type {String}
   */
  classId: null,

  /**
   * CourseId belongs to this assessment report.
   * @type {String}
   */
  courseId: null,

  /**
   * UnitId belongs to this assessment report.
   * @type {String}
   */
  unitId: null,

  /**
   * UnitId belongs to this assessment report.
   * @type {[type]}
   */
  lessonId: null,

  /**
   * AssessmentId of this report.
   * @type {[type]}
   */
  assessmentId: null,

  /**
   * List of collection mapped to lesson.
   * @type {Array}
   */
  collections: null,

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * This property will get change based on view selection, by default grid view off.
   * @type {Boolean}
   */
  isGridView: false,

  /**
   * This property will get change based on view selection, by default list view  on.
   * @type {Boolean}
   */
  isListView: true,

  /**
   * This property will get change based on filter selection, by default reaction filter off.
   * @type {Boolean}
   */
  isReactionFltApplied: false,

  /**
   * This property will get change based on filter selection, by default timespent filter off.
   * @type {Boolean}
   */
  isTimeSpentFltApplied: false,

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      850
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      850,
      function() {
        component.set('showPullUp', false);
      }
    );
  }
});
