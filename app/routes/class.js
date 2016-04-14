import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  /**
   * @type {UserService} Service to retrieve user information
   */
  userService: Ember.inject.service("api-sdk/user"),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const classId = params.classId;
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);

    // TODO It is required to implement the Get Course Info and the get Units
    // This code was change to support the new API, a lot of functionality inside class rount is not working at this moment
    return Ember.RSVP.hash({
      class: classPromise,
      course: Ember.Object.create({}),
      members: membersPromise,
      units: []
    });

  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    let classModel = model.class;
    classModel.set('owner', model.members.get('owner'));
    classModel.set('collaborators', model.members.get('collaborators'));
    classModel.set('members', model.members.get('members'));

    controller.set("class", model.class);
    controller.set("course", model.course);
    controller.set("units", model.units);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get("controller");
      const aClass = controller.get('class');
      const isTeacher = aClass.isTeacher(this.get("session.userId"));
      controller.selectMenuItem(item);

      if ((item === "analytics.performance") && isTeacher){
        route.transitionTo('class.analytics.performance.teacher.course');
      }
      else {
        route.transitionTo('class.' + item);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * This event handlers reset some class properties when leaving the route
   */
  handleDeactivate: function() {
    this.get("controller").exitFullScreen();
  }.on('deactivate')

});
