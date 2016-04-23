import Ember from 'ember';

/**
 * Adapter to get Peers for Course, Unit, Lesson and Collection|Assessment from API 3.0
 *
 * @typedef {Object} PeerAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2',

  getCoursePeers: function(classId, courseId) {
    const namespace = this.get('namespace');
    const url = `${namespace}/class/${classId}/course/${courseId}/peers`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'gooru-session-token': this.get('session.token-api3')
    };
  }

});
