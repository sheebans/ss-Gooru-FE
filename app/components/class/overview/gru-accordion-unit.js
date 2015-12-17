import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

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

  classNames:['gru-accordion-unit', 'panel', 'panel-default'],

  classNameBindings:['isExpanded:expanded'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Load data for the unit
     *
     * @function actions:loadData
     * @returns {undefined}
     */
    loadData: function() {
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
     * @function actions:selectItem
     * @param {string} collectionId - Identifier for a collection or assessment
     * @see components/class/overview/gru-accordion-lesson
     */
    selectResource: function (collectionId) {
      this.get('onSelectResource')(collectionId);
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

    Ember.run.scheduleOnce('afterRender', this, this.openLocationChanged);
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    this.$().off('hide.bs.collapse');
    this.$().off('show.bs.collapse');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} openLocation - Location the accordion should be opened to
   * Combination of unit, lesson and/or resource (collection or assessment) separated by a plus sign
   */
  openLocation: '',

  /**
   * @prop {String} openLocationReduced - Location the children accordion should be opened to
   * Combination of lesson and/or resource (collection or assessment) separated by a plus sign
   */
  openLocationReduced: null,

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

  openLocationChanged: Ember.observer('openLocation', function () {
    const openLocation = this.get('openLocation');

    // If location is an empty string, nothing should happen
    if (openLocation) {
      let parsedLocation = openLocation.split('+');
      let unitId = parsedLocation[0];
      let openLocationReduced = '';

      this.updateAccordionById(unitId);

      // Set the remainder of the location for the children
      if (parsedLocation.length > 1) {
        openLocationReduced = (parsedLocation.length === 2) ?
          parsedLocation[1] :
        parsedLocation[1] + '+' + parsedLocation[2];
      }

      this.set('openLocationReduced', openLocationReduced);
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

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
