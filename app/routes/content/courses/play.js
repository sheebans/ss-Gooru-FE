import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service("api-sdk/course"),


  /**
   * @requires service:api-sdk/profile
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var route = this;
    var createdUsersProfile=[];
    var remixedUsersProfile=[];

    return route.get('courseService').fetchById(params.courseId)
      .then(function (course) {
        var collaboratorUsers = course.collaborator;
        var originalCreatorId = course.originalCreatorId;
        var creatorId = course.creatorId;

        collaboratorUsers.addObject(creatorId);

        if(originalCreatorId && originalCreatorId!==creatorId){

          var createdUsers = [originalCreatorId];
          createdUsersProfile = route.get('profileService').readMultipleProfiles(createdUsers);
          remixedUsersProfile = route.get('profileService').readMultipleProfiles(collaboratorUsers);
        }
        else {
          createdUsersProfile = route.get('profileService').readMultipleProfiles(collaboratorUsers);
        }

        return Ember.RSVP.hash({
          course: course,
          createdUsers:createdUsersProfile,
          remixedUsers: remixedUsersProfile
        });
      });
  },

  setupController(controller, model) {
    var isOwner = model.course.isOwner(this.get('session.userId'));
    var license = 'Public Domain';
    var useCase = 'Donec nulla tortor, viverra et posuere id, lobortis non felis. Nam id tristique metus, vitae sollicitudin mauris. Maecenas nec nisi arcu. Proin at ante sit amet velit fermentum porta. Nunc vitae egestas orci, ac pellentesque mi. Donec a urna nisi. Donec iaculis tincidunt nisi vel semper. Nam ullamcorper dictum lacus ac consequat. Nulla tempus tristique erat sed ornare. Etiam aliquet a velit in interdum. Nulla condimentum scelerisque elit, ac rhoncus ex euismod non. Donec vestibulum odio odio, at mollis quam tempor a. Phasellus hendrerit iaculis odio, eget auctor enim finibus at. Fusce posuere vel purus a dapibus.';

    model.course.license = license;
    model.course.useCase = useCase;
    // end of mock data!

    model.course.children = model.course.children.map(function (unit) {
      // Wrap every unit inside of a builder item
      return BuilderItem.create({
        data: unit
      });
    });

    controller.set('course', model.course);
    controller.set('createdUsers', model.createdUsers);
    controller.set('remixedUsers', model.remixedUsers);
    controller.set('isOwner', isOwner);
  }

});
