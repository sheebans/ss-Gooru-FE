import Ember from 'ember';
import ResourceSerializer from 'gooru-web/serializers/content/resource';
import ResourceAdapter from 'gooru-web/adapters/content/resource';


/**
 * @typedef {Object} ResourceService
 */
export default Ember.Service.extend({

  /**
   * @property {ResourceSerializer} resourceSerializer
   */
  resourceSerializer: null,

  /**
   * @property {ResourceAdapter} resourceAdapter
   */
  resourceAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('resourceSerializer', ResourceSerializer.create());
    this.set('resourceAdapter', ResourceAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  /**
   * Creates a new resource
   *
   * @param resourceData object with the resource data
   * @returns {Promise}
   */
  createResource: function(resourceData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedClassData = service.get('resourceSerializer').serializeCreateResource(resourceData);
      service.get('resourceAdapter').createResource({
        body: serializedClassData
      }).then(function(responseData, textStatus, request) {
        let resourceId = request.getResponseHeader('location');
        resourceData.set('id', resourceId);
        resolve(resourceData);
      }, function(error) {
        if (error.statusCode === 400){
          // {"duplicate_ids":["537557e1-e424-4f03-8475-d813d6b26a47"]}
        }
        reject(error);
      });
    });
  }
});
