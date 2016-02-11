import Ember from "ember";
import QuestionResult from 'gooru-web/models/result/question';

/**
 * Report data model for class assessment report
 *
 * @typedef {Object} ReportData
 *
 */
export default Ember.Object.extend({

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
   * @property {string[]} student ids
   */
  studentIds: null,

  /**
   * @property {string[]} resource ids
   */
  resourceIds: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   *  Initializes the report data
   * @param {User} students
   * @param {Resource} resources
   */
  initReportData: function(students, resources){
    var studentIds = students.map(function (student) {
      return student.get("id");
    });
    this.set("studentIds", studentIds);

    var resourceIds = resources.map(function (resource) {
      return resource.get("id");
    });
    this.set("resourceIds", resourceIds);

    this.set("data", this.getEmptyMatrix(studentIds, resourceIds));

    return this;
  },

  /**
   * Create a matrix of empty objects from a couple of arrays
   * @param {String[]} idsX - An array of ids used for the first dimension of the matrix
   * @param {String[]} idsY - An array of ids used for the second dimension of the matrix
   * @return {Object}
   */
  getEmptyMatrix: function (idsX, idsY) {
    var matrix = {};
    var xLen = idsX.length;
    var yLen = idsY.length;

    for (let i = 0; i < xLen; i++) {
      matrix[idsX[i]] = {};

      for (let j = 0; j < yLen; j++) {
        matrix[idsX[i]][idsY[j]] = QuestionResult.create();
      }
    }

    return matrix;
  },

  /**
   * Merges new data
   * @param {UserQuestionsResult[]} userResults
   * @returns {merge}
   */
  merge: function(userResults){
    let data = this.get("data");

    userResults.forEach(function (userQuestions) {
      var userId = userQuestions.get("user");
      var questionsResults = userQuestions.get("questionResults");

      questionsResults.forEach(function (questionResult) {
        var questionId = questionResult.get("questionId");
        data[userId][questionId] = questionResult;
      });
    });

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
    const students = this.get("studentIds");
    let questionResults = Ember.A([]);
    students.forEach(function(studentId){
      const userQuestionResults = reportData[studentId];
      if (userQuestionResults){
        const questionResult = userQuestionResults[questionId];
        if (questionResult){
          questionResults.addObject(questionResult);
        }
        else{
          Ember.Logger.warning("Missing question data " + studentId + " question " + questionId);
        }
      }
      else{
        Ember.Logger.warning("Missing student data " + studentId);
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
    }
    else{
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
    const students = this.get("studentIds");
    let questionResults = Ember.A([]);
    students.forEach(function(studentId){
      let studentResults = self.getResultsByStudent(studentId);
      questionResults.addObjects(studentResults.toArray());
    });
    return questionResults;
  },


});
