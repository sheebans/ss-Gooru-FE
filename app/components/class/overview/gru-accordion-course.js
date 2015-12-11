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
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service("api-sdk/course-location"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion gru-accordion-course'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events
  setupAccordionCourse: Ember.on('init', function() {
    // Load the units and users in the course when the component is instantiated
    var itemsPromise = this.getUnits();
    this.set('items', itemsPromise);

    // TODO: getCourseUsers is currently dependent on items that's why this declaration
    // takes place after setting items. Once api-sdk/course-location is complete
    // both declarations can be put together, as they should
    var usersLocation = this.getCourseUsers();
    this.set('usersLocation', usersLocation);
  }),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @prop {Ember.RSVP.Promise} usersLocation - Users enrolled in the course
   * Will resolve to {Location[]}
   */
  usersLocation: null,

  // -------------------------------------------------------------------------
  // Observers
  addUsersToUnits: Ember.observer('items.isFulfilled', function() {
    if (this.get('items.isFulfilled')) {
      let visibleItems = this.get('visibleItems');

      this.get('usersLocation').then((usersLocation) => {
        visibleItems.forEach((item) => {
          // Get the users for a specific unit
          //let entity = usersLocation.findBy('unit', item.get('id'));
          let entity = usersLocation.findBy('unit', 'unit-1');
          if (entity) {
            entity.get('locationUsers').then((locationUsers) => {
              item.set('users', locationUsers);
            });
          }
        });
      }).catch((e) => {
        Ember.Logger.error('Unable to retrieve course users: ', e);
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
  getUnits: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');

    return this.get("unitService").findByClassAndCourse(classId, courseId);
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

    //return this.get("courseLocationService").findByCourse(courseId);

    // TODO: remove this after api-sdk/course-location is complete
    const component = this;
    return this.get('items').then((items) => {
      return component.get("courseLocationService").findByCourse(courseId, { units: items});
    });
  }

});
