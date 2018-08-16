import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-course-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    openUnitReport(unit, units) {
      let component = this;
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: unit.get('id'),
        lessonId: component.get('lessonId'),
        unit: unit,
        units: units,
        classMembers: component.get('classMembers')
      };
      this.sendAction('onOpenUnitReport', params);
    },

    onClickChart(userId) {
      return userId;
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
   * Unit Id belongs to this course report.
   * @type {String}
   */
  unitId: Ember.computed.alias('context.unitId'),

  /**
   * Maintains list of course items.
   * @type {Array}
   */
  units: Ember.computed('context.course', function() {
    let units = this.get('context.course.children');
    return units;
  }),

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * List of class members
   * @type {Object}
   */
  classMembers: Ember.computed.alias('context.classMembers'),

  /**
   *  Stutent  report data
   * @type {Object}
   */
  studentReportData: Ember.A([]),

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * This attribute decide default sorting key
   * @type {String}
   */
  defaultSortCriteria: 'lastName',

  /**
   * Maintain the status of sort by firstName
   * @type {String}
   */
  sortByFirstnameEnabled: false,

  /**
   * Maintain the status of sort by lastName
   * @type {String}
   */
  sortByLastnameEnabled: true,

  /**
   * Maintain the status of sort by score
   * @type {String}
   */
  sortByScoreEnabled: false,

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
      let scrollFixed = component.$(
        '.report-content .pull-up-course-report-listview .on-scroll-fixed'
      );
      if (scrollTop >= 347) {
        let position = scrollTop - 347;
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
    let classMembers = this.get('classMembers');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      performance: component
        .get('performanceService')
        .findClassPerformance(classId, courseId, classMembers)
    }).then(({ performance }) => {
      if (!component.isDestroyed) {
        component.calcluateUnitPerformance(performance);
        component.parseClassMemberAndPerformanceData(performance);
        component.set('sortByLastnameEnabled', true);
        component.set('sortByFirstnameEnabled', false);
        component.set('sortByScoreEnabled', false);
        component.set('isLoading', false);
      }
    });
  },

  calcluateUnitPerformance(performance) {
    let component = this;
    let units = component.get('units');
    units.map(function(unit) {
      let unitId = unit.get('id');
      const averageScore = performance.calculateAverageScoreByItem(unitId);
      const timeSpent = performance.calculateAverageTimeSpentByItem(unitId);
      const completionDone = performance.calculateSumCompletionDoneByItem(
        unitId
      );
      const completionTotal = performance.calculateSumCompletionTotalByItem(
        unitId
      );
      unit.set(
        'performance',
        Ember.Object.create({
          score: averageScore,
          timeSpent: timeSpent,
          hasStarted: averageScore > 0 || timeSpent > 0,
          isCompleted: completionDone > 0 && completionDone >= completionTotal
        })
      );
      return unit;
    });
  },

  parseClassMemberAndPerformanceData(performance) {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    classMembers.forEach(member => {
      let user = component.createUser(member);
      let units = component.get('units');
      let performanceData = performance.get('studentPerformanceData');
      let userId = member.get('id');
      let userPerformance = performanceData.findBy('user.id', userId);
      let resultSet = component.parsePerformanceUnitAndUserData(
        userId,
        units,
        userPerformance
      );
      user.set('userPerformanceData', resultSet.userPerformanceData);
      user.set('hasStarted', resultSet.hasStarted);
      user.set('score', resultSet.overAllScore);
      // Reform score value and store in score-use-for-sort field, to handle sort.
      // -1 defines not started.
      if (!resultSet.hasStarted) {
        user.set('score-use-for-sort', -1);
      } else {
        user.set('score-use-for-sort', resultSet.overAllScore);
      }
      user.set('difference', 100 - resultSet.overAllScore);
      users.pushObject(user);
    });
    users = users.sortBy(component.get('defaultSortCriteria'));
    component.set('studentReportData', users);
  },

  createUser(user) {
    return Ember.Object.create({
      id: user.get('id'),
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      avatarUrl: user.get('avatarUrl')
    });
  },

  parsePerformanceUnitAndUserData(userId, units, userPerformance) {
    let userPerformanceData = Ember.A([]);
    let totalScore = 0;
    let totalTimeSpent = 0;
    let hasStarted = false;
    let numberunitstarted = 0;
    let unitResults = userPerformance.get('performanceData');
    units.forEach((unit, index) => {
      let unitId = unit.get('id');
      let performanceData = Ember.Object.create({
        id: unit.get('id'),
        sequence: index + 1
      });
      if (userPerformance) {
        let unitResult = unitResults.findBy('id', `${userId}@${unitId}`);
        if (unitResult) {
          performanceData.set('hasStarted', true);
          hasStarted = true;
          let score = unitResult.get('score') ? unitResult.get('score') : 0;
          performanceData.set('timeSpent', unitResult.get('timeSpent'));
          performanceData.set('score', score);
          totalScore = totalScore + score;
          totalTimeSpent = totalTimeSpent + unitResult.get('timeSpent');
          numberunitstarted++;
        } else {
          performanceData.set('hasStarted', false);
        }
      } else {
        performanceData.set('hasStarted', false);
      }
      userPerformanceData.pushObject(performanceData);
    });
    let overAllScore =
      numberunitstarted > 0 ? Math.round(totalScore / numberunitstarted) : 0;
    let resultSet = {
      userPerformanceData: userPerformanceData,
      overAllScore: overAllScore,
      hasStarted: hasStarted,
      totalTimeSpent: totalTimeSpent
    };
    return resultSet;
  }
});
