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
    const url = this.urlForPostEvent(data.query);
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.get('headers'),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  urlForPostEvent: function(query) {
    const namespace = this.get('namespace');
    const classId = query.classId;
    const collectionId = query.collectionId;
    const userId = query.userId;
    return `${namespace}/class/${classId}/collection/${collectionId}/user/${userId}/event`;
  },

  getData: function(query) {
    const path = this.urlForGetEvents(query);
    const options = {
      type: 'GET',
      dataType: 'json',
      headers: this.get('headers')
    };
    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  urlForGetEvents: function(query) {
    const namespace = this.get('namespace');
    const classId = query.classId;
    const collectionId = query.collectionId;
    return `${namespace}/class/${classId}/collection/${collectionId}/events`;
  },

  postAttempt: function(query) {
    const path = this.generatePostAttemptUrl(query);
    const options = {
      type: 'POST',
      dataType: 'text',
      headers: this.get('headers')
    };
    return Ember.$.ajax(this.get('namespace') + path, options);
  },

  generatePostAttemptUrl: function(query) {
    const classId = query.classId;
    const collectionId = query.collectionId;
    const userId = query.userId;
    return `/class/${classId}/collection/${collectionId}/user/${userId}/complete`;
  },

  deleteAttempt: function(query) {
    const url = this.urlForDeleteAttempt(query);
    const options = {
      type: 'DELETE',
      dataType: 'text',
      headers: this.get('headers')
    };
    return Ember.$.ajax(url, options);
  },

  urlForDeleteAttempt: function(query) {
    const namespace = this.get('namespace');
    const classId = query.classId;
    const collectionId = query.collectionId;
    const userId = query.userId;
    return `${namespace}/class/${classId}/collection/${collectionId}/user/${userId}/reset`;
  },

  postOnAir: function(query) {
    const url = this.urlForOnAir(query);
    const options = {
      type: 'POST',
      dataType: 'text',
      headers: this.get('headers')
    };
    return Ember.$.ajax(url, options);
  },

  deleteOnAir: function(query) {
    const url = this.urlForOnAir(query);
    const options = {
      type: 'DELETE',
      dataType: 'text',
      headers: this.get('headers')
    };
    return Ember.$.ajax(url, options);
  },

  isOnAir: function(query) {
    const url = this.urlForOnAir(query);
    const options = {
      type: 'GET',
      dataType: 'text',
      headers: this.get('headers')
    };
    return Ember.$.ajax(url, options);
  },

  urlForOnAir: function(query) {
    const namespace = this.get('namespace');
    const classId = query.classId;
    const collectionId = query.collectionId;
    return `${namespace}/class/${classId}/collection/${collectionId}/onair`;
  }

});
