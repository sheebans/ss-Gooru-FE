import Ember from 'ember';
import { EMOTION_VALUES } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'backdrop-pull-ups', 'pull-up-collection-report'],

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
        .$(
          '.collection-report-container #report-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let collections = component.get('collections');
      let selectedElement = component.$(
        '.collection-report-container #report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = collections.length - 1;
      }
      component.set('selectedCollection', collections.objectAt(selectedIndex));
      component
        .$('.collection-report-container #report-carousel-wrapper')
        .carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      component
        .$(
          '.collection-report-container #report-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
      let collections = component.get('collections');
      let selectedElement = component.$(
        '.collection-report-container #report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (collections.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedCollection', collections.objectAt(selectedIndex));
      component
        .$('.collection-report-container #report-carousel-wrapper')
        .carousel('next');
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
      component.set('studentReportContextData', params);
      component.set('isShowStudentReport', true);
    },

    onClickChart(userId, showReport) {
      if (showReport) {
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
        component.set('studentReportContextData', params);
        component.set('isShowStudentReport', true);
      }
    },

    openQuestionReport(question, contents) {
      let component = this;
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unit: component.get('unit'),
        lesson: component.get('lesson'),
        collection: component.get('selectedCollection'),
        selectedQuestion: question,
        contents: contents,
        classMembers: component.get('classMembers')
      };
      component.set('studentQuestionReportContextData', params);
      this.set('isShowQuestionReport', true);
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
    this.slideToSelectedCollection();
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
   * By default it will show both assessment and collections
   * @type {String}
   */
  filterByContentType: null,

  /**
   * List of collection mapped to lesson.
   * @type {Array}
   */
  collections: Ember.computed('context.collections', function() {
    let collections = this.get('context.collections');
    let filterByContentType = this.get('filterByContentType');
    let collectionList = collections.filterBy('performance.hasStarted', true);
    if (filterByContentType) {
      collectionList = collections.filterBy('format', filterByContentType);
    }
    return collectionList;
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
   * Maintain the status of sort by timeSpent
   * @type {String}
   */
  sortByTimeSpentEnabled: false,

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
   * suggest count
   * @type {Number}
   */
  suggestResultCount: 0,

  /**
   * Maintains context data
   * @type {Object}
   */
  context: null,

  /**
   * defaultSuggestContentType
   * @type {String}
   */
  defaultSuggestContentType: 'collection',

  /**
   * Maintains the state of student report pullup
   * @type {Boolean}
   */
  isShowStudentReport: false,

  /**
   * Maintains the state of question report pullup
   * @type {Boolean}
   */
  isShowQuestionReport: false,

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
    component
      .$('.collection-report-container .report-content')
      .scroll(function() {
        let scrollTop = component
          .$('.collection-report-container .report-content')
          .scrollTop();
        let scrollFixed = component.$(
          '.collection-report-container .report-content .pull-up-collection-report-listview .on-scroll-fixed'
        );
        let height =
          component
            .$('.collection-report-container .report-content .report-carousel')
            .height() +
          component
            .$(
              '.collection-report-container .report-content .report-header-container'
            )
            .height();
        if (scrollTop >= height) {
          let position = scrollTop - height;
          component.$(scrollFixed).css('top', `${position}px`);
        } else {
          component.$(scrollFixed).css('top', '0px');
        }
      });
  },

  slideToSelectedCollection() {
    let component = this;
    let collections = component.get('collections');
    let selectedCollection = component.get('selectedCollection');
    let selectedIndex = collections.indexOf(selectedCollection);
    component
      .$('.collection-report-container #report-carousel-wrapper')
      .carousel(selectedIndex);
  },

  loadData() {
    let component = this;
    let collectionId = component.get('selectedCollection.id');
    let format = component.get('selectedCollection.format');
    let unitId = component.get('unit.id');
    let lessonId = component.get('lesson.id');
    let courseId = component.get('courseId');
    let classId = component.get('classId');
    let collectionType = format === 'collection' ? 'collection' : 'assessment';
    component.set('collectionType', collectionType);
    component.set('isLoading', true);
    if (collectionType === 'collection') {
      component.set('isTimeSpentFltApplied', true);
    }
    return Ember.RSVP.hash({
      collection:
        format === 'assessment'
          ? component.get('assessmentService').readAssessment(collectionId)
          : format === 'assessment-external'
            ? component.get('assessmentService').readExternalAssessment(collectionId)
            : component.get('collectionService').readCollection(collectionId),
      performance: component
        .get('analyticsService')
        .findResourcesByCollection(
          classId,
          courseId,
          unitId,
          lessonId,
          collectionId,
          collectionType
        )
    }).then(({ collection, performance }) => {
      if (!component.isDestroyed) {
        component.set('collection', collection);
        if (format === 'assessment-external') {
          component.parseClassMemberAndExternalPerformanceData(performance);
        } else {
          component.parseClassMemberAndPerformanceData(collection, performance);
        }
        component.set('isLoading', false);
        component.loadSuggestion();
      }
    });
  },

  parseClassMemberAndExternalPerformanceData(performance) {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    classMembers.map(member =>  {
      let user = component.createUser(member);
      let userPerformance = performance.findBy('user', member.id);
      let userExternalAssessmentPerf = userPerformance ? userPerformance.assessment : null;
      if (userExternalAssessmentPerf) {
        user.set('score', userExternalAssessmentPerf.score);
        user.set('hasStarted', true);
        user.set('reaction', userExternalAssessmentPerf.reaction);
        user.set('difference', 100 - userExternalAssessmentPerf.score);
      } else {
        user.set('hasStarted', false);
      }
      users.pushObject(user);
    });
    component.set('studentReportData', users);
    component.set('sortByLastnameEnabled', true);
    component.set('sortByFirstnameEnabled', false);
    component.set('sortByScoreEnabled', false);
    component.set('sortByTimeSpentEnabled', false);
    component.set('studentsSelectedForSuggest', Ember.A([]));
    component.set('suggestResultCount', 0);
    component.set('defaultSuggestContentType', 'collection');
    component.handleCarouselControl();
  },

  parseClassMemberAndPerformanceData(collection, performance) {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    let usersTotaltimeSpent = Ember.A([]);
    classMembers.forEach(member => {
      let user = component.createUser(member);
      let contents = collection.get('children');
      let userPerformance = performance.findBy('user', member.id);
      let resultSet = component.parsePerformanceContentAndUserData(
        contents,
        userPerformance
      );
      user.set('userPerformanceData', resultSet.userPerformanceData);
      user.set('hasStarted', resultSet.hasStarted);
      user.set('totalTimeSpent', resultSet.totalTimeSpent);
      user.set('isGraded', resultSet.isGraded);
      user.set('difference', 100 - resultSet.overAllScore);
      user.set('score', resultSet.overAllScore);
      // Reform score value and store in score-use-for-sort field, to handle sort.
      // -2 defines not started, -1 defines not graded.
      if (!resultSet.hasStarted) {
        user.set('score-use-for-sort', -2);
      } else if (!resultSet.isGraded) {
        user.set('score-use-for-sort', -1);
      } else {
        user.set('score-use-for-sort', resultSet.overAllScore);
      }
      users.pushObject(user);
      usersTotaltimeSpent.push(resultSet.totalTimeSpent);
    });
    users = users.sortBy(component.get('defaultSortCriteria'));
    if (component.get('selectedCollection').get('format') === 'assessment') {
      users = users.sortBy('isGraded');
    }
    component.set('sortByLastnameEnabled', true);
    component.set('sortByFirstnameEnabled', false);
    component.set('sortByScoreEnabled', false);
    component.set('sortByTimeSpentEnabled', false);
    component.set('studentsSelectedForSuggest', Ember.A([]));
    component.set('suggestResultCount', 0);
    component.set('defaultSuggestContentType', 'collection');
    component.set('studentReportData', users);
    let maxTimeSpent = Math.max(...usersTotaltimeSpent);
    component.calculateTimeSpentScore(users, maxTimeSpent);
    component.handleCarouselControl();
  },

  parsePerformanceContentAndUserData(contents, userPerformance) {
    let userPerformanceData = Ember.A([]);
    let numberOfCorrectAnswers = 0;
    let totalTimeSpent = 0;
    let hasStarted = false;
    let isGraded = true;
    let numberOfQuestionsStarted = 0;
    contents.forEach((content, index) => {
      let contentId = content.get('id');
      let performanceData = Ember.Object.create({
        id: content.get('id'),
        sequence: index + 1,
        isGraded: true
      });
      if (userPerformance) {
        let resourceResults = userPerformance.get('resourceResults');
        let resourceResult = resourceResults.findBy('resourceId', contentId);
        if (resourceResult) {
          performanceData.set('hasStarted', true);
          hasStarted = true;
          numberOfQuestionsStarted++;
          if (
            resourceResult.get('questionType') === 'OE' &&
            !resourceResult.get('isGraded')
          ) {
            isGraded = false;
            performanceData.set('isGraded', false);
          }
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
          performanceData.set('hasStarted', false);
        }
      } else {
        performanceData.set('hasStarted', false);
      }
      performanceData.set('format', content.get('format'));

      userPerformanceData.pushObject(performanceData);
    });

    let overAllScore = Math.floor(
      (numberOfCorrectAnswers / numberOfQuestionsStarted) * 100
    );

    let resultSet = {
      userPerformanceData: userPerformanceData,
      overAllScore: overAllScore,
      hasStarted: hasStarted,
      totalTimeSpent: totalTimeSpent,
      isGraded: isGraded
    };
    return resultSet;
  },

  handleCarouselControl() {
    let component = this;
    let selectedCollection = component.get('selectedCollection');
    let collections = component.get('collections');
    let currentIndex = collections.indexOf(selectedCollection);
    if (collections.length - 1 === 0) {
      component
        .$(
          '.collection-report-container #report-carousel-wrapper .carousel-control'
        )
        .addClass('in-active');
    } else {
      if (currentIndex === 0) {
        component
          .$(
            '.collection-report-container #report-carousel-wrapper .carousel-control.left'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.collection-report-container #report-carousel-wrapper .carousel-control.left'
          )
          .removeClass('in-active');
      }
      if (currentIndex === collections.length - 1) {
        component
          .$(
            '.collection-report-container #report-carousel-wrapper .carousel-control.right'
          )
          .addClass('in-active');
      } else {
        component
          .$(
            '.collection-report-container #report-carousel-wrapper .carousel-control.right'
          )
          .removeClass('in-active');
      }
    }
  },

  calculateTimeSpentScore(users, maxTimeSpent) {
    users.forEach(data => {
      let timeSpentScore = Math.round(
        (data.get('totalTimeSpent') / maxTimeSpent) * 100
      );
      data.set('timeSpentScore', timeSpentScore);
      data.set('timeSpentDifference', 100 - timeSpentScore);
    });
  },

  createUser(user) {
    return Ember.Object.create({
      id: user.get('id'),
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      avatarUrl: user.get('avatarUrl')
    });
  },

  loadSuggestion() {
    let component = this;
    let collection = this.get('collection');
    let taxonomies = null;
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
    let maxSearchResult = component.get('maxSearchResult');
    component
      .get('searchService')
      .searchCollections(term, filters)
      .then(collectionSuggestResults => {
        if (!component.isDestroyed) {
          // To show appropriate suggest count, check is their any suggest found in assessment type if count is less than.
          let collectionSuggestCount = collectionSuggestResults.length;
          if (collectionSuggestCount >= maxSearchResult) {
            component.set('suggestResultCount', maxSearchResult);
          } else {
            component
              .get('searchService')
              .searchAssessments(term, filters)
              .then(assessmentSuggestResult => {
                if (!component.isDestroyed) {
                  let assessmentSuggestCount = assessmentSuggestResult.length;
                  let suggestCount =
                    assessmentSuggestCount + collectionSuggestCount;
                  if (
                    collectionSuggestCount === 0 &&
                    assessmentSuggestCount > 0
                  ) {
                    component.set('defaultSuggestContentType', 'assessment');
                  }
                  component.set(
                    'suggestResultCount',
                    suggestCount >= maxSearchResult
                      ? maxSearchResult
                      : suggestCount
                  );
                }
              });
          }
        }
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
