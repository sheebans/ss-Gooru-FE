import Ember from "ember";
import QuestionResult from 'gooru-web/models/result/question';
import { getQuestionUtil } from 'gooru-web/config/question';

/**
 * Report data model for class assessment report
 *
 * @typedef {Object} ReportData
 *
 */
export default Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Events

  /**
   *  Initializes the report data
   */
  init: function () {
    const studentIds = this.get('studentIds');
    const resourceIds = this.get('resourceIds');

    if (!studentIds.length) {
      Ember.Logger.error('Report data cannot be initialized without students');
    }
    if (!resourceIds.length) {
      Ember.Logger.error('Report data cannot be initialized without resources');
    }

    this.set("data", this.getEmptyMatrix(studentIds, resourceIds));
  },

  willDestroy: function () {
    this.set("data", null);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * { Object{}{}{} } cumulativeData
   *
   * Internal matrix that serves as a buffer and stores all changes made to the report data.
   * Any changes made to 'userResults', update this matrix first. Then, this matrix is copied and
   * served to 'reportData' (which guarantees that any observers or computed properties on
   * 'reportData' are fired)
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
  data: null,

  /**
   * @property {User[]} student
   */
  students: null,

  /**
   * @property {string[]} studentIds - List of student ids
   */
  studentIds: Ember.computed('students', function () {
    return this.get('students').map(function (student) {
      return student.get("id");
    });
  }),

  /**
   * @property {Resource[]} resource
   */
  resources: null,

  /**
   * @property {string[]} studentIds - List of student ids
   */
  resourceIds: Ember.computed('resources', function () {
    return this.get('resources').map(function (resource) {
      return resource.get("id");
    });
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Create a matrix of empty objects from a couple of arrays
   * @param {String[]} idsY - An array of ids used for the first dimension of the matrix
   * @param {String[]} idsX - An array of ids used for the second dimension of the matrix
   * @return {Object}
   */
  getEmptyMatrix: function (idsY, idsX) {
    var matrix = {};
    var yLen = idsY.length;

    for (let i = 0; i < yLen; i++) {
      matrix[idsY[i]] = this.getEmptyRow(idsY[i], idsX);
    }
    return matrix;
  },

  getEmptyRow: function (rowId, columnIds) {
    var row = {};
    var rowLen = columnIds.length;

    for (let i = 0; i < rowLen; i++) {
      row[columnIds[i]] = QuestionResult.create();
    }
    return row;
  },

  /**
   * Merges new data
   * @param {UserResourcesResult[]} userResults
   * @returns {merge}
   */
  merge: function(userResults){
    let data = this.get('data');
    let resourceIds = this.get('resourceIds');

    userResults.forEach(function (userResult) {
      var userId = userResult.get("user");
      var doResetResults = userResult.get("isAttemptStarted");
      var resourceResults = userResult.get("resourceResults");

      if (doResetResults) {
        data[userId] = this.getEmptyRow(userId, resourceIds);
      }

      resourceResults.forEach(function (resourceResult) {
        var questionId = resourceResult.get("resourceId");
        data[userId][questionId] = resourceResult;
      });
    }, this);

    // Generate a new object so any computed properties listening on reportData are fired
    let reportData;
    if (Object.assign) {
      // Preferred way to merge the contents of two objects:
      // https://github.com/emberjs/ember.js/issues/12320
      reportData = Object.assign({}, data);
    } else {
      // Use Ember.merge as a fallback
      reportData = Ember.merge({}, data);
    }

    this.set("data", reportData);

    return this;
  },

  /**
   * Retrieves all student results by question
   *
   * @param {string} questionId
   * @returns { QuestionResult[] }
   */
  getResultsByQuestion: function(questionId){
    const reportData = this.get("data");
    let questionResults = Ember.A([]);

    this.get('studentIds').forEach(function (studentId) {
      const userQuestionResults = reportData[studentId];
      if (userQuestionResults) {
        const questionResult = userQuestionResults[questionId];

        if (questionResult) {
          questionResults.addObject(questionResult);
        } else {
          Ember.Logger.warn("Missing question data " + studentId + " question " + questionId);
        }
      } else {
        Ember.Logger.warn("Missing student data " + studentId);
      }
    });

    return questionResults;
  },

  /**
   * Retrieves all results by student
   *
   * @param {string} studentId
   * @returns { QuestionResult[] }
   */
  getResultsByStudent: function(studentId){
    const reportData = this.get("data");
    let questionResults = Ember.A([]);

    const userQuestionResults = reportData[studentId];
    if (userQuestionResults){
      for (let key in userQuestionResults){
        if (userQuestionResults.hasOwnProperty(key)){
          questionResults.addObject(userQuestionResults[key]);
        }
      }
    } else {
      Ember.Logger.warning("Missing student data " + studentId);
    }
    return questionResults;
  },

  /**
   * Retrieves all student results
   *
   * @returns { QuestionResult[] }
   */
  getAllResults: function(){
    const self = this;
    let questionResults = Ember.A([]);

    this.get('studentIds').forEach(function (studentId) {
      let studentResults = self.getResultsByStudent(studentId);
      questionResults.addObjects(studentResults.toArray());
    });

    return questionResults;
  },

  /**
   * Return all the student who submitted the answer
   * @param {Resource} question
   * @param {*} answer user answer
   * @returns {User[]}
   */
  getStudentsByQuestionAndUserAnswer: function(question, answer){
    const reportData = this.get("data");
    const questionId = question.get("id");
    const util = getQuestionUtil(question.get("questionType")).create({ question: question });
    let found = Ember.A([]);

    this.get('students').forEach(function (student) {
      const studentId = student.get("id");
      const userQuestionResults = reportData[studentId];
      if (userQuestionResults){
        const questionResult = userQuestionResults[questionId];
        const answered = questionResult && questionResult.get("answered");
        if (answered){
          const sameAnswer = util.sameAnswer(answer, questionResult.get("userAnswer"));
          if (sameAnswer) {
            found.addObject(student);
          }
        }
      }
      else{
        Ember.Logger.warning("Missing student data " + studentId);
      }
    });
    return found;
  }


});
