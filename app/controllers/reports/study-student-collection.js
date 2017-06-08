import Ember from 'ember';
import StudentCollection from 'gooru-web/controllers/reports/student-collection';
import { ASSESSMENT_SUB_TYPES, ROLES } from 'gooru-web/config/config';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default StudentCollection.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {CourseMapService}
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered for the next button
     */
    next: function () {
      this.playNextContent();
    },

    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    },

    /**
     * If the user want to continue playing the post-test suggestion
     */
    playPostTestSuggestion: function() {
      this.playSuggestedContent(this.get('mapLocation.postTestSuggestion'));
    },

    /**
     * If the user want to continue playing the backfill suggestion
     */
    playBackFillSuggestion: function() {
      this.playSuggestedContent(this.get('mapLocation.backFillSuggestion'));
    },

    /**
     * If the user want to continue playing the resource suggestion
     */
    playResourceSuggestion: function() {
      this.playSuggestedContent(this.get('mapLocation.resourceSuggestion'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Course} course
   */
  course: null,

  /**
   * @property {Unit} unit
   */
  unit: null,

  /**
   * @property {Lesson} lesson
   */
  lesson: null,

  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   *Back fill backfill suggestion
   * @property {String} typeSuggestion
   */
  backFillType: ASSESSMENT_SUB_TYPES.BACKFILL,

  /**
   *Post test suggestion
   * @property {String} typeSuggestion
   */
  postTestType: ASSESSMENT_SUB_TYPES.POST_TEST,

  /**
   *Post Test resource suggestion
   * @property {String} typeSuggestion
   */
  resourceType: ASSESSMENT_SUB_TYPES.RESOURCE,

  /**
   *Benchmark suggestion
   * @property {String} benchmarkType
   */
  benchmarkType: ASSESSMENT_SUB_TYPES.BENCHMARK,

  /**
   * Indicate if show pre test suggestion
   * @property {Boolean} showSuggestion
   */
  showSuggestion: true,

  /**
   * Current map location
   * @property {MapSuggestions}
   */
  mapLocation: null,

  /**
   * @property {boolean}
   */
  hasPostTestSuggestions: Ember.computed.alias('mapLocation.hasPostTestSuggestions'),

  /**
   * @property {boolean}
   */
  hasBackFillSuggestions: Ember.computed.alias('mapLocation.hasBackFillSuggestions'),

  /**
   * @property {boolean}
   */
  hasResourceSuggestions: Ember.computed.alias('mapLocation.hasResourceSuggestions'),

  /**
   * @property {boolean}
   */
  isDone: Ember.computed('mapLocation.context.status', function() {
    return (this.get('mapLocation.context.status') || '').toLowerCase() === 'done';
  }),

  /**
   * @property {boolean}
   */
  hasAnySuggestion: Ember.computed('hasBackFillSuggestions', 'hasPostTestSuggestions', 'hasResourceSuggestions', 'hasBenchmarkSuggestions', 'showSuggestion', function() {
    return (this.get('hasBackFillSuggestions') || this.get('hasPostTestSuggestions') || this.get('hasResourceSuggestions') || this.get('hasBenchmarkSuggestions')) && this.get('showSuggestion');
  }),

  /**
   * @property {boolean}
   */
  hasBenchmarkSuggestions: Ember.computed.alias('mapLocation.hasBenchmarkSuggestions'),

  /**
   * Shows the breadcrumbs info of the collection
   * @property {Array[]}
   */
  breadcrumbs: Ember.computed('collection', 'lesson', 'unit', function() {
    let unit = this.get('unit');
    let lesson = this.get('lesson');
    let collection = this.get('collection');
    let collectionSequence;
    lesson.children.forEach((child, index) => {
      if (child.id === collection.id) {
        collectionSequence = index + 1;
      }
    });
    let titles = Ember.A([]);

    if (unit) {
      titles.push(`U${unit.get('sequence')}: ${unit.get('title')}`);
    }
    if (lesson) {
      titles.push(`L${lesson.get('sequence')}: ${lesson.get('title')}`);
    }
    if (collection) {
      if (collection.isCollection) {
        titles.push(`C${collectionSequence}: ${collection.get('title')}`);
      } else {
        titles.push(`A${collectionSequence}: ${collection.get('title')}`);
      }
    }
    return titles;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param suggestion
   */
  playSuggestion: function(suggestion) {
    const controller = this;
    const courseMapService = controller.get('courseMapService');
    const context = controller.get('mapLocation.context');
    courseMapService.createNewPath(context, suggestion)
      .then(() => controller.toPlayer(suggestion));
  },

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function(suggestion) {
    const controller = this;
    const context = controller.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: controller.get('source')
    };
    if (suggestion && suggestion.get('isResource')) {
      controller.transitionToRoute('resource-player',
        context.get('classId'),
        context.get('courseId'),
        suggestion.get('id'),
        { queryParams }
      );
    } else {
      controller.transitionToRoute('study-player',
        context.get('classId'),
        context.get('courseId'),
        { queryParams }
      );
    }
  },

  playNextContent: function() {
    let controller = this;
    let navigateMapService = controller.get('navigateMapService');
    navigateMapService.getStoredNext().then(function (mapLocation) {
      let context = mapLocation.context;
      let queryParams = {
        role: ROLES.STUDENT,
        source: controller.get('source')
      };
      navigateMapService.continueCourse(context.get('courseId'), context.get('classId')).then(function () {
        controller.transitionToRoute('study-player', context.get('classId'), context.get('courseId'), { queryParams });
      });
    });
  },

  playSuggestedContent: function(suggestion) {
    let controller = this;
    let navigateMapService = controller.get('navigateMapService');
    let courseMapService = controller.get('courseMapService');
    let isResource = suggestion.get('isResource');

    navigateMapService.getStoredNext().then(function (mapLocation) {
      let context = mapLocation.context;
      courseMapService.createNewPath(context, suggestion).then(function (pathId) {
        let queryParams = {
          role: ROLES.STUDENT,
          source: controller.get('source'),
          courseId: context.get('courseId'),
          unitId: context.get('unitId'),
          lessonId: context.get('lessonId'),
          collectionId: isResource ? context.get('collectionId') : suggestion.get('id'),
          type: suggestion.get('type'),
          subtype: suggestion.get('subType'),
          pathId,
          classId: context.get('classId')
        };
        navigateMapService.startSuggestion(queryParams.courseId, queryParams.unitId, queryParams.lessonId,
          queryParams.collectionId, queryParams.type, queryParams.subtype, queryParams.pathId, queryParams.classId)
          .then(function () {
            if (isResource) {
              controller.transitionToRoute('resource-player', queryParams.classId, queryParams.courseId,
                suggestion.get('id'), {queryParams});
            } else {
              controller.transitionToRoute('study-player', queryParams.classId, queryParams.courseId, { queryParams });
            }
          });
      });
    });
  }

});
