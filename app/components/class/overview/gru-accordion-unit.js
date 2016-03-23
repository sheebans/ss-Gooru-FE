import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

// Whenever the observer 'parsedLocationChanged' is running, this flag is set so
// clicking on the units should not update the location
var isUpdatingLocation = false;

/**
 * Accordion Unit
 *
 * Component responsible for behaving as an accordion and listing a set of lessons.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Course}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

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

  classNames:['gru-accordion-unit'],

  classNameBindings:['isExpanded:expanded'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Launch an assessment on-air
     *
     * @function actions:launchOnAir
     */
    launchOnAir: function (collectionId) {
      this.get('onLaunchOnAir')(collectionId);
    },

    /**
     * Load the data for this unit (data should only be loaded once) and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function (unitId) {
      this.loadData();

      if (!isUpdatingLocation) {
        let newLocation = this.get('isExpanded') ? '' : unitId;
        this.get('onLocationUpdate')(newLocation);
      }
    },

    /**
     * @function actions:selectItem
     * @param {string} collectionId - Identifier for a collection or assessment
     * @see components/class/overview/gru-accordion-lesson
     */
    selectResource: function (lessonId, collectionId) {
      let unitId = this.get("model.id");
      this.get('onSelectResource')(unitId, lessonId, collectionId);
    },

    /**
     * Trigger the 'onLocationUpdate' event handler with the unit and lesson information
     *
     * @function actions:updateLesson
     */
    updateLesson: function (lessonId) {
      const newLocation = lessonId ? this.get('model.id') + '+' + lessonId : this.get('model.id');
      this.get('onLocationUpdate')(newLocation);
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
   * @prop {Function} onLocationUpdate - Event handler
   */
  onLocationUpdate: null,

  /**
   * @prop {String[]} parsedLocation - Location the user has navigated to
   * parsedLocation[0] - unitId
   * parsedLocation[1] - lessonId
   * parsedLocation[2] - resourceId
   */
  parsedLocation: [],

  /**
   * Contains only visible units
   * @property {Unit[]} units
   */
  lessons: null,

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

  /**
   * Indicates if the current user is a student
   * @property {Boolean}
   */
  isStudent: null,

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
        // Get the users for a specific unit
        let entity = usersLocation.findBy('lesson', item.get('id'));
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

    if (parsedLocation.length) {
      isUpdatingLocation = true;

      let unitId = parsedLocation[0];
      this.updateAccordionById(unitId);

      isUpdatingLocation = false;
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load data for the unit
   *
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function () {
    // Load the lessons and users in the course when the component is instantiated
    let component = this;
    component.set("loading", true);
    let performancePromise = component.getLessons();
    performancePromise.then(function(performances){
      component.set('items', performances); //setting the units to the according mixin

      let usersLocationPromise = component.getUnitUsers();
      usersLocationPromise.then(function(usersLocation){
        component.set('usersLocation', usersLocation);

        let userLocation = component.get('userLocation');
        if (!component.get('location') && userLocation) {
          component.set('location', userLocation);
        }
      });
      component.set("loading", false);
    });
  },

  /**
   * Get all the lessons by unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getLessons: function() {
    let component = this;
    const classId = component.get('currentClass.id');
    const courseId = component.get('currentClass.course');
    const unitId = component.get('model.id');
    const userId = component.get('session.userId');
    return component.get('lessonService').findByClassAndCourseAndUnit(classId, courseId, unitId).then(function(lessons) {
      if(component.get('isTeacher')) {
        return component.getTeacherCollections(classId, courseId, unitId, lessons);
      }
      return component.get('performanceService').findStudentPerformanceByUnit(userId, classId, courseId, unitId, lessons);
    });
  },

  /**
   * Get all the performances by lesson
   *
   * @function
   * @requires api-sdk/performance#findCourseMapPerformanceByLesson
   * @returns {Ember.RSVP.Promise}
   */
  getTeacherCollections: function(classId, courseId, unitId, lessons){
    var component = this;
    lessons.forEach(function (lesson) {
      let lessonId = lesson.get('id');
      if (lessonId) {
        let courseMapPerformances = component.get('performanceService').findCourseMapPerformanceByUnitAndLesson(classId, courseId, unitId, lessonId);
        courseMapPerformances.then(function (classPerformance) {
          lesson.set('classAverageScore', classPerformance.get('classAverageScore'));
        });
      }
    });

    return new Ember.RSVP.resolve(lessons);

  },


  /**
   * Get all the users participating in the unit
   *
   * @function
   * @requires service:api-sdk/course-location#findByCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getUnitUsers: function() {
    const component = this;
    const courseId = component.get('currentClass.course');
    const unitId = component.get('model.id');

    return component.get("courseLocationService").findByCourseAndUnit(courseId, unitId, { lessons: component.get("items")});
  }

});
