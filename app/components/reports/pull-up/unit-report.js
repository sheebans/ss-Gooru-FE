import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'backdrop-pull-ups', 'pull-up-unit-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {UnitService} Service to retrieve unitService information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    onClickPrev() {
      let component = this;
      component
        .$('.unit-report-container #report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let units = component.get('units');
      let selectedElement = component.$(
        '.unit-report-container #report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = units.length - 1;
      }
      component.set('selectedUnit', units.objectAt(selectedIndex));
      component
        .$('.unit-report-container #report-carousel-wrapper')
        .carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$('.unit-report-container #report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let units = component.get('units');
      let selectedElement = component.$(
        '.unit-report-container #report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (units.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedUnit', units.objectAt(selectedIndex));
      component
        .$('.unit-report-container #report-carousel-wrapper')
        .carousel('next');
      component.loadData();
    },

    openLessonReport(lesson, lessons) {
      let component = this;
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unitId'),
        lessonId: component.get('lessonId'),
        lesson: lesson,
        unit: component.get('unit'),
        lessons: lessons,
        classMembers: component.get('classMembers')
      };
      this.sendAction('onOpenLessonReport', params);
    },

    openStudentUnitReport(userId) {
      let component = this;
      let unit = Ember.Object.create({
        id: component.get('unit.id'),
        title: component.get('unit.title'),
        bigIdeas: component.get('unit.bigIdeas'),
        performance: component.getUnitPerformanceForClassMember(userId)
      });
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unit.id'),
        unit: unit,
        units: component.get('units'),
        userId: userId
      };
      component.set('showStudentUnitReport', true);
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
    this.slideToSelectedUnit();
    this.loadData();
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this unit report.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this unit report.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Course belongs to this unit report.
   * @type {String}
   */
  course: Ember.computed.alias('context.course'),

  /**
   * Unit Id belongs to this unit report.
   * @type {String}
   */
  unitId: Ember.computed.alias('context.unitId'),

  /**
   * List of units mapped to unit.
   * @type {Array}
   */
  units: Ember.computed.alias('context.units'),

  /**
   * unit
   * @type {Object}
   */
  unit: null,

  /**
   * Maintains list of unit items.
   * @type {Array}
   */
  lessons: Ember.A([]),

  /**
   * Selected unit.
   * @type {Object}
   */
  selectedUnit: Ember.computed.alias('context.unit'),

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

  /**
   * Maintains the state of student unit report
   * @type {Boolean}
   */
  showStudentUnitReport: false,

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
    component.$('.unit-report-container .report-content').scroll(function() {
      let scrollTop = component
        .$('.unit-report-container .report-content')
        .scrollTop();
      let scrollFixed = component.$(
        '.unit-report-container .report-content .pull-up-unit-report-listview .on-scroll-fixed'
      );
      let height =
        component
          .$('.unit-report-container .report-content .report-carousel')
          .height() +
        component
          .$('.unit-report-container .report-content .report-header-container')
          .height();
      if (scrollTop >= height) {
        let position = scrollTop - height;
        component.$(scrollFixed).css('top', `${position}px`);
      } else {
        component.$(scrollFixed).css('top', '0px');
      }
    });
  },

  slideToSelectedUnit() {
    let component = this;
    let units = component.get('units');
    let selectedUnit = component.get('selectedUnit');
    let selectedIndex = units.indexOf(selectedUnit);
    component
      .$('.unit-report-container #report-carousel-wrapper')
      .carousel(selectedIndex);
  },

  loadData() {
    let component = this;
    const classId = this.get('classId');
    let unitId = component.get('selectedUnit.id');
    let courseId = component.get('courseId');
    let classMembers = this.get('classMembers');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      unit: component.get('unitService').fetchById(courseId, unitId)
    }).then(({ unit }) => {
      if (!component.isDestroyed) {
        component.set('unit', unit);
        component.set('lessons', unit.get('children'));
      }
      return Ember.RSVP.hash({
        performance: component
          .get('performanceService')
          .findClassPerformanceByUnit(classId, courseId, unitId, classMembers)
      }).then(({ performance }) => {
        if (!component.isDestroyed) {
          component.calcluateLessonPerformance(performance);
          component.parseClassMemberAndPerformanceData(performance);
          component.set('sortByLastnameEnabled', true);
          component.set('sortByFirstnameEnabled', false);
          component.set('sortByScoreEnabled', false);
          component.set('isLoading', false);
          component.handleCarouselControl();
        }
      });
    });
  },

  calcluateLessonPerformance(performance) {
    let component = this;
    let lessons = component.get('lessons');
    lessons.map(function(lesson) {
      let lessonId = lesson.get('id');
      const averageScore = performance.calculateAverageScoreByItem(lessonId);
      const timeSpent = performance.calculateAverageTimeSpentByItem(lessonId);
      const completionDone = performance.calculateSumCompletionDoneByItem(
        lessonId
      );
      const completionTotal = performance.calculateSumCompletionTotalByItem(
        lessonId
      );
      lesson.set(
        'performance',
        Ember.Object.create({
          score: averageScore,
          timeSpent: timeSpent,
          hasStarted: averageScore > 0 || timeSpent > 0,
          isCompleted: completionDone > 0 && completionDone >= completionTotal
        })
      );
      return lesson;
    });
  },

  parseClassMemberAndPerformanceData(performance) {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    classMembers.forEach(member => {
      let user = component.createUser(member);
      let lessons = component.get('lessons');
      let performanceData = performance.get('studentPerformanceData');
      let userId = member.get('id');
      let userPerformance = performanceData.findBy('user.id', userId);
      let resultSet = component.parsePerformanceLessonAndUserData(
        userId,
        lessons,
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

  parsePerformanceLessonAndUserData(userId, lessons, userPerformance) {
    let userPerformanceData = Ember.A([]);
    let totalScore = 0;
    let totalTimeSpent = 0;
    let hasStarted = false;
    let numberlessonstarted = 0;
    let lessonResults = userPerformance.get('performanceData');
    lessons.forEach((lesson, index) => {
      let lessonId = lesson.get('id');
      let performanceData = Ember.Object.create({
        id: lesson.get('id'),
        sequence: index + 1
      });
      if (userPerformance) {
        let lessonResult = lessonResults.findBy('id', `${userId}@${lessonId}`);
        if (lessonResult) {
          performanceData.set('hasStarted', true);
          hasStarted = true;
          let score = lessonResult.get('score') ? lessonResult.get('score') : 0;
          performanceData.set('timeSpent', lessonResult.get('timeSpent'));
          performanceData.set('score', score);
          totalScore = totalScore + score;
          totalTimeSpent = totalTimeSpent + lessonResult.get('timeSpent');
          numberlessonstarted++;
        } else {
          performanceData.set('hasStarted', false);
        }
      } else {
        performanceData.set('hasStarted', false);
      }
      userPerformanceData.pushObject(performanceData);
    });
    let overAllScore =
      numberlessonstarted > 0
        ? Math.floor(totalScore / numberlessonstarted)
        : 0;
    let resultSet = {
      userPerformanceData: userPerformanceData,
      overAllScore: overAllScore,
      hasStarted: hasStarted,
      totalTimeSpent: totalTimeSpent
    };
    return resultSet;
  },

  handleCarouselControl() {
    let component = this;
    let selectedUnit = component.get('selectedUnit');
    let units = component.get('units');
    let currentIndex = units.indexOf(selectedUnit);
    if (units.length - 1 === 0) {
      component
        .$('.unit-report-container #report-carousel-wrapper .carousel-control')
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.left'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.left'
          )
          .removeClass('in-active');
      }
      if (currentIndex === units.length - 1) {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.right'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.unit-report-container #report-carousel-wrapper .carousel-control.right'
          )
          .removeClass('in-active');
      }
    }
  },

  getUnitPerformanceForClassMember(userId) {
    let component = this;
    let studentReportData = component.get('studentReportData');
    let userPerformance = studentReportData.findBy('id', userId);
    if (userPerformance.get('hasStarted')) {
      return Ember.Object.create({
        score: userPerformance.get('score'),
        hasStarted: userPerformance.get('hasStarted')
      });
    }
  }
});
