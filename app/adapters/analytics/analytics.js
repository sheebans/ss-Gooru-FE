import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

export default Ember.Object.extend(SessionMixin, {

  namespace: '/api/nucleus-insights/v2',

  headers: Ember.computed('session.token', function() {
    return {
      'gooru-session-token': this.get('session.token')
    };
  }),

  queryRecord: function(query) {
    const url = this.urlForGetCollectionPerformance(query);
    const options = {
      type: 'GET',
      dataType: 'json',
      headers: this.get('headers'),
      data: {}
    };
    return Ember.$.ajax(url, options);
  },

  urlForGetCollectionPerformance: function(query) {
    const namespace = this.get('namespace');
    const classId = query.classId;
    const courseId = query.courseId;
    const unitId = query.unitId;
    const lessonId = query.lessonId;
    const collectionId = query.collectionId;
    const collectionType = query.collectionType;
    return `${namespace}/class/${classId}/course/${courseId}/unit/${unitId}/lesson/${lessonId}/${collectionType}/${collectionId}/performance`;
  }

});
