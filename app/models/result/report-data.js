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

    var resourceIds = resources.map(function (resource) {
      return resource.get("id");
    });

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
  }


});
