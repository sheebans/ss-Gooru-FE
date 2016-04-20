import Ember from 'ember';

// TODO: Remove once it's possible to read the content of a collection
import Collection from 'gooru-web/models/content/collection';
import Question from 'gooru-web/models/content/question';
import Resource from 'gooru-web/models/content/resource';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  collectionService: Ember.inject.service('api-sdk/collection'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },
  setupController(controller /*, model */) {

    // TODO: Remove once it's possible to read the content of a collection
    var collection = Collection.create(Ember.getOwner(this).ownerInjection(), {
      title: "Collection Title",
      category: 1,
      audience: [2, 4],
      image: 'assets/gooru/default-image.png',
      learningObjectives: "Learning Objectives",
      children: Ember.A([
        Resource.create({
          format: 'text',
          title: 'Physics Overview',
          standards: []
        }),
        Question.create({
          format: 'question',
          type: 'MC',
          title: 'Find the distance',
          standards: [
            Ember.Object.create({
              code: "K12.MA"
            }),
            Ember.Object.create({
              code: "K12.LA"
            }),
            Ember.Object.create({
              code: "K12.SC-SC1"
            })
          ]
        })
      ])
    });

    controller.set('collection', collection);
  }

});
