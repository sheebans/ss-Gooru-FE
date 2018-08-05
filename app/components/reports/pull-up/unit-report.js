import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-unit-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

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
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let units = component.get('units');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = units.length - 1;
      }
      component.set('selectedUnit', units.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let units = component.get('units');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (units.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedUnit', units.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('next');
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
   * Stutent  chart report data
   * @type {Object}
   */
  studentChartReportData: Ember.A([]),

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
        '.report-content .pull-up-lesson-report-listview .on-scroll-fixed'
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
          component.calcluateCollectionPerformance(performance);
          component.parseClassMemberAndPerformanceData(performance);
          component.set('sortByLastnameEnabled', true);
          component.set('sortByFirstnameEnabled', false);
          component.set('isLoading', false);
          component.handleCarouselControl();
        }
      });
    });
  },

  calcluateCollectionPerformance(performance) {
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
    let usersChartData = Ember.A([]);
    classMembers.forEach(member => {
      let user = component.createUser(member);
      let userChartData = component.createUser(member);
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
      user.set('overAllScore', resultSet.overAllScore);
      user.set('hasStarted', resultSet.hasStarted);
      users.pushObject(user);
      userChartData.set('score', resultSet.overAllScore);
      userChartData.set('difference', 100 - resultSet.overAllScore);
      userChartData.set('hasStarted', resultSet.hasStarted);
      usersChartData.pushObject(userChartData);
    });
    users = users.sortBy(component.get('defaultSortCriteria'));
    usersChartData = usersChartData.sortBy(
      component.get('defaultSortCriteria')
    );
    component.set('studentReportData', users);
    component.set('studentChartReportData', usersChartData);
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
        performanceData.set('hasStarted', true);
        hasStarted = true;
        let lessonResult = lessonResults.findBy('id', `${userId}@${lessonId}`);
        if (lessonResult) {
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
        ? Math.round(totalScore / numberlessonstarted)
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
    let selectedElement = component.$('#report-carousel-wrapper .item.active');
    let units = component.get('units');
    let currentIndex = selectedElement.data('item-index');
    if (units.length - 1 === 0) {
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$('#report-carousel-wrapper .carousel-control.left')
          .addClass('in-active');
      } else {
        component
          .$('#report-carousel-wrapper .carousel-control.left')
          .removeClass('in-active');
      }
      if (currentIndex === units.length - 1) {
        component
          .$('#report-carousel-wrapper .carousel-control.right')
          .addClass('in-active');
      } else {
        component
          .$('#report-carousel-wrapper .carousel-control.right')
          .removeClass('in-active');
      }
    }
  }
});
