import Ember from "ember";

/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  currentClass: Ember.computed.reads('classController.class'),

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

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
