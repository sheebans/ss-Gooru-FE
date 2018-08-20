import Ember from 'ember';
/**
 * Content map controller
 *
 * Controller responsible of the logic for the course map page
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  studentClassController: Ember.inject.controller('student.class'),

  /**
   * Rescope Service to perform rescope data operations
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  /**
   * Route0
   */
  route0Service: Ember.inject.service('api-sdk/route0'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location', 'tab'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: null,

  tab: null,

  isFirstLoad: true,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Update 'location' (bound query param)
     *
     * @function
     * @param {String} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     * @returns {undefined}
     */
    updateLocation: function(newLocation) {
      this.set('location', newLocation);
    },
    /**
     * Locate the user in is actual location
     *
     * @function
     * @param {String} location'
     * @returns {undefined}
     */
    locateMe: function(location) {
      this.set('location', location);
      this.set('showLocation', true);
      this.set('toggleLocation', !this.get('toggleLocation'));
    },

    /**
     * Action triggered when the user toggle between complete course-map / rescope
     */
    onToggleRescope(isChecked) {
      let controller = this;
      if (!isChecked) {
        controller.processSkippedContents();
      } else {
        let skippedContents = controller.get('skippedContents');
        controller.toggleSkippedContents(skippedContents);
      }
    },

    /**
     * Action triggered when the user click an accordion item
     */
    onSelectItem() {
      let controller = this;
      if (controller.get('isPremiumClass')) {
        let skippedContents = controller.get('skippedContents');
        let isSkippedContentsAvailable = skippedContents
          ? controller.isSkippedContentsEmpty(skippedContents)
          : false;
        if (isSkippedContentsAvailable) {
          controller.toggleSkippedContents(skippedContents);
        }
      }
    },

    onClearCustomizeMsg() {
      Ember.$('.custom-msg').hide(800);
    },
    courseRouteSuggestAction: function(action) {
      let controller = this;
      let currentClass = controller.get('currentClass');
      let actionData = {
        classId: currentClass.get('id'),
        courseId: currentClass.get('courseId'),
        status: action
      };
      let route0Promise = controller
        .get('route0Service')
        .updateRouteAction(actionData);
      route0Promise.then(function() {
        if (controller.get('target.router')) {
          controller.get('target.router').refresh();
        }
      });
    },
    studyCoursePlayer: function(type, unitId, lessonId, item) {
      let controller = this;
      controller.send('studyPlayer', type, unitId, lessonId, item);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    const controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
    let tab = controller.get('tab');
    if (tab && tab === 'report') {
      controller.openStudentCourseReport();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} toggleLocation - indicates the toggle location state to scroll down
   */
  toggleLocation: false,

  /**
   * @prop {String} userLocation - Location of a user in a course
   * String of the form 'unitId[+lessonId[+resourceId]]'
   */
  userLocation: null,

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('studentClassController.class'),

  /**
   *Show the current location
   */
  showLocation: true,

  /**
   * A link to the content visibility from class controller
   * @see controllers/class.js
   * @property {ClassContentVisibility}
   */
  contentVisibility: Ember.computed.alias(
    'studentClassController.contentVisibility'
  ),

  openingLocation: Ember.computed('location', function() {
    if (this.get('isFirstLoad')) {
      this.set('isFirstLoad', false);
      var location = this.get('location') || this.get('userLocation');
      this.set('location', location);
      return location;
    } else {
      return this.get('location') || '';
    }
  }),

  /**
   * @type {JSON}
   * Property to store list of skipped rescope content
   */
  skippedContents: null,

  /**
   * @type {Boolean}
   * Property to toggle checkbox visibility
   */
  isChecked: false,

  /**
   * @type {Boolean}
   * Property to check whether a class is rescoped
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  isPremiumCourse: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting
      ? setting['course.premium'] && setting['course.premium'] === true
      : false;
  }),

  hasRouteSuggestion: Ember.computed('class', function() {
    let controller = this;
    const route0 = controller.get('route0');
    let isCourseSetup = controller.get('isPremiumCourse');
    let showRoute0Suggestion =
      route0.status === 'pending' || route0.status === 'rejected';
    return isCourseSetup && showRoute0Suggestion;
  }),

  showRoute0Suggestion: Ember.computed('class', function() {
    let controller = this;
    const route0 = controller.get('route0');
    let isCourseSetup = controller.get('isPremiumCourse');
    let showRoute0Suggestion = route0.status === 'accepted';
    return isCourseSetup && showRoute0Suggestion;
  }),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observer current class
   */
  observeCurrentClass: Ember.observer('currentClass', function() {
    let controller = this;
    //Initially load rescope data
    if (controller.get('isPremiumClass')) {
      controller.processSkippedContents();
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function processSkippedContents
   * Method to fetch and process the skipped contents
   */
  processSkippedContents() {
    let controller = this;
    controller.getSkippedContents().then(function(skippedContents) {
      let isContentAvailable = !!skippedContents;
      let isSkippedContentAvailable = skippedContents
        ? controller.isSkippedContentsEmpty(skippedContents)
        : false;
      controller.set('isContentAvailable', isContentAvailable);
      if (isSkippedContentAvailable) {
        controller.toggleSkippedContents(skippedContents);
        controller.set('isChecked', false);
      }
      if (!skippedContents) {
        controller.set('isChecked', true);
      }
    });
  },

  /**
   * @function getSkippedContents
   * Method to get skipped contents
   */
  getSkippedContents() {
    let controller = this;
    let currentClass = controller.get('currentClass');
    let filter = {
      classId: currentClass.get('id'),
      courseId: currentClass.get('courseId')
    };
    let skippedContentsPromise = Ember.RSVP.resolve(
      controller.get('rescopeService').getSkippedContents(filter)
    );
    return Ember.RSVP.hash({
      skippedContents: skippedContentsPromise
    })
      .then(function(hash) {
        controller.set('skippedContents', hash.skippedContents);
        return hash.skippedContents;
      })
      .catch(function() {
        controller.set('skippedContents', null);
      });
  },

  /**
   * @function getFormattedContentsByType
   * Method to get formatted content type
   */
  getFormattedContentsByType(contents, types) {
    let controller = this;
    let formattedContents = Ember.A([]);
    types.map(type => {
      let flag = type.charAt(0);
      formattedContents = formattedContents.concat(
        controller.parseSkippedContents(contents[`${type}`], flag)
      );
    });
    return formattedContents;
  },

  /**
   * @function toggleSkippedContents
   * Method to toggle skippedContents
   */
  toggleSkippedContents(skippedContents) {
    let controller = this;
    let contentTypes = Object.keys(skippedContents);
    let formattedContents = controller.getFormattedContentsByType(
      skippedContents,
      contentTypes
    );
    controller.toggleContentVisibility(formattedContents);
  },

  /**
   * @function parseSkippedContents
   * Method to parse fetched rescoped contents
   */
  parseSkippedContents(contentIds, flag) {
    let parsedContentIds = Ember.A([]);
    contentIds.map(id => {
      parsedContentIds.push(`.${flag}-${id}`);
    });
    return parsedContentIds;
  },

  /**
   * @function toggleContentVisibility
   * Method to toggle content visibility
   */
  toggleContentVisibility(contentClassnames) {
    let controller = this;
    let isChecked = controller.get('isChecked');
    const $contentComponent = Ember.$(contentClassnames.join());
    if (isChecked) {
      $contentComponent.show().addClass('rescoped-content');
    } else {
      $contentComponent.hide();
    }
  },

  /**
   * @function isSkippedContentsEmpty
   * Method to toggle rescoped content visibility
   */
  isSkippedContentsEmpty(skippedContents) {
    let keys = Object.keys(skippedContents);
    let isContentAvailable = false;
    keys.some(key => {
      isContentAvailable = skippedContents[`${key}`].length > 0;
      return isContentAvailable;
    });
    return isContentAvailable;
  },

  openStudentCourseReport() {
    let controller = this;
    controller.set('showCourseReport', true);
    let params = Ember.Object.create({
      userId: controller.get('session.userId'),
      classId: controller.get('class.id'),
      class: controller.get('class'),
      courseId: controller.get('course.id'),
      course: controller.get('course'),
      isTeacher: false,
      isStudent: true,
      loadUnitsPerformance: false
    });
    controller.set('studentCourseReportContext', params);
  }
});
