import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

export default Ember.Object.extend(SessionMixin, {

  namespace: '/nucleus/realtime',

  headers: Ember.computed('session.token', function() {
    return {
      'gooru-session-token': this.get('session.token')
    };
  }),

  postData: function(data) {
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.get('headers'),
      data: JSON.stringify(data.body)
    };
    const classId = data.query.classId;
    const collectionId = data.query.collectionId;
    const userId = data.query.userId;
    const path = `/class/${classId}/collection/${collectionId}/user/${userId}/event`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  getData: function(query) {
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
  },

  postAttempt: function(query) {
    const options = {
      type: 'POST',
      dataType: 'text',
      headers: this.get('headers'),
    };
    const classId = query.classId;
    const collectionId = query.collectionId;
    const userId = query.userId;
    const path = `/class/${classId}/collection/${collectionId}/user/${userId}/complete`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  deleteAttempt: function(query) {
    const options = {
      type: 'DELETE',
      dataType: 'text',
      headers: this.get('headers'),
    };
    const classId = query.classId;
    const collectionId = query.collectionId;
    const userId = query.userId;
    const path = `/class/${classId}/collection/${collectionId}/user/${userId}/reset`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  postOnAir: function(query) {
    const options = {
      type: 'POST',
      dataType: 'text',
      headers: this.get('headers'),
    };
    const classId = query.classId;
    const collectionId = query.collectionId;
    const path = `/class/${classId}/collection/${collectionId}/onair`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  deleteOnAir: function(query) {
    const options = {
      type: 'DELETE',
      dataType: 'text',
      headers: this.get('headers'),
    };
    const classId = query.classId;
    const collectionId = query.collectionId;
    const path = `/class/${classId}/collection/${collectionId}/onair`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  isOnAir: function(query) {
    const options = {
      type: 'GET',
      dataType: 'text',
      headers: this.get('headers'),
    };
    const classId = query.classId;
    const collectionId = query.collectionId;
    const path = `/class/${classId}/collection/${collectionId}/onair`;

    return Ember.$.ajax(this.get('namespace') + path, options);
  }

});
