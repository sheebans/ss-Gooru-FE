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

    /**
     * Action Triggered when course map button clicked.
     */
    addFromCourseMap() {
      let controller = this;
      let contextParams = {
        classId: controller.get('classId'),
        courseId: controller.get('courseId')
      };
      controller.set('courseMapContextParams', contextParams);
      controller.set('showDcaCourseMapPullup', true);
    },

    /**
     * Action will trigger to open teacher dca content report.
     * @param  {Object} collection
     */
    openDcaContentReport(selectedClassActivity) {
      let controller = this;
      let collection = selectedClassActivity.get('collection');
      let activityDate = selectedClassActivity.get('added_date');
      let dateWiseClassActivity = controller
        .get('classActivities')
        .findBy('added_date', activityDate);
      let dateWiseClassActivities = dateWiseClassActivity.get(
        'classActivities'
      );
      let collections = dateWiseClassActivities.map(classActivity => {
        return classActivity.get('collection');
      });
      let params = {
        classId: controller.get('classId'),
        collection: collection,
        collections: collections,
        activityDate: activityDate,
        classMembers: controller.get('members')
      };
      controller.set('showDcaCollectionReportPullUp', true);
      controller.set('dcaCollectionReportData', params);
    },

    /**
     * Update the  content data to  class activities
     * @param  {Object} content
     * @param  {Date} addedDate
     */
    addedContentToDCA(content, addedDate) {
      let controller = this;
      let classActivities = controller.get('classActivities');
      let dateWiseClassActivities = classActivities.findBy(
        'added_date',
        addedDate
      );
      if (!dateWiseClassActivities) {
        classActivities.pushObject(
          Ember.Object.create({
            added_date: addedDate,
            classActivities: Ember.A([])
          })
        );
        dateWiseClassActivities = classActivities.findBy(
          'added_date',
          addedDate
        );
      }
      let id = content.get('id');
      let addContent = dateWiseClassActivities
        .get('classActivities')
        .findBy('id', id);
      if (!addContent) {
        addContent = content;
        dateWiseClassActivities.get('classActivities').pushObject(content);
        let sortedDateWiseClassActivities = dateWiseClassActivities
          .get('classActivities')
          .sortBy('id')
          .reverse();
        dateWiseClassActivities.set(
          'classActivities',
          sortedDateWiseClassActivities
        );
        controller.handleContainerListScroll();
      }
      if (!content.get('isAddedFromPanel')) {
        controller.get('newlyAddedDcaContents').pushObject(addContent);
      } else {
        addContent.set('isNewlyAdded', true);
        Ember.run.later(function() {
          addContent.set('isNewlyAdded', false);
        }, 2000);
      }
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
      let controller = this;
      Ember.$('.controller.teacher.class.class-activities .welcome').slideUp(
        400,
        function() {
          Ember.$(
            '.controller.teacher.class.class-activities .dca-content-list-container'
          ).css('height', 'calc(100vh - 180px)');
          controller.handleShowActionBar();
        }
      );
    },

    /**
     * Scroll to show todays DCA List container
     */
    showTodaysDcaListContainer: function() {
      this.defaultScrollToTodaysDcaContentList(400);
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
   * Maintains the state of show dca collection report pull up
   * @type {Boolean}
   */
  showDcaCollectionReportPullUp: false,

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
   * Course Id which is associated with this class
   * @property {String}
   */
  courseId: Ember.computed.alias('classController.class.courseId'),

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
    let futureClassActivities = Ember.A([]);
    classActivities.forEach(classActivity => {
      let addedDate = classActivity.get('added_date');
      if (moment(todaysDate).isBefore(addedDate)) {
        futureClassActivities.pushObject(classActivity);
      }
    });
    futureClassActivities = futureClassActivities
      .sortBy('added_date')
      .reverse();
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

  /**
   * Maintains the list of newly added DCA content
   * @type {Array}
   */
  newlyAddedDcaContents: Ember.A([]),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Update the newly added flag for added dca content.
   */
  updateNewlyAddedFlag: Ember.observer(
    'showSearchContentPullup',
    'showDcaCourseMapPullup',
    function() {
      let component = this;
      let showSearchContentPullup = component.get('showSearchContentPullup');
      let showDcaCourseMapPullup = component.get('showDcaCourseMapPullup');
      let newlyAddedDcaContents = component.get('newlyAddedDcaContents');
      if (
        !showDcaCourseMapPullup &&
        !showSearchContentPullup &&
        newlyAddedDcaContents.length > 0
      ) {
        newlyAddedDcaContents.forEach(content => {
          content.set('isNewlyAdded', true);
        });
        Ember.run.later(function() {
          newlyAddedDcaContents.forEach(content => {
            content.set('isNewlyAdded', false);
          });
          component.set('newlyAddedDcaContents', Ember.A());
        }, 5000);
      }
    }
  ),

  // -------------------------------------------------------------------------
  // Events

  init() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', controller, function() {
      controller.handleShowMoreData();
      controller.handleShowActionBar();
      controller.defaultScrollToTodaysDcaContentList(0);
    });
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Removes a class activity from a list of classActivities
   * @param {classActivity} classActivity
   */
  removeClassActivity: function(classActivity) {
    let classActivities = this.get('classActivities');
    let addedDate = classActivity.get('added_date');
    let id = classActivity.get('id');
    let dateWiseClassActivities = classActivities.findBy(
      'added_date',
      addedDate
    );
    let classActivityToDelete = dateWiseClassActivities
      .get('classActivities')
      .findBy('id', id);
    dateWiseClassActivities
      .get('classActivities')
      .removeObject(classActivityToDelete);
    if (dateWiseClassActivities.get('classActivities').length === 0) {
      classActivities.removeObject(dateWiseClassActivities);
    }
    this.handleContainerListScroll();
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

  handleShowActionBar() {
    let controller = this;
    let container = Ember.$('.dca-content-list-container');
    Ember.$(container).scroll(function() {
      controller.handleContainerListScroll();
    });
  },

  handleContainerListScroll() {
    let container = Ember.$('.dca-content-list-container');
    let containerListHeight = $(container).height();
    let futureListContainerHeight = Ember.$(
      '.dca-future-date-list-container'
    ).height();
    let todaysInfoActionContainerHeight = Ember.$(
      '.dca-todays-action-list-container .dca-todays-info-action-container'
    ).height();
    let todaysDcaListTopArrowContainer = Ember.$(
      '.dca-nav-to-todays-dca-list.top-section'
    );
    let todaysDcaListBottomArrowContainer = Ember.$(
      '.dca-nav-to-todays-dca-list.bottom-section'
    );
    let scrollTop = Ember.$(container).scrollTop();
    let containerHeight =
      futureListContainerHeight + todaysInfoActionContainerHeight + 85;
    let diffFutureAndTodaysContainerDistance =
      futureListContainerHeight +
      45 +
      todaysInfoActionContainerHeight -
      containerListHeight;
    if (scrollTop > containerHeight) {
      Ember.$(todaysDcaListTopArrowContainer).addClass('active');
    } else {
      Ember.$(todaysDcaListTopArrowContainer).removeClass('active');
    }

    if (
      futureListContainerHeight + 45 > containerListHeight &&
      scrollTop < diffFutureAndTodaysContainerDistance
    ) {
      Ember.$(todaysDcaListBottomArrowContainer).addClass('active');
    } else {
      Ember.$(todaysDcaListBottomArrowContainer).removeClass('active');
    }
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
  },

  defaultScrollToTodaysDcaContentList(animateDuration) {
    let futureListHeight =
      Ember.$('.dca-future-date-list-container').height() + 65;
    Ember.$('.dca-content-list-container').animate(
      {
        scrollTop: futureListHeight
      },
      animateDuration
    );
  }
});
