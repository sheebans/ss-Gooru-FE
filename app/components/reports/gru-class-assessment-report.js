import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';
import {VIEW_LAYOUT_PICKER_OPTIONS} from "gooru-web/config/config";
import QuestionResult from 'gooru-web/models/result/question';
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
      // TODO:
      // Get question model from questionId
      // Show modal with question information
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
   * @private { Object{}{}{} } cumulativeData
   *
   * Internal matrix that serves as a buffer and stores all changes made to the report data.
   * Any changes made to 'userResults', update this matrix first. Then, this matrix is copied and
   * served to 'reportData' (which guarantees that any observers or computed properties on
   * 'reportData' are fired)
   */
  cumulativeData: null,

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: false,


  /**
   * @prop { Object{}{}{} } reportData - Representation of the data to show in the reports as a 3D matrix
   * Any changes on the content feed will cause the report data to update
   *
   * Sample structure
   *
   * The "question#" corresponds to the actual question id
   *  {
   *    user1 {
   *      question1 : QuestionResult,
   *      question2 : QuestionResult,
   *      question3 : QuestionResult
   *     },
   *    user2 {
   *      question1 : QuestionResult,
   *      question2 : QuestionResult,
   *      question3 : QuestionResult
   *    }
   *  }
   */
  reportData: Ember.computed('userResults.[]', function () {
    this.initDataIfNecessary();
    var userResults = this.get('userResults');
    let cumulativeData = this.get("cumulativeData");

    userResults.forEach(function (userQuestions) {
      var userId = userQuestions.get("user");
      var questionsResults = userQuestions.get("questionsResults");

      questionsResults.forEach(function (questionResult) {
        var questionId = questionResult.get("questionId");
        cumulativeData[userId][questionId] = questionResult;
      });
    });

    // Generate a new object so any computed properties listening on reportData are fired
    let reportData;
    if (Object.assign) {
      // Preferred way to merge the contents of two objects:
      // https://github.com/emberjs/ember.js/issues/12320
      reportData = Object.assign({}, cumulativeData);
    } else {
      // Use Ember.merge as a fallback
      reportData = Ember.merge({}, cumulativeData);
    }

    return reportData;
  }),

  /**
   * @prop { User[] } students - Group of students taking an assessment
   */
  students: null,


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Create a matrix of empty objects from a couple of arrays
   * @param {String[]} idsX - An array of ids used for the first dimension of the matrix
   * @param {String[]} idsY - An array of ids used for the second dimension of the matrix
   * @return {Object}
   */
  getEmptyObjectMatrix: function (idsX, idsY) {
    var matrix = {};
    var xLen = idsX.length;
    var yLen = idsY.length;

    for (let i = 0; i < xLen; i++) {
      matrix[idsX[i]] = {};

      for (let j = 0; j < yLen; j++) {
        matrix[idsX[i]][idsY[j]] = QuestionResult.create({ notStarted: true });
      }
    }
    return matrix;
  },

  /**
   * Initializes the report data if it has not being initialized already
   */
  initDataIfNecessary: function() {
    let cumulativeData = this.get("cumulativeData");

    if (!cumulativeData) {
      var studentIds = this.get('students').map(function (student) {
        return student.get("id");
      });

      var resourceIds = this.get('assessment.resources').map(function (resource) {
        return resource.get("id");
      });

      // Initialize all users and resources in the report data to empty objects
      this.set("cumulativeData", this.getEmptyObjectMatrix(studentIds, resourceIds));
    }
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    const component = this;
    component.set("cumulativeData", null);
  }


});
