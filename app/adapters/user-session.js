import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({

  /**
   * @property {string} End-point URI
   */
  namespace: '/api/nucleus-insights/v2',
  //namespace: '/mocked-api/api/nucleus-insights/v2',

  headers: Ember.computed('session.token', function() {
    return {
      'gooru-session-token': this.get('session.token')
    };
  }),

  generateUrl: function(namespace, collectionType, contentId, userId, classId, courseId, unitId, lessonId, openSession){
    let queryParams = `userUid=${userId}&classGooruId=${classId}&courseGooruId=${courseId}&unitGooruId=${unitId}&lessonGooruId=${lessonId}&openSession=${openSession}`;
    return `${namespace}/${collectionType}/${contentId}/sessions?${queryParams}`;
  },

  /**
   * Builds the end-point URL for the queryRecord queryParam
   * Given a Content ID, User ID, Lesson ID, Class ID, Course ID and Collection Type, returns the session(s) for a specific user
   * @param query
   * @returns {string}
   */
  queryRecord: function(query) {
    const options = {
      type: 'GET',
      dataType: 'json',
      headers: this.get('headers'),
      data: {}
    };
    const namespace = this.get('namespace');
    const contentId = query.contentId;
    const collectionType = query.collectionType;
    const unitId = query.unitId;
    const lessonId = query.lessonId;
    const userId = query.userId;
    const classId = query.classId;
    const courseId = query.courseId;
    const openSession = query.openSession;

    delete query.classId;
    delete query.courseId;
    delete query.unitId;
    delete query.lessonId;
    delete query.contentId;
    delete query.collectionType;
    delete query.userId;
    delete query.openSession;

    return Ember.$.ajax(this.generateUrl(namespace, collectionType, contentId, userId, classId, courseId, unitId, lessonId, openSession), options);

  }

});
