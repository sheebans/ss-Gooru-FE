import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const collectionId = params.collectionId,
      resourceId = params.resourceId;
    //@todo replace mock for sdk calls


    const narration = Ember.Object.create({
      'image-url': 'http://profile-images.goorulearning.org.s3.amazonaws.com/76514d68-5f4b-48e2-b4bc-879b745f3d70.png',
      'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });

    const
      resourceMockA = Ember.Object.create({ id: resourceId, 'name': 'Resource #3', 'type': 'question', narration: narration }),
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
