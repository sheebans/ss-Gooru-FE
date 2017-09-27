import Ember from 'ember';
import { CONTENT_TYPES, ROLES } from 'gooru-web/config/config';

/**
 * Study Player External Controller
 *
 * @module
 */
export default Ember.Controller.extend({
  queryParams: [
    'resourceId',
    'role',
    'type',
    'sourceId',
    'classId',
    'courseId',
    'collectionId',
    'source'
  ],

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
    next: function() {
      this.playNextContent();
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string}
   */
  classId: null,

  /**
   * @property {string}
   */
  courseId: null,

  /**
   * @property {string}
   */
  collectionId: null,

  /**
   * Indicates if it should show the back button
   * @property {boolean}
   */
  showBackButton: false,

  /**
   * Indicates if it should show the react widget or not
   * @property {boolean}
   */
  showReactButton: false,

  /**
   * Current map location
   * @property {MapLocation}
   */
  mapLocation: null,

  /**
   * Shows the breadcrumbs info of the collection
   * @property {Array[]}
   */
  breadcrumbs: Ember.computed('collection', 'lesson', 'unit', function() {
    let unit = this.get('unit');
    let lesson = this.get('lesson');
    let collection = this.get('collection');
    let collectionId = collection
      ? collection.get('id')
      : this.get('collectionId');
    let lessonChildren = lesson.children;
    let titles = Ember.A([]);

    let isChild = lessonChildren.findBy('id', collectionId);

    if (unit) {
      titles.push(
        Ember.Object.create({
          shortTitle: `U${unit.get('sequence')}`,
          actualTitle: unit.get('title')
        })
      );
    }
    if (lesson) {
      titles.push(
        Ember.Object.create({
          shortTitle: `L${lesson.get('sequence')}`,
          actualTitle: lesson.get('title')
        })
      );
    }
    if (collection && isChild) {
      if (collection.isCollection) {
        let collections = lessonChildren.filter(
          collection => collection.format === CONTENT_TYPES.collection
        );
        collections.forEach((child, index) => {
          if (child.id === collection.id) {
            let collectionSequence = index + 1;
            titles.push(
              Ember.Object.create({
                shortTitle: `C${collectionSequence}`,
                actualTitle: collection.get('title')
              })
            );
          }
        });
      } else {
        let assessments = lessonChildren.filter(
          assessment => assessment.format === CONTENT_TYPES.assessment
        );
        assessments.forEach((child, index) => {
          if (child.id === collection.id) {
            let assessmentSequence = index + 1;
            titles.push(
              Ember.Object.create({
                shortTitle: `A${assessmentSequence}`,
                actualTitle: collection.get('title')
              })
            );
          }
        });
      }
    } else {
      titles.push(
        Ember.Object.create({
          shortTitle: 'A',
          actualTitle: collection
            ? collection.get('title')
            : isChild.get('title')
        })
      );
    }
    return titles;
  }),

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      collectionId: null,
      resourceId: null,
      type: null
    });
  },

  /**
   * Extracted the course version from course object
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function() {
    const context = this.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: this.get('source')
    };
    let classId = context.get('classId');
    if (classId) {
      queryParams.classId = classId;
    }
    this.transitionToRoute('study-player', context.get('courseId'), {
      queryParams
    });
  },

  playNextContent: function() {
    const navigateMapService = this.get('navigateMapService');
    const context = this.get('mapLocation.context');
    navigateMapService
      .getStoredNext()
      .then(() => navigateMapService.next(context))
      .then(mapLocation => {
        let status = (mapLocation.get('context.status') || '').toLowerCase();
        if (status === 'done') {
          this.setProperties({
            isDone: true,
            hasAnySuggestion: false
          });
        } else {
          this.toPlayer();
        }
      });
  }
});
