import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

/**
 * Accordion Course
 *
 * Component responsible for behaving as an accordion and listing a set of units
 * and the users participating in each unit.
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
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),

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


  classNames:['gru-accordion', 'gru-accordion-course'],

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  loading: false,

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Launch an assessment on-air
     *
     * @function actions:launchOnAir
     */
    launchOnAir: function (collectionId) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onLaunchOnAir', collectionId);
    },

    /**
     * @function actions:selectItem
     * @param {string} collectionId - Identifier for a collection or assessment
     * @see module:app/components/class/overview/gru-accordion-lesson
     */
    selectResource: function (unitId, lessonId, collectionId) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onSelectResource', unitId, lessonId, collectionId);
    },

    /**
     * Trigger the 'onLocationUpdate' event handler
     *
     * @function actions:updateLocation
     * @param {string} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     */
    updateLocation: function (newLocation) {
      this.get('onLocationUpdate')(newLocation);
    }
  },


  // -------------------------------------------------------------------------
  // Events
  setupAccordionCourse: Ember.on('init', function() {
    // Load the units and users in the course when the component is instantiated
    let component = this;
    component.set("loading", true);
    let performancePromise = component.getUnitsPerformance();
    performancePromise.then(function(performances){
      component.set('items', performances); //setting the units to the according mixin

      // TODO: getCourseUsers is currently dependent on items that's why this declaration
      // takes place after setting items. Once api-sdk/course-location is complete
      // both declarations can be put together, as they should
      /*
      let usersLocationPromise = component.getCourseUsers();
      usersLocationPromise.then(function(usersLocation){
        component.set('usersLocation', usersLocation);
        let userLocation = component.get('userLocation');
        if (!component.get('location') && userLocation) {
          component.set('location', userLocation);
        }
      });
      */
      component.set("loading", false);
    });
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} currentResource - Id of the resource in 'userLocation'
   * This value is not expected to change while on the page so it is put into its own
   * property and sent down to the child accordions. This way, each child accordion is
   * not responsible for extracting the value from 'userLocation'.
   */
  currentResource: Ember.computed('userLocation', function () {
    const userLocation = this.get('userLocation');
    var parsedLocation = userLocation.split('+');
    var currentResource = null;

    if (parsedLocation.length === 3) {
      currentResource = parsedLocation[2];
    } else {
      Ember.Logger.warn('The user location does not specify a current resource');
    }
    return currentResource;
  }),

  /**
   * @prop {String} location - Current location that the user has navigated to
   * Combination of unit, lesson and/or resource (collection or assessment) separated by a plus sign
   * @example
   * 'uId001+lId002+cId003'
   */
  location: null,

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
  parsedLocation: Ember.computed('location', function () {
    return this.get('location') ? this.get('location').split('+') : [];
  }),

  /**
   * @prop {String} userLocation - Location of a user in a course
   */
  userLocation: null,

  /**
   * Contains only visible units
   * @property {Unit[]} units
   */
  units: null,

  /**
   * Indicates if the current user is a student
   * @property {Boolean}
   */
  isStudent: null,

  /**
   * @prop {Ember.RSVP.Promise} usersLocation - Users enrolled in the course
   * Will resolve to {Location[]}
   */
  usersLocation: Ember.A([]),

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
        let entity = usersLocation.findBy('unit', item.get('id'));
        if (entity) {
          entity.get('locationUsers').then((locationUsers) => {
            item.set('users', locationUsers);
          });
        }
      });
    }
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Get all the units in a course
   *
   * @function
   * @requires api-sdk/unit#findByClassAndCourse
   * @returns {Ember.RSVP.Promise}
   */
  getUnitsPerformance: function() {
    const userId = this.get('session.userId');
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');
    const units = this.get('units');
    /*
    var component = this;
    if(component.get('isTeacher')) {
      return component.getTeacherUnits(classId, courseId, units);
    }
    */
    return this.get('performanceService').findStudentPerformanceByCourse(userId, classId, courseId, units);
  },

  getTeacherUnits: function(classId, courseId, units){
    var component = this;
    units.forEach(function (unit) {
      let unitId = unit.get('id');
      if (unitId) {
        let courseMapPerformances = component.get('performanceService').findCourseMapPerformanceByUnit(classId, courseId, unitId);
        courseMapPerformances.then(function (classPerformance) {
          unit.set('classAverageScore', classPerformance.get('classAverageScore'));
        });
      }
    });
    return new Ember.RSVP.resolve(units);

  },

  /**
   * Get all the users in the course
   *
   * @function
   * @requires service:api-sdk/course-location#findByCourse
   * @returns {Ember.RSVP.Promise}
   */
  getCourseUsers: function() {
    const courseId = this.get('currentClass.course');
    const component = this;
    return component.get("courseLocationService").findByCourse(courseId, { units: component.get("units")});
  }

});
