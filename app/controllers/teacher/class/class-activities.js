import Ember from 'ember';
import { formatDate } from 'gooru-web/utils/utils';
import ModalMixin from 'gooru-web/mixins/modal';
import SessionMixin from 'gooru-web/mixins/session';
import AssessmentResult from 'gooru-web/models/result/assessment';
import ReportData from 'gooru-web/models/result/report-data';

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
          const classActivity = controller
            .get('classActivities')[0]
            .classActivities.findBy('id', classActivityId);
          classActivity.set('date', date);
        });
    },

    /**
     *
     * @function actions:viewMore
     */
    viewMore: function() {
      const controller = this;
      const currentClass = controller.get('classController.class');
      const year = controller.get('year');
      const month = controller.get('month');
      const startDate = new Date(year, month, 1);
      let endDate = new Date(year, month + 1, 0);
      var today = new Date();
      if (
        today.getFullYear() === endDate.getFullYear() &&
        today.getMonth() + 1 === endDate.getMonth() + 1
      ) {
        if (endDate.getDate() > today.getDate()) {
          endDate = new Date(year, month, today.getDate() - 2);
        }
      }

      if (!this.get('loadingMore')) {
        this.set('loadingMore', true);
        controller
          .get('classActivityService')
          .findClassActivitiesDCA(
            currentClass.get('id'),
            undefined,
            startDate,
            endDate
          )
          .then(function(classActivities) {
            controller.get('classActivities').pushObject(
              Ember.Object.create({
                classActivities: controller.setDefaultValues(classActivities),
                date: formatDate(startDate, 'MMMM YYYY')
              })
            );
            if (month - 1 >= 0) {
              controller.set('month', month - 1);
            } else {
              controller.set('month', 11);
              controller.set('year', year - 1);
            }
            controller.set('loadingMore', false);
          });
      }
    },
    /**
     * When showing the question details
     * @param {string} questionId
     */
    viewQuestionDetail: function(questionId, collectionData, members) {
      Ember.Logger.debug(
        `Class assessment report: question with ID ${questionId} was selected`
      );

      const reportData1 = ReportData.create({
        students: members,
        resources: collectionData.children
      });
      Ember.Logger.info('reportData--', reportData1);
      let question = collectionData.children.findBy('id', questionId);
      let modalModel = {
        anonymous: this.get('anonymous'),
        assessment: collectionData,
        students: members,
        selectedQuestion: question,
        reportData: reportData1
      };
      this.actions.showModal.call(
        this,
        'reports.class-assessment.gru-questions-detail',
        modalModel,
        null,
        'gru-questions-detail-modal',
        true
      );
    },

    /**
     * @function actions:selectRowHeader
     * @param {string} headerId
     */
    selectRowHeader: function(studentId, userObj, reportData, assessment) {
      Ember.Logger.debug(
        `Class assessment report: student with ID ${studentId} was selected`
      );
      let resourceResults = reportData.getResultsByStudent(studentId);
      resourceResults.forEach(function(resourceResult) {
        let resource = Ember.get(assessment, 'children').findBy(
          'id',
          Ember.get(resourceResult, 'resourceId')
        );
        Ember.set(resourceResult, 'resource', resource);
      });

      let assessmentResult = AssessmentResult.create({
        totalAttempts: 1,
        selectedAttempt: 1,
        resourceResults: resourceResults,
        collection: assessment,
        isRealTime: this.get('isRealTime'),
        showAttempts: this.get('showAttempts')
      });

      let modalModel = {
        assessmentResult: assessmentResult,
        profile: userObj
      };
      this.actions.showModal.call(
        this,
        'reports.gru-assessment-report',
        modalModel,
        null,
        'gru-assessment-report-modal',
        true
      );
    },
    /**
     * @function actions:selectRowHeader
     * @param {string} headerId
     */
    changeStatusValue: function() {
      let allClassActivities = this.get('classActivities');
      allClassActivities.forEach(function(activitiesObj) {
        if (activitiesObj.classActivities !== undefined) {
          activitiesObj.classActivities.forEach(classObj => {
            let collObj = classObj.collection;
            if (collObj !== undefined) {
              Ember.set(collObj, 'isReportEnabled', false);
            }
          });
        }
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
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: null,

  /**
   * If loading more is currently running
   * @property {Boolean} loadingMore
   */
  loadingMore: false,

  /**
   * Contains current month
   * @property {int} month
   */
  month: null,

  /**
   * Contains current year
   * @property {int} year
   */
  year: null,

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
  setDefaultValues: function(activitiesData) {
    if (activitiesData !== undefined) {
      activitiesData.forEach(function(activitiesObj) {
        let collObj = activitiesObj.collection;
        if (collObj !== undefined) {
          Ember.set(collObj, 'isReportEnabled', false);
        }
      });
    }
    return activitiesData;
  }
});
