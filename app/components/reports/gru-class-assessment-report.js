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
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": true,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": null,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": true,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": null,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": null,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": true,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": true,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": false,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": false,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": null,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a90fb01fecc328e2388",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": true,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": false,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": true,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": false,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": null,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": null,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": false,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": true,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": true,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": null,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": null,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a906596902edadedc7c",
    "questionsResults": [
      {
        "correct": null,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": false,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": true,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": false,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": false,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": true,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": false,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": true,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": null,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a901bc3d60c88ac2fe2",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": true,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": true,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": false,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": false,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": true,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": true,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": true,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": true,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a9082f705e65f2fe607",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": false,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": false,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": true,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": true,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": false,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": null,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": false,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": true,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a905ed41a7863401287",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": false,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": false,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": false,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": false,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": true,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": false,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": true,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": true,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a90297d42fd4ed7c1de",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": true,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": false,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": true,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": false,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": null,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": null,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": false,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": true,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": false,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": false,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      },
      {
        "correct": true,
        "questionId": "569906aa25189b0dc0a981ba",
        "reaction": 4,
        "timeSpent": 1409
      }
    ]
  },
  {
    "user": "56983a900f77bf820df2cb9c",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": false,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": false,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": true,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": true,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": false,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": null,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
      },
      {
        "correct": null,
        "questionId": "569906aa575aa6e617b38e16",
        "reaction": 2,
        "timeSpent": 257
      }
    ]
  },
  {
    "user": "56983a90231a29de51a368d4",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": false,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": true,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": true,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aa68f276ae7ea03c30",
        "reaction": 2,
        "timeSpent": 1830
      },
      {
        "correct": true,
        "questionId": "569906aa04f742731bd4e896",
        "reaction": 2,
        "timeSpent": 2081
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": true,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": false,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      }
    ]
  },
  {
    "user": "56983a901ad65da6dac5b384",
    "questionsResults": [
      {
        "correct": true,
        "questionId": "569906aa20b7dfae1bcd5262",
        "reaction": 2,
        "timeSpent": 701
      },
      {
        "correct": false,
        "questionId": "569906aa3ec3bb39969acbe6",
        "reaction": 4,
        "timeSpent": 1333
      },
      {
        "correct": true,
        "questionId": "569906aadfa0072204f7c7c7",
        "reaction": 5,
        "timeSpent": 1305
      },
      {
        "correct": false,
        "questionId": "569906aacea8416665209d53",
        "reaction": 1,
        "timeSpent": 1013
      },
      {
        "correct": true,
        "questionId": "569906aa77bebed003fa6eb1",
        "reaction": 3,
        "timeSpent": 2234
      },
      {
        "correct": true,
        "questionId": "569906aabfcfc4cfc1b29b62",
        "reaction": 4,
        "timeSpent": 1668
      },
      {
        "correct": true,
        "questionId": "569906aa7fe0695bfd409731",
        "reaction": 4,
        "timeSpent": 2096
      },
      {
        "correct": false,
        "questionId": "569906aae3191722d9b42f22",
        "reaction": 5,
        "timeSpent": 246
      },
      {
        "correct": true,
        "questionId": "569906aa283a7b45e6777a52",
        "reaction": 4,
        "timeSpent": 1025
      },
      {
        "correct": false,
        "questionId": "569906aab4d366e4ada0c67d",
        "reaction": 2,
        "timeSpent": 127
      },
      {
        "correct": false,
        "questionId": "569906aa9fa514e9304c0549",
        "reaction": 3,
        "timeSpent": 660
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
