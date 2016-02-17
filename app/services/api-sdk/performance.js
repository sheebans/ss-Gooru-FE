import Ember from 'ember';
import DS from 'ember-data';

// TODO: Remove once findClassPerformanceByCollection is implemented
import UserResourcesResult from 'gooru-web/models/result/user-resources';
import QuestionResult from 'gooru-web/models/result/question';

/**
 * @typedef {Object} PerformanceService
 */
export default Ember.Service.extend({

  store: Ember.inject.service(),

  /**
   * Gets the unit performance data for a specific user, class and course.
   * @param userId
   * @param classId
   * @param courseId
   * @param units
   * @param options
   * @returns {Promise.<UnitPerformance[]>}
   */
  findStudentPerformanceByCourse: function(userId, classId, courseId, units, options = { collectionType: 'assessment' }) {
    const service = this;
    return this.get('store').queryRecord('performance/unit-performance', {
      userUid: userId,
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId
    }).then(function(unitPerformances) {
      return service.matchTitlesWithPerformances(units, unitPerformances);
    });
  },

  /**
   * Gets the lesson performance data for a specific user, class, course and unit.
   * @param userId
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessons
   * @param options
   * @returns {Promise.<LessonPerformance[]>}
   */
  findStudentPerformanceByUnit: function(userId, classId, courseId, unitId, lessons, options = { collectionType: 'assessment' }) {
    const service = this;
    return this.get('store').queryRecord('performance/lesson-performance', {
      userUid: userId,
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    }).then(function(lessonPerformances) {
      return service.matchTitlesWithPerformances(lessons, lessonPerformances);
    });
  },

  /**
   * Gets the collection performance data for a specific user, class, course, unit and lesson.
   * @param userId
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @param collections
   * @param options
   * @returns {Promise.<CollectionPerformance[]>}
   */
  findStudentPerformanceByLesson: function(userId, classId, courseId, unitId, lessonId, collections, options = { collectionType: 'assessment' }) {
    const service = this;
    return this.get('store').queryRecord('performance/collection-performance', {
      userUid: userId,
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    }).then(function(collectionPerformances) {
      return service.matchTitlesWithPerformances(collections, collectionPerformances);
    });
  },

  /**
   * Gets the data for al the performances in class.
   * @param objectsWithTitle
   * @param performances
   * @returns {Promise.<CollectionPerformance[]>}
   */
  matchTitlesWithPerformances: function(objectsWithTitle, performances) {
    return performances.map(function(performance) {
      const objectWithTitle = objectsWithTitle.findBy('id', performance.get('id'));
      if (objectWithTitle) {
        performance.set('title', objectWithTitle.get('title'));
      }
      return performance;
    });
  },

  matchStudentsWithPerformances: function(objectsWithTitle, performances) {
    performances.get('studentPerformanceData').forEach(function(studentPerformance) {
      var objectWithTitle = objectsWithTitle.findBy('id', studentPerformance.get('id'));
      if (objectWithTitle) {
        var user = studentPerformance.get('user');
        user.set('firstName', objectWithTitle.get('firstName'));
        user.set('lastName', objectWithTitle.get('lastName'));
        user.set('username', objectWithTitle.get('username'));
      }
    });
    return performances;
  },

  /**
   * Gets the unit teacher performance data for a specific class and course.
   * @param classId
   * @param courseId
   * @param students
   * @param options
   * @returns {Promise.<UnitPerformance[]>}
   */
  findClassPerformance: function(classId, courseId, students, options = { collectionType: 'assessment' }) {
    const service = this;
    return this.get('store').queryRecord('performance/class-unit-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId
    }).then(function(unitPerformances) {
      return service.matchStudentsWithPerformances(students, unitPerformances);
    });
  },

  /**
   * Gets the lesson teacher performance data for a specific class, course and unit.
   * @param classId
   * @param courseId
   * @param unitId
   * @param students
   * @param options
   * @returns {Promise.<LessonPerformance[]>}
   */
  findClassPerformanceByUnit: function(classId, courseId, unitId, students, options = { collectionType: 'assessment' }) {
    const service = this;
    return this.get('store').queryRecord('performance/class-lesson-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    }).then(function(lessonPerformances) {
      return service.matchStudentsWithPerformances(students, lessonPerformances);
    });
  },

  /**
   * Gets the collection teacher performance data for a specific class, course, unit and lesson.
   * @param classId
   * @param courseId
   * @param unitId
   * @param lessonId
   * @param students
   * @param options
   * @returns {Promise.<CollectionPerformance[]>}
   */
  findClassPerformanceByUnitAndLesson: function(classId, courseId, unitId, lessonId, students, options = { collectionType: 'assessment' }) {
    const service = this;
    return this.get('store').queryRecord('performance/class-collection-performance', {
      collectionType: options.collectionType,
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId
    }).then(function(collectionPerformances) {
      return service.matchStudentsWithPerformances(students, collectionPerformances);
    });
  },

  /**
   * Gets the performance of all students in a class for a specific collection
   * @param classId
   * @param collectionId
   * @returns {Promise.<UserResourcesResult[]>}
   */
  findClassPerformanceByCollection: function (classId, collectionId) {
    const response = [
      UserResourcesResult.create({
        "user": "56983a90297d42fd4ed7c1de",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "chi", "pan"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["2", "3"]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a900f77bf820df2cb9c",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "gray"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "2"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 7"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": false, //skipped, because is missing user answer
            "resourceId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a90231a29de51a368d4",
        "resourceResults": [
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["casa", "rojo"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 8"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          })
        ]
      }),
      UserResourcesResult.create({
        "user": "56983a901ad65da6dac5b384",
        "resourceResults": [
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 2
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 9"
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "resourceId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": false,
            "resourceId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          })
        ]
      })
    ];

    // TODO: Replace this with the correct implementation
    function callToServerEndPoint(classId, collectionId) {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        if (classId && collectionId) {
          resolve(response);
        } else {
          reject('findClassPerformanceByCollection: classId and collectionId must be defined');
        }
      });
    }

    return DS.PromiseArray.create({
      promise: callToServerEndPoint(classId, collectionId)
    });
  }

});
