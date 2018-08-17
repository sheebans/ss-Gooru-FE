import Ember from 'ember';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-student-course-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {Session}
   */
  session: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Action triggered when click unit report.
     * @param  {Unit} unit
     * @param  {Units} units
     */
    openUnitReport(unit, units) {
      let component = this;
      let isTeacher = component.get('class')
        ? component.get('class').isTeacher(component.get('session.userId'))
        : false;
      let params = {
        classId: component.get('classId'),
        isTeacher: isTeacher,
        isStduent: !isTeacher,
        courseId: component.get('courseId'),
        unitId: unit.get('id'),
        unit: unit,
        units: units,
        userId: component.get('userId')
      };
      component.set('showUnitReport', true);
      component.set('studentUnitReportContext', params);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.handleScrollToFixHeader();
    this.openPullUp();
    this.loadData();
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this course report.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * Class belongs to this course report.
   * @type {String}
   */
  class: Ember.computed.alias('context.class'),

  /**
   * CourseId belongs to this course report.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Course belongs to this course report.
   * @type {String}
   */
  course: Ember.computed.alias('context.course'),

  /**
   * Maintains list of course items.
   * @type {Array}
   */
  units: Ember.computed('context.course', function() {
    let units = this.get('context.course.children');
    return units;
  }),

  /**
   * Property to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Student user id
   * @type {Object}
   */
  userId: Ember.computed.alias('context.userId'),

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('course.taxonomy.[]', function() {
    let standards = this.get('course.taxonomy');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * Maintains the state of unit report.
   * @type {Boolean}
   */
  showUnitReport: false,

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
      400
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  handleScrollToFixHeader() {
    let component = this;
    component.$('.report-content').scroll(function() {
      let scrollTop = component.$('.report-content').scrollTop();
      let scrollFixed = component.$('.report-content  .on-scroll-fixed');
      let reportCarouselTagsHeight =
        component.$('.report-content .report-carousel-tags').height() + 15;
      if (scrollTop >= reportCarouselTagsHeight) {
        let position = scrollTop - reportCarouselTagsHeight;
        component.$(scrollFixed).css('top', `${position}px`);
      } else {
        component.$(scrollFixed).css('top', '0px');
      }
    });
  },

  loadData() {
    let component = this;
    const classId = this.get('classId');
    let courseId = component.get('courseId');
    let userId = component.get('userId');
    let units = component.get('units');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      unitsPerformance: component
        .get('performanceService')
        .findStudentPerformanceByCourse(userId, classId, courseId, units)
    }).then(({ unitsPerformance }) => {
      if (!component.isDestroyed) {
        component.renderUnitsPerformance(unitsPerformance);
        component.set('isLoading', false);
      }
    });
  },

  renderUnitsPerformance(unitsPerformance) {
    let component = this;
    let units = component.get('units');
    let unitList = Ember.A([]);
    units.forEach(unit => {
      let unitCopy = unit.copy();
      let unitPerformance = unitsPerformance.findBy('id', unit.get('id'));
      unitCopy.set('performance', unitPerformance);
      unitList.pushObject(unitCopy);
    });
    component.set('units', unitList);
  }
});
