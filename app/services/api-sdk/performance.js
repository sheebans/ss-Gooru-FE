import Ember from 'ember';
import DS from 'ember-data';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  /**
   * Gets the performance data for each unit of a specific user, class and course.
   * @param userId user id
   * @param classId class id
   * @param courseId course id
   * @returns {*}
   */
  findUnitPerformanceByClassAndCourse: function(userId, classId, courseId) {
    return this.get('store').queryRecord('performance/performance', {
      userUid: userId,
      classId: classId,
      courseId: courseId
    });
  },

  /**
   * Gets the lessons performance and collections|assessments performance data for
   * each lesson of a specific user, class, course and unit.
   * @param userId user id
   * @param classId class id
   * @param courseId course id
   * @param unitId unit id
   * @returns {*}
   */
  findLessonPerformanceByClassAndCourseAndUnit: function(userId, classId, courseId, unitId) {
    return this.get('store').queryRecord('performance/lesson-performance', {
      userUid: userId,
      classId: classId,
      courseId: courseId,
      unitId: unitId
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
   return this.get('store').createRecord('user/user', {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName
    });
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
    return this.get('store').createRecord('performance/performance', {
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
