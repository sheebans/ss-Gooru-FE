import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Class activities controller
 *
 * Controller responsible of the logic for the teacher class activities tab
 */
export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Class controller
   */
  classController: Ember.inject.controller('teacher.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when add dca button got clicked.
     * @param  {String} selectedSearchContentType
     */
    onAddDca(selectedSearchContentType) {
      let controller = this;
      let contextParams = {
        classId: controller.get('classId')
      };
      controller.set('contextParams', contextParams);
      controller.set('selectedSearchContentType', selectedSearchContentType);
      controller.set('showSearchContentPullup', true);
    },

    addedContentToDCA(content) {
      let controller = this;
      let todaysDate = moment().format('YYYY-MM-DD');
      let classActivities = controller.get('classActivities');
      let todaysClassActivities = classActivities.findBy(
        'added_date',
        todaysDate
      );
      if (!todaysClassActivities) {
        classActivities.pushObject(
          Ember.Object.create({
            added_date: todaysDate,
            classActivities: Ember.A([])
          })
        );
      }
      this.get('todaysClassActivities.classActivities').pushObject(content);
      let todayClassActivities = this.get(
        'todaysClassActivities.classActivities'
      )
        .sortBy('id')
        .reverse();
      this.set('todaysClassActivities.classActivities', todayClassActivities);
    },

    addFromCourseMap() {
      const classId = this.get('classId');
      this.transitionToRoute('add-from-course-map', classId);
    },

    /**
     *
     * @function actions:changeVisibility
     */
    changeVisibility: function(classActivityId) {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const classId = currentClass.get('id');
      const date = new Date();
      controller
        .get('classActivityService')
        .enableClassActivity(classId, classActivityId, date)
        .then(function() {
          const classActivities = controller.get(
            'todaysClassActivities.classActivities'
          );
          let classActivity = classActivities.findBy('id', classActivityId);
          classActivity.set('date', date);
        });
    },

    /**
     *
     * @function actions:removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      let controller = this;
      let currentClassId = controller.get('classController.class.id');
      let classActivityId = classActivity.get('id');
      let classActivityType = classActivity.get('collection.collectionType');
      var model = {
        type: classActivityType,
        deleteMethod: function() {
          return controller
            .get('classActivityService')
            .removeClassActivity(currentClassId, classActivityId);
        },
        callback: {
          success: function() {
            controller.removeClassActivity(classActivity);
          }
        }
      };
      this.actions.showModal.call(
        this,
        'content.modals.gru-remove-class-activity',
        model
      );
    },

    /**
     * Triggered when a close welcome panel button is selected.
     */
    toggleHeader: function() {
      this.set('showWelcome', false);
    }
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the selected search content type.
   * @type {String}
   */
  selectedSearchContentType: 'collection',

  /**
   * Maintains the state of show search content pull up
   * @type {Boolean}
   */
  showSearchContentPullup: false,

  /**
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: Ember.A([]),

  /**
   * Class id
   * @property {String}
   */
  classId: Ember.computed.alias('classController.class.id'),
  /**
   * Class id
   * @property {String}
   */
  members: Ember.computed.alias('classController.class.members'),
  /**
   * Class id
   * @property {String}
   */
  collection: Ember.computed.alias('classController.class.collection'),

  /**
   * It maintains the today's class activities data.
   */
  todaysClassActivities: Ember.computed('classActivities.[]', function() {
    let controller = this;
    let todaysDate = moment().format('YYYY-MM-DD');
    let classActivities = controller.get('classActivities');
    let todaysClassActivities = classActivities.findBy(
      'added_date',
      todaysDate
    );
    return todaysClassActivities;
  }),

  /**
   * It maintains the future class activities data.
   */
  futureClassActivities: Ember.computed('classActivities.[]', function() {
    let controller = this;
    let todaysDate = moment().format('YYYY-MM-DD');
    let classActivities = controller.get('classActivities');
    let futureClassActivities = classActivities.map(classActivity => {
      let addedDate = classActivity.get('added_date');
      if (moment(addedDate).isBefore(todaysDate)) {
        return classActivity;
      }
    });
    return futureClassActivities;
  }),

  /**
   * It maintains the past class activities data.
   */
  pastClassActivities: Ember.computed('classActivities.[]', function() {
    let controller = this;
    let todaysDate = moment().format('YYYY-MM-DD');
    let classActivities = controller.get('classActivities');
    let pastClassActivities = Ember.A([]);
    classActivities.forEach(classActivity => {
      let addedDate = classActivity.get('added_date');
      if (moment(todaysDate).isAfter(addedDate)) {
        pastClassActivities.pushObject(classActivity);
      }
    });
    return pastClassActivities;
  }),

  /**
   * Number of records loaded past date
   * @type {Number}
   */
  numberRecordsLoadedPastDate: 30,

  /**
   * Number of records loaded future date
   * @type {Number}
   */
  numberRecordsLoadedFutureDate: 30,

  /**
   * Number of records load  per hit
   * @return {Number}
   */
  numberRecordstoLoad: 30,

  /**
   * Maintain  state of loading data
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * Maximum number of retry for past date data
   * @return {Number}
   */
  retryNumberOfPastDateDataLoad: 12,

  /**
   * Retried data load for past date
   * @type {Number}
   */
  retriedDataLoadForPastDate: 0,

  // -------------------------------------------------------------------------
  // Events

  init() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.handleShowMoreData();
    });
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let allClassActivities = this.get('classActivities');
    allClassActivities.forEach(classActivities => {
      let activityToDelete = classActivities.classActivities.findBy(
        'id',
        classActivity.get('id')
      );
      classActivities.classActivities.removeObject(activityToDelete);
    });
  },

  loadData(startDate, endDate, isPastClassActivity) {
    const controller = this;
    const classId = controller.get('classId');
    controller.set('isLoading', true);
    controller
      .get('classActivityService')
      .findClassActivities(classId, null, startDate, endDate)
      .then(classActivities => {
        if (classActivities && classActivities.length > 0) {
          controller.parseClassActivityData(classActivities);
          controller.set('retriedDataLoadForPastDate', 1);
        } else if (isPastClassActivity) {
          controller.loadPastClassActivitesData();
          let retriedDataLoadForPastDate =
            controller.get('retriedDataLoadForPastDate') + 1;
          controller.set(
            'retriedDataLoadForPastDate',
            retriedDataLoadForPastDate
          );
        }
        controller.set('isLoading', false);
      });
  },

  parseClassActivityData(classActivitiesData) {
    let controller = this;
    let classActivities = controller.get('classActivities');
    classActivitiesData.forEach(data => {
      let addedDate = data.get('added_date');
      let classActivity = classActivities.findBy('added_date', addedDate);
      if (!classActivity) {
        classActivity = Ember.Object.create({
          added_date: addedDate,
          classActivities: Ember.A([])
        });
        classActivities.pushObject(classActivity);
      }
      classActivity.get('classActivities').pushObject(data);
    });
  },

  handleShowMoreData() {
    let controller = this;
    let container = Ember.$('.dca-content-list-container');
    Ember.$(container).scroll(function() {
      let scrollTop = Ember.$(container).scrollTop();
      let listContainerHeight = Ember.$(container).height() + 20;
      let isScrollReachedBottom =
        scrollTop ===
        Ember.$(container).prop('scrollHeight') - listContainerHeight;
      if (isScrollReachedBottom && !controller.get('isLoading')) {
        controller.loadPastClassActivitesData();
      }
    });
  },

  loadPastClassActivitesData() {
    let controller = this;
    if (
      controller.get('retriedDataLoadForPastDate') <
      controller.get('retryNumberOfPastDateDataLoad')
    ) {
      let numberRecordsLoadedPastDate = controller.get(
        'numberRecordsLoadedPastDate'
      );
      let numberRecordstoLoad = controller.get('numberRecordstoLoad');
      let startDate = moment()
        .subtract(numberRecordstoLoad + numberRecordsLoadedPastDate, 'd')
        .format('YYYY-MM-DD');
      let endDate = moment()
        .subtract(numberRecordsLoadedPastDate + 1, 'd')
        .format('YYYY-MM-DD');
      controller.set(
        'numberRecordsLoadedPastDate',
        numberRecordsLoadedPastDate + numberRecordstoLoad
      );
      controller.loadData(startDate, endDate, true);
    }
  }
});
