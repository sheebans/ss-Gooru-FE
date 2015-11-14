import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const collectionId = params.collectionId,
      resourceId = params.resourceId;
    //@todo replace mock for sdk calls

    const
      resourceMockA = Ember.Object.create({ id: resourceId, 'name': 'Resource #3', 'type': 'question'}),
      resourceMockB = Ember.Object.create({ id: '10', name: 'Resource #1', type: 'question' }),
      resourceMockC = Ember.Object.create({ id: '9', name: 'Resource #2', type: 'question' });

    const collectionMock = Ember.Object.create({
      id: collectionId,
      title: 'Test collection',
      resources: Ember.A([
        resourceMockB,
        resourceMockC
      ]),
      lastVisitedResource: resourceMockB
    });

    return Ember.RSVP.hash({
      collection: collectionMock,
      resource: (resourceId) ? resourceMockA : null
    });
  },

  /**
   * @param {PlayerController} controller
   * @param {Collection} model
   */
  setupController(controller, model) {
    this._super(controller, model);

    const collection = model.collection;
    var resource = model.resource;
    controller.set("collection", collection);

    if (!resource){
      resource = collection.get("lastVisitedResource");
    }
    controller.set("resource", resource);

  }

});
