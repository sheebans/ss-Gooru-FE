import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

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
    if (!this.get('items')) {
      var itemsPromise = this.getCollections();
      this.set('items', itemsPromise);

      // TODO: getLessonUsers is currently dependent on items that's why this declaration
      // takes place after setting items. Once api-sdk/course-location is complete
      // both declarations can be put together, as they should
      var usersLocation = this.getLessonUsers();
      this.set('usersLocation', usersLocation);
    }
  },

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
