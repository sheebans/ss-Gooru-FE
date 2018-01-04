import Ember from 'ember';
import { formatDate } from 'gooru-web/utils/utils';
import ModalMixin from 'gooru-web/mixins/modal';
import SessionMixin from 'gooru-web/mixins/session';
import AssessmentResult from 'gooru-web/models/result/assessment';
/**
 * Class activities controller
 *
 * Controller responsible of the logic for the student class activities tab
 */

export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('student.class'),
  /**
   * Class id
   * @property {String}
   */
  members: Ember.computed.alias('classController.class.members'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function actions:selectRowHeader
     * @param {string} headerId
     */
    selectRowHeader: function(studentId, userObj, reportData, assessment) {
      Ember.Logger.debug(
        `Class assessment rioieport: student with ID ${studentId} was selected`
      );
      let resourceResults = reportData.getResultsByStudent(studentId);
      Ember.Logger.info('resourceResults--', resourceResults);
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
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Contains classActivity objects
   * @property {classActivity[]} classActivities
   */
  classActivities: null,

  date: formatDate(new Date(), 'MMMM D, YYYY'),

  /**
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {boolean} Indicates if there are class activities
   */
  showClassActivities: Ember.computed.gt('classActivities.length', 0)

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
