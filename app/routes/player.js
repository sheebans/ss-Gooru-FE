import Ember from 'ember';

export default Ember.Route.extend({


  /**
   * @property {Ember.Service} Service to retrieve a Collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const
      collectionId = params.collectionId,
      resourceId = params.resourceId;
      //collection = this.get("collectionService").findById(collectionId);

    //@todo replace mock for sdk calls
    const narration = Ember.Object.create({
      'image-url': 'http://profile-images.goorulearning.org.s3.amazonaws.com/76514d68-5f4b-48e2-b4bc-879b745f3d70.png',
      'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });

    const
      resourceMockA = Ember.Object.create(
        {
          "id": (resourceId || "068caf89-317a-44fe-a12a-bfa3abcd4d20"),
          "answers": [
            {
              "answerId": 10252843,
              "answerText": "An aquifer ",
              "answerType": "text",
              "isCorrect": true,
              "sequence": 1
            },
            {
              "answerId": 10252844,
              "answerText": "A well",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 2
            },
            {
              "answerId": 10252845,
              "answerText": "A pump",
              "answerType": "text",
              "isCorrect": false,
              "sequence": 3
            }
          ],
          "order": 2,
          "text": "An underground layer of water-bearing rock or materials that clean drinking water can be extracted from is called...",
          "hints": [],
          "explanation": "",
          "type": "MC",
          "narration": narration,
          "title": "Question 1",

          "isQuestion": true,
          "isMultipleChoice": true
        }
      ),

      resourceMockB = Ember.Object.create({
        id: '10',
        title: 'Resource #1',
        resourceType: 'url',
        "isQuestion": false
      }),

      resourceMockC = Ember.Object.create({
        id: '9',
        title: 'Resource #2',
        resourceType: 'video',
        "isQuestion": false
      });

    const collectionMock = Ember.Object.create({
      id: collectionId,
      title: 'Test collection',
      collectionItems: Ember.A([
        resourceMockA,
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
