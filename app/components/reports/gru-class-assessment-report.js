import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import {VIEW_LAYOUT_PICKER_OPTIONS} from "gooru-web/config/config";
// Private variables


export default Ember.Component.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-class-assessment-report'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Set a new emotion as selected and update the component appearance accordingly
     *
     * @function actions:changeView
     * @param {string} layout type @see gru-view-layout-picker
     * @returns {undefined}
     */
    changeView: function (layout) {
      const thumbnails = layout === VIEW_LAYOUT_PICKER_OPTIONS.THUMBNAILS;
      this.set('isTableView', !thumbnails);
    },

    viewQuestionDetail: function (questionId) {
      Ember.Logger.debug('Class assessment report: question with ID ' + questionId + ' was selected');

      let question = this.get("assessment.resources").findBy("id", questionId);
      let modalModel = {
        anonymous: this.get("anonymous"),
        assessment: this.get("assessment"),
        students: this.get("students"),
        selectedQuestion: question,
        reportData: this.get("reportData")
      };
      this.actions.showModal.call(this,
        'reports.class-assessment.gru-questions-detail', modalModel, null, null, 'gru-questions-detail-modal');
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: false,

  /**
   * @prop { Collection } assessment - Assessment taken by a group of students
   */
  assessment: null,

  /**
   * @prop { boolean } isTableView - is the table view currently selected?
   */
  isTableView: true,

  /**
   * @property { ReportData } report data
   */
  reportData: null,

  /**
   * @prop { User[] } students - Group of students taking an assessment
   */
  students: null

});
