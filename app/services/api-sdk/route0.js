import Ember from 'ember';
import Route0Serializer from 'gooru-web/serializers/route0';
import Route0Adapter from 'gooru-web/adapters/route0';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  store: Ember.inject.service(),

  route0Serializer: null,

  route0Adapter: null,
  route0: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'route0Serializer',
      Route0Serializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'route0Adapter',
      Route0Adapter.create(Ember.getOwner(this).ownerInjection())
    );

    this.set('route0', []);
  },

  /**
   * Returns the local storage
   * @returns {Storage}
   */
  getLocalStorage: function() {
    return window.localStorage;
  },

  addRoute0: function(route0model, filter) {
    const service = this;
    let localstore = service.getLocalStorage();
    if (this.route0) {
      localstore.setItem(
        service.generateKey(filter),
        JSON.stringify(route0model)
      );
    }
  },
  getRoute0: function(filter) {
    const service = this;
    const storedResponse = service
      .getLocalStorage()
      .getItem(this.generateKey(filter));
    return JSON.parse(storedResponse);
  },

  generateKey: function(filter) {
    const userId = this.get('session.userId');
    return `U_${userId}_CL_${filter.classId}_CO_${filter.courseId}`;
  },

  fetchInClass: function(filter) {
    const service = this;
    /* var responseMockData = {
      status: 'pending', //'accepted' , 'regected', 'na= not applicable, already complted' , 'na = not avalible, course does not have anything to offer'
      // 40x= na for misc reasons,
      route0Content: {},
      userCompetencyRoute: {}
    }; */
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedFilterData = service
        .get('route0Serializer')
        .fetchInClass(filter);
      service
        .get('route0Adapter')
        .fetchInClass({
          body: serializedFilterData
        })
        .then(
          function(responseData) {
            responseData = service
              .get('route0Serializer')
              .normalizeFetch(responseData);
            resolve(responseData);
            service.addRoute0(responseData, filter);
          },
          function(error) {
            const status = error.status;
            if (status === 404) {
              resolve({ status: '404' });
            } else {
              reject(error);
            }
          }
        );
    });
  },
  updateRouteAction: function(action) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedFilterData = service
        .get('route0Serializer')
        .updateRouteAction(action);
      service
        .get('route0Adapter')
        .updateRouteAction({
          body: serializedFilterData
        })
        .then(
          function(responseData) {
            resolve(responseData);
          },
          function(error) {
            const status = error.status;
            if (status === 404) {
              resolve({ status: '200' });
            } else {
              reject(error);
            }
          }
        );
    });
  }
});
