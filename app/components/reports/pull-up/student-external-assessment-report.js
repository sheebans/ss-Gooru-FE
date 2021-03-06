import Ember from 'ember';
import { getBarGradeColor } from 'gooru-web/utils/utils';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';
import Context from 'gooru-web/models/result/context';

export default Ember.Component.extend({

  classNames: ['reports', 'backdrop-pull-ups', 'student-external-assessment-report'],

  /**
   * @requires {Ember.Service} session management
   */
  session: Ember.inject.service('session'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @requires {AssessmentService} Service to retrieve an assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  showPullUp: false,

  /**
   * calculate  the class average by student performance score as a width
   * @property {string}
   */
  studentAverage: Ember.computed('performanceScore', function() {
    let component = this;
    let score = component.get('performanceScore');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  performanceColorStyle: Ember.computed('performanceScore', function() {
    let component = this;
    let score = component.get('performanceScore');
    component.set('performanceColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  externalAssessment: Ember.computed('reportData', function() {
    let component = this;
    let reportData = component.get('reportData');
    return reportData.collection;
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('externalAssessmentContent.standards.[]', function() {
    let component = this;
    let standards = component.get('externalAssessmentContent.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

  /**
   * @property {Number} performanceScore
   */
  performanceScore: Ember.computed('reportData', function() {
    let component = this;
    let reportData = component.get('reportData');
    return reportData.studentPerformance ? reportData.studentPerformance.score : reportData.collection.get('performance.score');
  }),

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
    this.loadExternalAssessmentReportData();
  },

  actions: {
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Trigger when suggestion button got clicked
     */
    onOpenSuggestionPullup() {
      let component = this;
      let studentsSelectedForSuggest = Ember.A([]);
      let context = component.getContext(component.get('reportData'));
      let suggestContextParams = Ember.Object.create({
        classId: context.get('classId'),
        courseId: context.get('courseId'),
        unitId: context.get('unitId'),
        lessonId: context.get('lessonId'),
        collectionId: context.get('collectionId')
      });
      studentsSelectedForSuggest.pushObject(component.get('profile'));
      component.set('suggestContextParams', suggestContextParams);
      component.set('studentsSelectedForSuggest', studentsSelectedForSuggest);
      component.set('showSuggestionPullup', true);
    }
  },

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
        component.sendAction('onClosePullUp');
      }
    );
  },

  loadExternalAssessmentReportData() {
    let component = this;
    let context = component.get('reportData');
    let profilePromise = new Ember.RSVP.resolve(component.get('profileService').readUserProfile(context.userId));
    let assessmentContentPromise = new Ember.RSVP.resolve(component.get('assessmentService').readExternalAssessment(context.collectionId));
    return Ember.RSVP.hash({
      profile: profilePromise,
      externalAssessment: assessmentContentPromise
    }).then(function(hash) {
      component.set('profile', hash.profile);
      component.set('externalAssessmentContent', hash.externalAssessment);
      component.loadTeacherSuggestions();
    });
  },

  loadTeacherSuggestions() {
    let component = this;
    let context = component.getContext(component.get('reportData'));
    if (!component.get('isStudent')) {
      component
        .get('courseMapService')
        .getLessonInfo(
          context.get('classId'),
          context.get('courseId'),
          context.get('unitId'),
          context.get('lessonId'),
          true,
          context.get('userId')
        )
        .then(lesson => {
          let collections = lesson.get('children');
          let collection = collections.findBy(
            'id',
            context.get('collectionId')
          );
          component.set('collections', collections);
          if (!collection.get('isSuggestedContent')) {
            component.set('showSuggestion', true);
            component.loadSuggestion();
          }
        });
    }
  },

  loadSuggestion: function() {
    let component = this;
    component.set('isSuggestionLoading', true);
    let collection = this.get('collections');
    let taxonomies = null;
    let tags = component.get('tags');
    if (tags) {
      taxonomies = tags.map(tag => {
        return tag.data.id;
      });
    }
    let maxSearchResult = component.get('maxSearchResult');
    let filters = {
      pageSize: maxSearchResult,
      taxonomies: taxonomies
    };
    let term =
      taxonomies != null && taxonomies.length > 0
        ? '*'
        : collection.get('title');
    component
      .get('searchService')
      .searchCollections(term, filters)
      .then(collectionSuggestResults => {
        if (!component.isDestroyed) {
          // To show appropriate suggest count, check is their any suggest found in assessment type if count is less than.
          let collectionSuggestCount = collectionSuggestResults.length;
          if (collectionSuggestCount >= maxSearchResult) {
            component.set('isSuggestionLoading', false);
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
                  component.set('isSuggestionLoading', false);
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

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params) {
    let userId = params.userId;
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    return Context.create({
      collectionType: params.type,
      userId: userId,
      collectionId: collectionId,
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  }

});
