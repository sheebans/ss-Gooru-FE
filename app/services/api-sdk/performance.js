import Ember from 'ember';
import DS from 'ember-data';

/**
 * @typedef {Object} PerformanceService
 */
export default Ember.Service.extend({

  store: Ember.inject.service(),

  /**
   * Gets a student's assessment result for a specific collection.
   * @param collectionId
   * @param userId
   * @returns {Promise.<AssessmentResult>}
   */
  findAssessmentResultByCollectionAndStudent: function (collectionId, userId) {
    const response = null;

    // TODO: Replace this with the correct implementation
    function callToServerEndPoint(collectionId, userId) {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        if (collectionId && userId) {
          resolve(response);
        } else {
          reject('findAssessmentResultByCollectionAndStudent: missing parameters');
        }
      });
    }

    return DS.PromiseArray.create({
      promise: callToServerEndPoint(collectionId, userId)
    });
  },

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

  findStudentPerformanceByCollection: function(userId, classId, courseId, unitId, lessonId, collectionType) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('Adapter').queryRecord({
        collectionType: collectionType,
        classId: classId,
        courseId: courseId,
        userId: userId,
        unitId: unitId,
        lessonId: lessonId
      }).then(function(events) {
        resolve(service.get('performance/studentCollectionPerformanceSerializer').normalizeResponse(events));
      }, function(error) {
        reject(error);
      });
    });
  }

});
