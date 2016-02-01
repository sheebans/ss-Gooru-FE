import Ember from 'ember';
import DS from 'ember-data';
import StoreMixin from '../../mixins/store';

/**
 * @typedef {Object} PerformanceService
 */
export default Ember.Service.extend(StoreMixin, {

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

  matchTitlesWithPerformances: function(objectsWithTitle, performances) {
    return performances.map(function(performance) {
      const objectWithTitle = objectsWithTitle.findBy('id', performance.get('id'));
      if (objectWithTitle) {
        performance.set('title', objectWithTitle.get('title'));
      }
      return performance;
    });
  },

  /**
   * Gets the class performance data for all students and units of the specific class and course.
   * @param classId
   * @param courseId
   * @param options This is a temporal parameter that will be removed soon
   * @returns {Object}
   */
  findClassPerformance: function(classId, courseId, options={}) {
    return this.createClassPerformanceResponse('unit', options);
  },

  /**
   * Gets the class performance data for all students and lessons of the specific class and course and unit.
   * @param classId
   * @param courseId
   * @param unit
   * @param options This is a temporal parameter that will be removed soon
   * @returns {Object}
   */
  findClassPerformanceByUnit: function(classId, courseId, unit, options={}) {
    return this.createClassPerformanceResponse('lesson', options);
  },

  /**
   * Gets the class performance data for all students and collections|assessments of the specific class and course and unit and lesson.
   * @param classId
   * @param courseId
   * @param unit
   * @param lesson
   * @param options This is a temporal parameter that will be removed soon
   * @returns {Object}
   */
  findClassPerformanceByUnitAndLesson: function(classId, courseId, unit, lesson, options={}) {
    return this.createClassPerformanceResponse('collection', options);
  },

  createClassPerformanceResponse: function(type, options) {
    const service = this;
    var studentPerformanceData = service.createStudentPerformanceData(type, options.users);
    var response = service.createClassPerformanceObject(studentPerformanceData);
    return DS.PromiseObject.create({
      promise: Ember.RSVP.resolve(response)
    });
  },

  createUserObject: function(id, username, firstName, lastName) {
    var userRecord = this.get('store').createRecord('user/user', {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName
    });
    this.get('store').deleteRecord(userRecord);
    return userRecord;
  },

  createPerformanceData: function(type, userId, ids = []) {
    const service = this;
    var response = Ember.A([]);
    Ember.$.each(ids, function(index, id) {
      // TODO: This is just a temporal solution (hack)
      // This ID value is composed to avoid the Ember Store exception about repeated IDs. This ID should be
      // split to get the real ID value.
      response.push(service.createPerformanceObject(id, userId, type));
    });
    return response;
  },

  createStudentPerformanceData: function(type, users = []) {
    const service = this;
    var response = Ember.A([]);
    Ember.$.each(users, function(index, user) {
      var userData = service.createUserObject(user.id, user.username, user.firstName, user.lastName);
      var performanceData = service.createPerformanceData(type, user.id, user.units);
      response.push(service.createStudentPerformanceObject(userData, performanceData));
    });
    return response;
  },

  createPerformanceObject: function(id, user, type) {
    var performanceRecord = this.get('store').createRecord('performance/performance', {
      id: user + '@' + id,
      title: 'Title for - ' + id,
      type: type,
      score: this.createRandomValue(0, 100),
      completionDone: this.createRandomValue(1, 20),
      completionTotal: 20,
      timeSpent: this.createRandomValue(0,10800000),
      ratingScore: this.createRandomValue(1, 5),
      attempts: this.createRandomValue(1, 10)
    });
    this.get('store').deleteRecord(performanceRecord);
    return performanceRecord;
  },

  createStudentPerformanceObject: function(user, performance) {
    return this.get('store').createRecord('performance/student-performance', {
      user: user,
      performanceData: performance
    });
  },

  createClassPerformanceObject: function(performanceData) {
    return this.get('store').createRecord('performance/class-performance', {
      studentPerformanceData: performanceData
    });
  },

  createRandomValue: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
