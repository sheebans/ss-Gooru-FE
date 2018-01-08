import Ember from 'ember';

export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2',

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

  getStandardsSummary: function(sessionId, userId) {
    const namespace = this.get('namespace');
    const url = `${namespace}/session/${sessionId}/taxonomy/usage`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders(),
      data: {
        userUid: userId
      }
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

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
