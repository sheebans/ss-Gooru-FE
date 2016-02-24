import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

export default Ember.Object.extend(SessionMixin, {

  host: 'http://dev-logapi.goorulearning.org', //load from environment.js
  namespace: '/api/nucleus-insights/v1',

  basePath: Ember.computed(function(){
    return this.get("host") + this.get("namespace");
  }),

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
    const apiKey = data.query.apiKey;
    const path = `/event?apiKey=${apiKey}`;

    return Ember.$.ajax(this.get('basePath') + path, options);
  }

});
