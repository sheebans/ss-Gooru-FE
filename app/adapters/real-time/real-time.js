import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

export default Ember.Object.extend(SessionMixin, {

  namespace: '/mocked-api/nucleus/realtime',

  headers: Ember.computed('session.token', function() {
    return {
      'gooru-session-token': this.get('session.token')
    };
  }),

  queryRecord: function(query) {
    const options = {
      type: 'GET',
      dataType: 'json',
      headers: this.get('headers'),
      data: {}
    };
    const classId = query.classId;
    const collectionId = query.collectionId;
    const path = `/class/${classId}/collection/${collectionId}/events`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  }

});
