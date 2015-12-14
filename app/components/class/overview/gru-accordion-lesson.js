import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

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
export default Ember.Component.extend(AccordionMixin, {

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

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion-lesson', 'panel', 'panel-default'],

  classNameBindings:['isExpanded:expanded'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Load the collections for the lesson
     *
     * @function actions:loadData
     * @returns {undefined}
     */
    loadData: function() {
      if (!this.get('items')) {
        var itemsPromise = this.getCollections();
        this.set('items', itemsPromise);

        // TODO: getLessonUsers is currently dependent on items that's why this declaration
        // takes place after setting items. Once api-sdk/course-location is complete
        // both declarations can be put together, as they should
        var usersLocation = this.getLessonUsers();
        this.set('usersLocation', usersLocation);
      }
    }

  },

  // -------------------------------------------------------------------------
  // Events
  setupSubscriptions: Ember.on('didInsertElement', function() {
    const component = this;

    this.$().on('hide.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', false);
    });

    this.$().on('show.bs.collapse', function(e) {
      e.stopPropagation();
      component.set('isExpanded', true);
    });
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    this.$().off('hide.bs.collapse');
    this.$().off('show.bs.collapse');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {Bool} expanded - is the accordion expanded or collapsed?
   */
  isExpanded: false,

  /**
   * @prop {String} - Id of the unit this lesson belongs to
   */
  unitId: null,

  /**
   * @prop {Ember.RSVP.Promise} usersLocation - Users participating in the lesson
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
          // Get the users for a specific collection
          let entity = usersLocation.findBy('collection', item.get('id'));
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
   * Get all the collections for the lesson
   *
   * @function
   * @requires api-sdk/collection#findByClassAndCourseAndUnitAndLesson
   * @returns {Ember.RSVP.Promise}
   */
  getCollections: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');
    const unitId = this.get('unitId');
    const lessonId = this.get('model.id');

    return this.get("collectionService").findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId);
  },

  /**
   * Get all the users participating in the lesson
   *
   * @function
   * @requires service:api-sdk/course-location#findByCourseAndUnitAndLesson
   * @returns {Ember.RSVP.Promise}
   */
  getLessonUsers: function() {
    const courseId = this.get('currentClass.course');
    const unitId = this.get('unitId');
    const lessonId = this.get('model.id');

    //return this.get("courseLocationService").findByCourseAndUnitAndLesson(courseId, unitId, lessonId);

    // TODO: remove this after api-sdk/course-location is complete
    const component = this;
    return this.get('items').then((items) => {
      return component.get("courseLocationService").findByCourseAndUnitAndLesson(courseId, unitId, lessonId, { collections: items });
    });
  }

});
