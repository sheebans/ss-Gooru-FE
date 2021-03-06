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
  /**
   * Confetti Initialize once Component Initialize
   */
  confettiSetup() {
    let controller = this;
    let averageScore = controller.get('attemptData.averageScore');
    let minScore = controller.get('minScore');
    let role = controller.get('role');
    let type = controller.get('type');
    if (
      (role === 'student' &&
        type === 'assessment' &&
        minScore &&
        minScore <= averageScore) ||
      (role === 'student' && type === 'assessment' && averageScore >= 80)
    ) {
      Ember.run.later(function() {
        controller.set('enableConfetti', false);
      }, 5400);
      controller.set('enableConfetti', true);
    }
  },

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

  /**
   * @type {AttemptService} attemptService
   * @property {Ember.Service} Service to send attempt related events
   */
  quizzesAttemptService: Ember.inject.service('quizzes/attempt'),

  session: Ember.inject.service('session'),

  /**
   * @requires studyPlayerController
   */
  studyPlayerController: Ember.inject.controller('study-player'),

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered for the next button
     */
    next: function() {
      let controller = this;
      let contextId = controller.get('contextId');
      let profileId = controller.get('session.userData.gooruUId');
      const navigateMapService = controller.get('navigateMapService');
      controller
        .get('quizzesAttemptService')
        .getAttemptIds(contextId, profileId)
        .then(
          attemptIds =>
            !attemptIds || !attemptIds.length
              ? {}
              : this.get('quizzesAttemptService').getAttemptData(
                attemptIds[attemptIds.length - 1]
              )
        )
        .then(attemptData =>
          Ember.RSVP.hash({
            attemptData,
            mapLocationNxt: navigateMapService.getStoredNext()
          })
        )
        .then(({ mapLocationNxt, attemptData }) => {
          mapLocationNxt.context.set('score', attemptData.get('averageScore'));
          return navigateMapService.next(mapLocationNxt.context);
        })
        .then(({ context, suggestions, hasContent }) => {
          controller.set('mapLocation.context', context);
          controller.set('mapLocation.suggestions', suggestions);
          controller.set('mapLocation.hasContent', hasContent);
          let suggestedContent = controller.get('suggestedContent');
          if (suggestedContent) {
            controller.set('isShowSuggestion', true);
          } else {
            controller.checknPlayNext();
          }
          controller.toggleScreenMode();
        });
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
    },

    /**
     * If the user want to continue playing the benchmark suggestion
     */
    playBenchmarkSuggestion: function() {
      this.playSuggestedContent(this.get('mapLocation.benchmarkSuggestion'));
    },

    playSignatureAssessmentSuggestions: function() {
      this.playSuggestedContent(
        this.get('mapLocation.signatureAssessmentSuggestions')
      );
    },

    playSignatureCollectionSuggestions: function() {
      this.playSuggestedContent(
        this.get('mapLocation.signatureCollectionSuggestions')
      );
    },

    /**
     * Action triggered when the user accept a suggestion
     */
    onAcceptSuggestion() {
      let controller = this;
      let suggestedContent = controller.get('suggestedContent');
      controller.playSuggestedContent(suggestedContent);
      controller.set('isShowSuggestion', false);
    },

    /**
     * Action triggered when the user ignore a suggestion
     */
    onIgnoreSuggestion() {
      let controller = this;
      controller.playNextContent();
      controller.set('isShowSuggestion', false);
    },

    /**
     * Action triggered when toggle screen mode
     */
    onToggleScreen() {
      let controller = this;
      let studyPlayerController = controller.get('studyPlayerController');
      let isFullScreen = studyPlayerController.get('isFullScreen');
      studyPlayerController.set('isFullScreen', !isFullScreen);
      controller.set('isFullScreen', !isFullScreen);
      if (isFullScreen) {
        Ember.$('body').removeClass('fullscreen').addClass('fullscreen-exit');
      } else {
        Ember.$('body').removeClass('fullscreen-exit').addClass('fullscreen');
      }
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
   *signatureAssessmentType suggestion
   * @property {String} signatureAssessmentType
   */
  signatureAssessmentType: ASSESSMENT_SUB_TYPES.SIGNATURE_ASSESSMENT,

  /**
   *signatureCollectionType suggestion
   * @property {String} signatureCollectionType
   */
  signatureCollectionType: ASSESSMENT_SUB_TYPES.SIGNATURE_COLLECTION,

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
   * Current class  assessment minScore
   * @property {integer}
   */
  minScore: null,

  /**
   * @property {boolean}
   */
  hasPreTestSuggestions: Ember.computed.alias(
    'mapLocation.hasPreTestSuggestions'
  ),

  /**
   * @property {boolean}
   */
  hasPostTestSuggestions: Ember.computed.alias(
    'mapLocation.hasPostTestSuggestions'
  ),

  /**
   * @property {boolean}
   */
  hasBackFillSuggestions: Ember.computed.alias(
    'mapLocation.hasBackFillSuggestions'
  ),

  /**
   * @property {boolean}
   */
  hasResourceSuggestions: Ember.computed.alias(
    'mapLocation.hasResourceSuggestions'
  ),

  /**
   * @property {boolean}
   */
  hasSignatureCollectionSuggestions: Ember.computed.alias(
    'mapLocation.hasSignatureCollectionSuggestions'
  ),

  /**
   * @property {boolean}
   */
  hasSignatureAssessmentSuggestions: Ember.computed.alias(
    'mapLocation.hasSignatureAssessmentSuggestions'
  ),

  /**
   * @property {boolean}
   */
  isDone: Ember.computed('mapLocation.context.status', function() {
    return (
      (this.get('mapLocation.context.status') || '').toLowerCase() === 'done'
    );
  }),

  /**
   * @property {pathType}
   */
  pathType: null,

  /**
   * @property {boolean}
   */
  hasAnySuggestion: Ember.computed(
    'hasBackFillSuggestions',
    'hasPostTestSuggestions',
    'hasResourceSuggestions',
    'hasBenchmarkSuggestions',
    'hasSignatureCollectionSuggestions',
    'hasSignatureCollectionSuggestions',
    'showSuggestion',
    function() {
      return (
        (this.get('hasBackFillSuggestions') ||
          this.get('hasPostTestSuggestions') ||
          this.get('hasResourceSuggestions') ||
          this.get('hasBenchmarkSuggestions') ||
          this.get('hasSignatureCollectionSuggestions') ||
          this.get('hasSignatureAssessmentSuggestions')) &&
        this.get('showSuggestion')
      );
    }
  ),

  /**
   * @property {boolean}
   */
  hasBenchmarkSuggestions: Ember.computed.alias(
    'mapLocation.hasBenchmarkSuggestions'
  ),

  /**
   * @property {String} It decide to show the back to course map or not.
   */
  showBackToCourseMap: true,

  /**
   * confettiTruth  for all statisfactions
   * @property {boolean} source
   */
  enableConfetti: false,

  /**
   * @property {String} It decide to show the back to collection or not.
   */
  showBackToCollection: false,

  /**
   * Course version Name
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  /**
   * Steps for Take a Tour functionality
   * @return {Array}
   */
  steps: Ember.computed(function() {
    let controller = this;
    let steps = Ember.A([
      {
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepOne.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepOne.description')
      },
      {
        elementSelector: '.header-panel .course-map',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepTwo.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepTwo.description')
      },
      {
        elementSelector: '.header-panel .content-title',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepThree.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepThree.description')
      },
      {
        elementSelector: '.header-panel .suggest-player',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFour.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFour.description')
      },
      {
        elementSelector:
          '.header-panel .performance-completion-take-tour-info .completion',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFive.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFive.description')
      },
      {
        elementSelector:
          '.header-panel  .performance-completion-take-tour-info .performance',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepSix.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepSix.description')
      },
      {
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepEight.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepEight.description')
      }
    ]);
    return steps;
  }),

  /**
   * @property {Json}
   * Computed property to store suggestedContent
   */
  suggestedContent: Ember.computed('mapLocation', function() {
    let controller = this;
    let suggestions = controller.get('mapLocation.suggestions');
    return suggestions ? suggestions[0] : null;
  }),

  /**
   * @property {Boolean}
   * Property to show/hide suggestion component
   */
  isShowSuggestion: false,

  /**
   * @property {Boolean} isFullScreen
   */
  isFullScreen: Ember.computed(function() {
    let controller = this;
    let studyPlayerController = controller.get('studyPlayerController');
    let isFullScreen = studyPlayerController.get('isFullScreen');
    return isFullScreen;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function(suggestion) {
    const context = this.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: this.get('source')
    };
    let classId = context.get('classId');
    if (classId) {
      queryParams.classId = classId;
    }
    if (suggestion) {
      queryParams.courseId = context.courseId;
      queryParams.unitId = context.get('unitId');
      queryParams.lessonId = context.lessonId;
      queryParams.collectionId = suggestion.get('id');
      queryParams.pathId = suggestion.pathId;
      queryParams.subtype =
        suggestion.subType === 'signature_collection'
          ? 'signature-collection'
          : 'signature-assessment';
      queryParams.pathType = 'system';
      this.transitionToRoute('study-player', context.get('courseId'), {
        queryParams
      });
    } else {
      queryParams.pathId = context.pathId || 0;
      queryParams.pathType = context.pathType || null;
      this.transitionToRoute('study-player', context.get('courseId'), {
        queryParams
      });
    }
  },

  /**
   * Removing dependency on local storage and  bypassing next call when dont have a suggestion
   */
  checknPlayNext: function() {
    if (this.get('hasAnySuggestion')) {
      this.playNextContent();
    } else {
      const context = this.get('mapLocation.context'); //Already having contex
      this.playGivenContent(context);
    }
  },

  playNextContent: function() {
    const component = this;
    const navigateMapService = this.get('navigateMapService');
    const context = this.get('mapLocation.context');
    navigateMapService.next(context).then(nextContext => {
      component.set('mapLocation', nextContext);
      component.playGivenContent(nextContext.context);
    });
  },

  playGivenContent: function(context) {
    let status = (context.get('status') || '').toLowerCase();
    if (status !== 'done') {
      this.toPlayer();
    } else {
      this.set('mapLocation.context.status', 'done');
      this.set('hasBackFillSuggestions', false);
      this.set('hasPostTestSuggestions', false);
      this.set('hasResourceSuggestions', false);
      this.set('hasBenchmarkSuggestions', false);
      this.set('hasSignatureCollectionSuggestions', false);
      this.set('hasSignatureCollectionSuggestions', false);
    }
  },

  playSuggestedContent: function(suggestion) {
    const navigateMapService = this.get('navigateMapService');
    const courseMapService = this.get('courseMapService');
    navigateMapService
      .getStoredNext()
      .then(mapstoredloc => {
        let mapContext = mapstoredloc.get('context');
        var mapcontextloc = mapstoredloc.get('context');
        mapContext.ctx_user_id = this.get('session.userId');
        mapContext.ctx_class_id = mapContext.classId;
        mapContext.ctx_course_id = mapContext.courseId;
        mapContext.ctx_lesson_id = mapContext.lessonId;
        mapContext.ctx_collection_id = mapContext.collectionId;
        mapContext.ctx_unit_id = mapContext.unitId;
        mapContext.suggested_content_type = suggestion.type;
        mapContext.suggested_content_id = suggestion.id;
        mapContext.suggested_content_subtype =
          suggestion.subType === 'signature_collection'
            ? 'signature-collection'
            : 'signature-assessment';
        return Ember.RSVP.hash({
          context: mapcontextloc,
          pathId: courseMapService.addSuggestedPath(mapContext)
        });
      })
      .then(({ context, pathId }) => {
        context.collectionId = suggestion.id; // Setting new collection id
        context.pathId = pathId;
        //context.pathtype = "system"; //set system path only if required
        suggestion.pathId = pathId;
        return navigateMapService.startAlternatePathSuggestion(context);
      })
      .then(() => this.toPlayer(suggestion));
  },

  /**
   * Resets to default values
   */
  resetValues: function() {
    this.setProperties({
      courseId: null,
      userId: null,
      role: null,
      contextId: null,
      source: null,
      classId: '',
      unitId: null,
      lessonId: null,
      collectionId: null,
      type: null
    });
  },

  /**
   * @function toggleScreenMode
   * Method to toggle screen mode
   */
  toggleScreenMode() {
    let controller = this;
    let studyPlayerController = controller.get('studyPlayerController');
    studyPlayerController.toggleScreenMode();
  }
});
