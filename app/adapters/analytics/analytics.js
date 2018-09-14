import Ember from 'ember';

export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2',

  dsUsersNamespace: '/api/ds/users/v2',

  queryRecord: function(query) {
    const namespace = this.get('namespace');
    const classId = query.classId;
    const courseId = query.courseId;
    const unitId = query.unitId;
    const lessonId = query.lessonId;
    const collectionId = query.collectionId;
    const collectionType = query.collectionType;
    const url = `${namespace}/class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/${collectionType}/${collectionId}/performance`;
    const options = {
      type: 'GET',
      dataType: 'json',
      headers: this.defineHeaders(),
      data: {}
    };
    return Ember.$.ajax(url, options);
  },
  queryRecordForDCA: function(query) {
    const namespace = this.get('namespace');
    let includesessionIdParam = `sessionId=${query.sessionId}`;
    if (query.sessionId === 'NA') {
      includesessionIdParam = `classId=${query.classId}`;
    }
    const includedateParam = `date=${query.date}`;
    const collectionId = query.collectionId;
    const userId = query.userId;
    const collectionType = query.collectionType;
    const url = `${namespace}/dca/${collectionType}/${collectionId}/user/${userId}?${includesessionIdParam}&${includedateParam}`;
    const options = {
      type: 'GET',
      dataType: 'json',
      headers: this.defineHeaders(),
      data: {}
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Update score of questions in an Assessment/Collection
   * @param {string} RawData of questions score update for assessment or collection.
   * @returns {Promise}
   */
  updateQuestionScore: function(data) {
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(data)
    };
    const namespace = this.get('namespace');
    const url = `${namespace}/score`;
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getAtcPerformanceSummary
   * Method to fetch performance summary of a class for ATC view
   */
  getAtcPerformanceSummary(classId, courseId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/atc/pvc`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      data: {
        classId,
        courseId
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function getAtcPerformanceSummaryPremiumClass
   * Method to fetch performance summary of a premium class for ATC view
   */
  getAtcPerformanceSummaryPremiumClass(classId, courseId, subjectCode) {
    const adapter = this;
    const namespace = this.get('dsUsersNamespace');
    const url = `${namespace}/nc/atc/pvc`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      data: {
        classId,
        courseId,
        subjectCode
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * @function studentSelfReporting
   * Method to update external assessment score
   */
  studentSelfReporting(dataParams) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/self-report`;
    const options = {
      type: 'POST',
      headers: adapter.defineHeaders(),
      data: JSON.stringify(dataParams)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * This Method used to fetch DCA collection/assesssment performance details for the specfic date.
   * @param  {ClassId} classId        Unique Id of the class
   * @param  {CollectionId} collectionId   Unique Id of the collection.
   * @param  {CollectionType} collectionType Type of the collection, it should be collection/assessment.
   * @param  {String} date           Date format should YYYY-MM-DD
   */
  getDCAPerformance(classId, collectionId, collectionType, date) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/dca/class/${classId}/${collectionType}/${collectionId}/performance`;
    const options = {
      type: 'GET',
      headers: adapter.defineHeaders(),
      data: {
        date,
        startDate: date,
        endDate: date
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
