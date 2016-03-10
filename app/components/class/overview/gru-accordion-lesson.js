import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';
import SessionMixin from 'gooru-web/mixins/session';

// Whenever the observer 'parsedLocationChanged' is running, this flag is set so
// clicking on the lessons should not update the location
var isUpdatingLocation = false;

/**
 * Accordion Lesson
 *
 * Component responsible for behaving as an accordion and listing a set of collections/assessments.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Unit}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service("api-sdk/course-location"),

  /**
   * @requires service:api-sdk/performance
   */
  performanceService: Ember.inject.service("api-sdk/performance"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion-lesson', 'panel', 'panel-default'],

  classNameBindings:['isExpanded:expanded'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Load the data for this lesson (data should only be loaded once) and trigger
     * the 'onLessonUpdate' event handler
     *
     * @function actions:selectLesson
     * @returns {undefined}
     */
    selectLesson: function (lessonId) {
      this.loadData();

      if (!isUpdatingLocation) {
        let updateValue = this.get('isExpanded') ? '' : lessonId;
        this.get('onSelectLesson')(updateValue);
      }
    },

    /**
     * @function actions:selectResource
     * @param {string} collectionId - Identifier for a resource (collection/assessment)
     */
    selectResource: function (collectionId) {
      let lessonId = this.get("model.id");
      this.get('onSelectResource')(lessonId, collectionId);
    },

    setOnAir: function (collectionId) {
      this.get('onLaunchOnAir')(collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  setupComponent: Ember.on('didInsertElement', function () {
    const component = this;

    this.$().on('hide.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', false);
    });

    this.$().on('show.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', true);
    });

    Ember.run.scheduleOnce('afterRender', this, this.parsedLocationChanged);
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    this.$().off('hide.bs.collapse');
    this.$().off('show.bs.collapse');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String[]} parsedLocation - Location the user has navigated to
   * parsedLocation[0] - unitId
   * parsedLocation[1] - lessonId
   * parsedLocation[2] - resourceId
   */
  parsedLocation: [],

  /**
   * @prop {String} - Id of the unit this lesson belongs to
   */
  unitId: null,

  /**
   * Contains only visible units
   * @property {Unit[]} units
   */
  collections: null,

  /**
   * @prop {String} userLocation - Location of a user in a course
   */
  userLocation: null,

  /**
   * @prop {Ember.RSVP.Promise} usersLocation - Users enrolled in the course
   * Will resolve to {Location[]}
   */
  usersLocation: Ember.A([]),

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  loading: false,

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observe when the 'items' promise has resolved and proceed to add the
   * corresponding users information (coming from a separate service) to each
   * one of the items so they are resolved in one single loop in the template.
   */
  addUsersToItems: Ember.observer('items', 'usersLocation', function() {
    if (this.get('items.length')) {
      let component = this;
      let visibleItems = this.get('items');
      let usersLocation = component.get("usersLocation");
      visibleItems.forEach((item) => {
        // Get the users for a specific lesson
        let entity = usersLocation.findBy('collection', item.get('id'));
        if (entity) {
          entity.get('locationUsers').then((locationUsers) => {
            item.set('users', locationUsers);
          });
        }
      });
    }
  }),

  /**
   * Observe changes to 'parsedLocation' to update the accordion's status
   * (expanded/collapsed).
   */
  parsedLocationChanged: Ember.observer('parsedLocation.[]', function () {
    const parsedLocation = this.get('parsedLocation');

    if (parsedLocation) {
      isUpdatingLocation = true;

      let lessonId = parsedLocation[1];
      this.updateAccordionById(lessonId);

      isUpdatingLocation = false;
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load the collections for the lesson
   *
   * @function
   * @returns {undefined}
   */
  loadData: function () {
    let component = this;
    var performancePromise = component.getCollectionPerformances();
    component.set("loading", true);
    performancePromise.then(function(performances) {
      if (!component.get("isDestroyed")){
        component.set('items', performances);

        let usersLocationPromise = component.getLessonUsers();
        usersLocationPromise.then(function (usersLocation) {
          component.set('usersLocation', usersLocation);

          let userLocation = component.get('userLocation');
          if (!component.get('location') && userLocation) {
            component.set('location', userLocation);
          }
        });
        component.set("loading", false);
      }
    });
  },

  /**
   * Get all the collections for the lesson
   *
   * @function
   * @requires api-sdk/collection#findByClassAndCourseAndUnitAndLesson
   * @returns {Ember.RSVP.Promise}
   */
  getCollectionPerformances: function() {
    let component = this;
    const classId = component.get('currentClass.id');
    const courseId = component.get('currentClass.course');
    const unitId = component.get('unitId');
    const lessonId = component.get('model.id');
    const userId = component.get('session.userId');

    return this.get("collectionService").findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId).then(function(collections){
      if(component.get('isTeacher')) {
        return component.getTeacherCollections(classId, courseId, unitId, lessonId, collections);
      }
      return component.get('performanceService').findStudentPerformanceByLesson(userId, classId, courseId, unitId, lessonId, collections);
    });
  },

  /**
   * Get all the collections performances by collections
   *
   * @function
   * @requires api-sdk/performance#findCourseMapPerformanceByLesson
   * @returns {Ember.RSVP.Promise}
   */
  getTeacherCollections: function(classId, courseId, unitId, lessonId, collections){
    var component = this;
    collections.forEach(function (collection) {
      let collectionId = collection.get('id');
      if (collectionId) {
        let courseMapPerformances = component.get('performanceService').findCourseMapPerformanceByUnitAndLesson(classId, courseId, unitId, lessonId);
        courseMapPerformances.then(function (classPerformance) {
          //Score is the average, you can keep it to avoid change the variable in the hbs,
          //because the student uses score.
          collection.set('score', classPerformance.calculateAverageScoreByItem(collectionId));
        });
      }
    });

    return new Ember.RSVP.resolve(collections);

  },

  /**
   * Get all the users participating in the lesson
   *
   * @function
   * @requires service:api-sdk/course-location#findByCourseAndUnitAndLesson
   * @returns {Ember.RSVP.Promise}
   */
  getLessonUsers: function() {
    const component = this;
    const courseId = component.get('currentClass.course');
    const unitId = component.get('unitId');
    const lessonId = component.get('model.id');

    return component.get("courseLocationService").findByCourseAndUnitAndLesson(courseId, unitId, lessonId, { collections: component.get('items') });
  }

});
