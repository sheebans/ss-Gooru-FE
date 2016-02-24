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
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service("api-sdk/course-location"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion-unit'],

  classNameBindings:['isExpanded:expanded'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

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
   * @prop {Ember.RSVP.Promise} usersLocation - Users participating in the unit
   * Will resolve to {Location[]}
   */
  usersLocation: null,

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observe when the 'items' promise has resolved and proceed to add the
   * corresponding users information (coming from a separate service) to each
   * one of the items so they are resolved in one single loop in the template.
   */
  addUsersToItems: Ember.observer('items.isFulfilled', function() {
    if (this.get('items.isFulfilled')) {
      let visibleItems = this.get('visibleItems');

      this.get('usersLocation').then((usersLocation) => {
        visibleItems.forEach((item) => {
          // Get the users for a specific lesson
          let entity = usersLocation.findBy('lesson', item.get('id'));
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
    // Loading of data will only happen if 'items' has not previously been set
    if (!this.get('items')) {
      var itemsPromise = this.getLessons();
      this.set('items', itemsPromise);

      // TODO: getUnitUsers is currently dependent on items that's why this declaration
      // takes place after setting items. Once api-sdk/course-location is complete
      // both declarations can be put together, as they should
      var usersLocation = this.getUnitUsers();
      this.set('usersLocation', usersLocation);
    }
  },

  /**
   * Get all the lessons for the unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getLessons: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');
    const unitId = this.get('model.id');

    return this.get("lessonService").findByClassAndCourseAndUnit(classId, courseId, unitId);
  },

  /**
   * Get all the users participating in the unit
   *
   * @function
   * @requires service:api-sdk/course-location#findByCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getUnitUsers: function() {
    const courseId = this.get('currentClass.course');
    const unitId = this.get('model.id');

    //return this.get("courseLocationService").findByCourseAndUnit(courseId, unitId);

    // TODO: remove this after api-sdk/course-location is complete
    const component = this;
    return this.get('items').then((items) => {
      return component.get("courseLocationService").findByCourseAndUnit(courseId, unitId, { lessons: items });
    });
  }

});
