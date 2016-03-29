import Ember from 'ember';

/**
 * Adapter to support the Course CRUD operations in the API 3.0
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-auth/v1/',

  getCourseListForUser:function(){
    const adapter = this;
    const namespace = adapter.get('namespace');
    const userId = this.get('session.userId');
    const url = `${namespace}profiles/${userId}/courses`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  }
});
