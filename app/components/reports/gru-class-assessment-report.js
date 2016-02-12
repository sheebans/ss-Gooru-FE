import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import {VIEW_LAYOUT_PICKER_OPTIONS} from "gooru-web/config/config";
import ReportData from 'gooru-web/models/result/report-data';
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
  init: function () {
    this._super(...arguments);
    const reportData = ReportData.create().initReportData(this.get("students"), this.get("assessment.resources"));
    this.set('_reportData', reportData);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Collection } assessment - Assessment taken by a group of students
   */
  assessment: null,

  /**
   * @prop { UserQuestionsResult[] } userResults - Content feed to update the report data
   */
  userResults: null,

  /**
   * @prop { boolean } isTableView - is the table view currently selected?
   */
  isTableView: true,

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: false,

  /**
   * This is an internal variable to keep track of changes
   * @private
   * @property {ReportData} report data
   */
  _reportData: null,

  /**
   * @property {ReportData} report data
   */
  reportData: Ember.computed('userResults.[]', function () {
    let reportData = this.get("_reportData");
    reportData.merge(this.get("userResults"));
    return reportData;
  }),

  /**
   * @prop { User[] } students - Group of students taking an assessment
   */
  students: null,


  // -------------------------------------------------------------------------
  // Methods
  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    const component = this;
    component.set("reportData", null);
  }


});
