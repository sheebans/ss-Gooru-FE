import Ember from 'ember';
import { formatDate } from 'gooru-web/utils/utils';
import ModalMixin from 'gooru-web/mixins/modal';
import SessionMixin from 'gooru-web/mixins/session';

/**
 * Class activities controller
 *
 * Controller responsible of the logic for the student class activities tab
 */

export default Ember.Controller.extend(SessionMixin, ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * Read the class data from the parent student class controller
   * @property {Object}
   */
  classController: Ember.inject.controller('student.class'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    studentDcaReport(collection, studentPerformance) {
      let component = this;
      let userId = component.get('session.userId');
      let activityDate = moment().format('YYYY-MM-DD');
      let params = {
        userId: userId,
        classId: component.get('class.id'),
        collectionId: collection.get('id'),
        type: collection.get('format'),
        isStudent: true,
        collection,
        activityDate,
        studentPerformance
      };
      component.set('showStudentDcaReport', true);
      component.set('studentReportContextData', params);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * It maintains the list of class members details
   * @type {Array}
   */
  members: Ember.computed.alias('classController.class.members'),

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
