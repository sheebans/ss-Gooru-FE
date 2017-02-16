import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

export default Ember.Route.extend(PrivateRouteMixin, {

  queryParams: {
    refresh: {
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies
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
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function (item) {
      const route = this;
      const controller = route.get('controller');
      const currentItem = controller.get('menuItem');

      if (item !== currentItem) {
        controller.selectMenuItem(item);
        const queryParams = {
          queryParams: {
            filterBy: 'assessment'
          }
        };

        if (item === 'performance') {
          route.transitionTo('student.class.analytics.performance', queryParams);
        } else if (item === 'classmates') {
          route.transitionTo('student.class.classmates');
        }
        else {
          route.transitionTo('student.class');
        }
      }
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
    const route = this;
    const classId = params.classId;
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);

    return Ember.RSVP.hash({
      class: classPromise,
      members: membersPromise
    }).then(function(hash) {
      const aClass = hash.class;
      const members = hash.members;
      const courseId = aClass.get('courseId');
      let visibilityPromise = Ember.RSVP.resolve([]);
      let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));

      if (courseId) {
        visibilityPromise = route.get('classService').readClassContentVisibility(classId);
        coursePromise = route.get('courseService').fetchById(courseId);
      }
      return Ember.RSVP.hash({
        contentVisibility: visibilityPromise,
        course: coursePromise
      }).then(function (hash) {
        const contentVisibility = hash.contentVisibility;
        const course = hash.course;
        aClass.set('owner', members.get('owner'));
        aClass.set('collaborators', members.get('collaborators'));
        aClass.set('members', members.get('members'));
        return Ember.RSVP.hash({
          class: aClass,
          course: course,
          members: members,
          units: course.get('children') || [],
          contentVisibility: contentVisibility
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("class", model.class);
    controller.set("course", model.course);
    controller.set("units", model.units);
    controller.set("contentVisibility", model.contentVisibility);
  }
});
