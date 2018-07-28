import Ember from 'ember';
import { EMOTION_VALUES } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-collection-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

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
    },

    onClickPrev() {
      let component = this;
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let collections = component.get('collections');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = collections.length - 1;
      }
      component.set('selectedCollection', collections.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$('#report-carousel-wrapper .carousel-control')
        .addClass('in-active');
      let collections = component.get('collections');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (collections.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedCollection', collections.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('next');
      component.loadData();
    },

    studentReport(collection, userId) {
      let component = this;
      if (!userId) {
        userId = component.get('session.userId');
      }
      let params = {
        userId: userId,
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unit.id'),
        lessonId: component.get('lesson.id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        lesson: component.get('lesson'),
        isStudent: component.get('isStudent')
      };
      this.sendAction('studentReport', params);
    },

    onClickChart(userId) {
      let component = this;
      if (!userId) {
        userId = component.get('session.userId');
      }
      let collection = component.get('selectedCollection');
      let params = {
        userId: userId,
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unit.id'),
        lessonId: component.get('lesson.id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        lesson: component.get('lesson'),
        isStudent: component.get('isStudent')
      };
      this.sendAction('studentReport', params);
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
   * ClassId belongs to this collection report.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this collection report.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Unit belongs to this collection report.
   * @type {String}
   */
  unit: Ember.computed.alias('context.unitModel'),

  /**
   * Lesson belongs to this collection report.
   * @type {[type]}
   */
  lesson: Ember.computed.alias('context.lessonModel'),

  /**
   * collectionId of this report.
   * @type {[type]}
   */
  collectionId: Ember.computed.alias('context.collectionId'),

  /**
   * List of collection mapped to lesson.
   * @type {Array}
   */
  collections: Ember.computed('context.collections', function() {
    let collections = this.get('context.collections');
    return collections
      .filterBy('format', 'assessment')
      .filterBy('performance.hasStarted', true);
  }),

  /**
   * Selected collection.
   * @type {Array}
   */
  selectedCollection: Ember.computed.alias('context.collection'),

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

  /**
   * selected collection object which will have other meta data's
   * @type {Object}
   */
  collection: null,

  /**
   * List of class members
   * @type {Object}
   */
  classMembers: Ember.computed.alias('context.classMembers'),

  /**
   * Stutent  report data
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

  /**
   * Maintain the status of sort by overAllScore
   * @type {String}
   */
  sortByScoreEnabled: false,

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('collection.standards.[]', function() {
    let standards = this.get('collection.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * Maintains the state of role.
   * @type {Boolean}
   */
  isStudent: Ember.computed.alias('context.isStduent'),

  /**
   * Maintains list of students selected for  suggest
   * @type {Array}
   */
  studentsSelectedForSuggest: Ember.A([]),

  /**
   * Maintains maximum number of search results
   * @type {Number}
   */
  maxSearchResult: 6,

  /**
   * search result set
   * @type {Array}
   */
  searchResults: Ember.A([]),

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
        '.report-content .pull-up-collection-report-listview .on-scroll-fixed'
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
    let collectionId = component.get('selectedCollection.id');
    let format = component.get('selectedCollection.format');
    let unitId = component.get('unit.id');
    let lessonId = component.get('lesson.id');
    let courseId = component.get('courseId');
    let classId = component.get('classId');
    component.set('isLoading', true);
    return Ember.RSVP.hash({
      collection:
        format === 'assessment'
          ? component.get('assessmentService').readAssessment(collectionId)
          : component.get('collectionService').readCollection(collectionId),
      performance: component
        .get('analyticsService')
        .findResourcesByCollection(
          classId,
          courseId,
          unitId,
          lessonId,
          collectionId,
          format
        )
    }).then(({ collection, performance }) => {
      component.set('collection', collection);
      component.parseClassMemberAndPerformanceData(collection, performance);
      component.set('isLoading', false);
      component.loadSuggestion();
    });
  },

  parseClassMemberAndPerformanceData(collection, performance) {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    let usersChartData = Ember.A([]);
    let usersTotaltimeSpent = Ember.A([]);
    classMembers.forEach(member => {
      let user = Ember.Object.create({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        avatarUrl: member.avatarUrl
      });
      let userChartData = Ember.Object.create({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        avatarUrl: member.avatarUrl
      });
      let contents = collection.get('children');
      let userPerformance = performance.findBy('user', member.id);
      let resultSet = component.parsePerformanceContentAndUserData(
        contents,
        userPerformance
      );
      user.set('userPerformanceData', resultSet.userPerformanceData);
      user.set('overAllScore', resultSet.overAllScore);
      user.set('hasStarted', resultSet.hasStarted);
      userChartData.set('hasStarted', resultSet.hasStarted);
      userChartData.set('score', resultSet.overAllScore);
      userChartData.set('totalTimeSpent', resultSet.totalTimeSpent);
      userChartData.set('difference', 100 - resultSet.overAllScore);
      users.pushObject(user);
      usersChartData.pushObject(userChartData);
      usersTotaltimeSpent.push(resultSet.totalTimeSpent);
    });
    users = users.sortBy(component.get('defaultSortCriteria'));
    usersChartData = usersChartData.sortBy(
      component.get('defaultSortCriteria')
    );
    component.set('sortByLastnameEnabled', true);
    component.set('sortByFirstnameEnabled', false);
    component.set('sortByScoreEnabled', false);
    component.set('studentsSelectedForSuggest', Ember.A([]));
    component.set('searchResults', Ember.A([]));
    component.set('studentReportData', users);
    let maxTimeSpent = Math.max(...usersTotaltimeSpent);
    component.calculateTimeSpentScore(usersChartData, maxTimeSpent);
    component.set('studentChartReportData', usersChartData);
    component.handleCarouselControl();
  },

  parsePerformanceContentAndUserData(contents, userPerformance) {
    let userPerformanceData = Ember.A([]);
    let numberOfCorrectAnswers = 0;
    let totalTimeSpent = 0;
    let hasStarted = false;
    contents.forEach((content, index) => {
      let contentId = content.get('id');
      let performanceData = Ember.Object.create({
        id: content.get('id'),
        sequence: index + 1
      });
      if (userPerformance) {
        performanceData.set('hasStarted', true);
        hasStarted = true;
        let resourceResults = userPerformance.get('resourceResults');
        let resourceResult = resourceResults.findBy('resourceId', contentId);
        if (resourceResult) {
          let reaction = resourceResult.get('reaction');
          performanceData.set('reaction', reaction);
          if (reaction > 0) {
            let selectionEmotion = EMOTION_VALUES.findBy('value', reaction);
            performanceData.set('reaction_unicode', selectionEmotion.unicode);
          }
          if (resourceResult.get('correct')) {
            numberOfCorrectAnswers++;
          }
          totalTimeSpent = totalTimeSpent + resourceResult.get('timeSpent');
          performanceData.set('correct', resourceResult.get('correct'));
          performanceData.set('timeSpent', resourceResult.get('timeSpent'));
          performanceData.set('isSkipped', !resourceResult.get('userAnswer'));
        } else {
          performanceData.set('isSkipped', true);
        }
      } else {
        performanceData.set('hasStarted', false);
      }
      userPerformanceData.pushObject(performanceData);
    });

    let overAllScore = Math.round(
      (numberOfCorrectAnswers / contents.length) * 100
    );

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
    let collections = component.get('collections');
    let currentIndex = selectedElement.data('item-index');
    if (collections.length - 1 === 0) {
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
      if (currentIndex === collections.length - 1) {
        component
          .$('#report-carousel-wrapper .carousel-control.right')
          .addClass('in-active');
      } else {
        component
          .$('#report-carousel-wrapper .carousel-control.right')
          .removeClass('in-active');
      }
    }
  },

  calculateTimeSpentScore(usersChartData, maxTimeSpent) {
    usersChartData.forEach(data => {
      let timeSpentScore = Math.round(
        (data.get('totalTimeSpent') / maxTimeSpent) * 100
      );
      data.set('timeSpentScore', timeSpentScore);
      data.set('timeSpentDifference', 100 - timeSpentScore);
    });
  },

  loadSuggestion() {
    let component = this;
    let taxonomies = null;
    let collection = component.get('selectedCollection');
    let tags = component.get('tags');
    if (tags) {
      taxonomies = tags.map(tag => {
        return tag.data.id;
      });
    }
    let filters = component.getFilters();
    filters.taxonomies = taxonomies;
    let term =
      taxonomies != null && taxonomies.length > 0
        ? '*'
        : collection.get('title');

    component
      .get('searchService')
      .searchCollections(term, filters)
      .then(searchResults => {
        component.set('searchResults', searchResults);
      });
  },

  getFilters() {
    let component = this;
    let maxSearchResult = component.get('maxSearchResult');
    let params = {
      pageSize: maxSearchResult
    };
    return params;
  }
});
