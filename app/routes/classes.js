import Ember from 'ember';
import SessionMixin from '../mixins/session';

/**
 * Classes route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {Ember.Service} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function() {
    var classesJoined = this.get("classService").findClassesIJoined();
    var classesTaught = this.get("classService").findClassesITeach();

    return Ember.RSVP.hash({
      classesJoined: classesJoined,
      classesTaught: classesTaught,
      users: [
        Ember.Object.create({
          id: 1,
          name: "Bobby Fisher",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 2,
          name: "John Doe",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 3,
          name: "Martha Stewart",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 4,
          name: "Sy Stallone",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 5,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 6,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 7,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 8,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 9,
          name: "Bobby Fisher",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 10,
          name: "John Doe",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 11,
          name: "Martha Stewart",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 12,
          name: "Sy Stallone",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 13,
          name: "Bennie King",
          avatar: '/assets/gooru/profile.png',
          active: true
        }),
        Ember.Object.create({
          id: 14,
          name: "John Fitzgerald",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 15,
          name: "Celia Cruz",
          avatar: '/assets/gooru/profile.png',
          active: false
        }),
        Ember.Object.create({
          id: 16,
          name: "Kennie Wong",
          avatar: '/assets/gooru/profile.png',
          active: true
        })
      ]
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("classesJoined", model.classesJoined);
    controller.set("classesTaught", model.classesTaught);

    controller.set("users", model.users);
  }

});
