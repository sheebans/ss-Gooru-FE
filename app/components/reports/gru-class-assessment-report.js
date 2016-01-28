import Ember from 'ember';

// Private variables

/**
 * @private { Object{}{}{} } cumulativeData
 *
 * Internal matrix that serves as a buffer and stores all changes made to the report data.
 * Any changes made to 'contentFeed', update this matrix first. Then, this matrix is copied and
 * served to 'reportData' (which guarantees that any observers or computed properties on
 * 'reportData' are fired)
 */
var cumulativeData;

// TODO: Remove once the service that returns the user results is implemented
var usersResults = [
  {
    "user": "56983a9060a68052c1ed934c",
    "questionsResults": [
      {
        "correct": false,
        "questionId": "56a120483b6e7b090501d3e7",
        "reaction": 1,
        "timeSpent": 1216
      },
      {
        "correct": true,
        "questionId": "56a1204886b2e565e1b2c230",
        "reaction": 2,
        "timeSpent": 2458
      },
      {
        "correct": true,
        "questionId": "56a12048ddee2022a741356a",
        "reaction": 3,
        "timeSpent": 1433
      }
    ]
  },
  {
    "user": "56983a90fb01fecc328e2388",
    "questionsResults": [
      {
        "correct": false,
        "questionId": "56a120483b6e7b090501d3e7",
        "reaction": 5,
        "timeSpent": 1216
      },
      {
        "correct": true,
        "questionId": "56a12048ddee2022a741356a",
        "reaction": 3,
        "timeSpent": 1433
      }
    ]
  },
  {
    "user": "56983a906596902edadedc7c",
    "questionsResults": [
      {
        "correct": false,
        "questionId": "56a120483b6e7b090501d3e7",
        "reaction": 1,
        "timeSpent": 1216
      },
      {
        "correct": true,
        "questionId": "56a1204886b2e565e1b2c230",
        "reaction": 5,
        "timeSpent": 2458
      },
      {
        "correct": true,
        "questionId": "56a12048ddee2022a741356a",
        "reaction": 5,
        "timeSpent": 1433
      }
    ]
  },
  {
    "user": "56983a9082f705e65f2fe607",
    "questionsResults": [
      {
        "correct": false,
        "questionId": "56a120483b6e7b090501d3e7",
        "reaction": 2,
        "timeSpent": 1216
      },
      {
        "correct": true,
        "questionId": "56a1204886b2e565e1b2c230",
        "reaction": 4,
        "timeSpent": 2458
      },
      {
        "correct": true,
        "questionId": "56a12048ddee2022a741356a",
        "reaction": 3,
        "timeSpent": 1433
      }
    ]
  }
];

export default Ember.Component.extend({

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
     * @param {bool} selectTableView
     * @returns {undefined}
     */
    changeView: function (selectTableView) {
      const isTableViewSelected = this.get('isTableView');

      if (selectTableView !== isTableViewSelected) {
        this.set('isTableView', selectTableView);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function () {
    this._super(...arguments);

    var studentIds = this.get('students').map(function (student) {
      return student.id;
    });

    var resourceIds = this.get('assessment.resources').map(function (resource) {
      return resource.id;
    });

    // Initialize all users and resources in the report data to empty objects
    cumulativeData = this.getEmptyObjectMatrix(studentIds, resourceIds);

    // TODO: Replace this with real calls to the service providing the content feeds
    Ember.run.later(this, function () {
      this.set('contentFeed', usersResults);
    }, 3000);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Collection } assessment - Assessment taken by a group of students
   */
  assessment: null,

  /**
   * @prop { UserQuestionsResult[] } contentFeed - Content feed to update the report data
   */
  contentFeed: null,

  /**
   * @prop { boolean } isTableView - is the table view currently selected?
   */
  isTableView: true,

  /**
   * @prop { Object{}{}{} } reportData - Representation of the data to show in the reports as a 3D matrix
   * Any changes on the content feed will cause the report data to update
   */
  reportData: Ember.computed('contentFeed', function () {
    var newUsersQuestions = this.get('contentFeed');
    var reportData;

    if (newUsersQuestions) {
      newUsersQuestions.forEach(function (userQuestions) {
        var user = userQuestions.user;
        var questionsResults = userQuestions.questionsResults;

        questionsResults.forEach(function (questionResult) {
          var question = questionResult.questionId;

          for (let key in questionResult) {
            if (key !== 'questionId') {
              cumulativeData[user][question][key] = questionResult[key];
            }
          }
        });
      });
    }

    // Generate a new object so any computed properties listening on reportData are fired
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
        matrix[idsX[i]][idsY[j]] = {};
      }
    }
    return matrix;
  }

});
