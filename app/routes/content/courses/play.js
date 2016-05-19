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
   * @requires service:session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var course = this.get('courseService').fetchById(params.courseId);

    return Ember.RSVP.hash({
      course: course
    });
  },

  setupController(controller, model) {
    var isOwner = model.course.get('owner') === this.get('session.userId');

    // TODO: Remove mock data for the information panel
    var owner_details = [
      {
        id: 'owner-1',
        firstName: 'Russell',
        fullName: 'Russell Owner1',
        avatarUrl: '/assets/gooru/profile.png'
      },
      {
        id: 'owner-2',
        firstName: 'Frank',
        fullName: 'Frank Owner2',
        avatarUrl: '/assets/gooru/profile.png'
      }
    ];

    var collaborator_details = [
      {
        id: 'collaborator-1',
        firstName: 'Shawn',
        fullName: 'Shawn Collaborator1',
        avatarUrl: '/assets/gooru/profile.png'
      },
      {
        id: 'collaborator-2',
        firstName: 'Megan',
        fullName: 'Megan Collaborator2',
        avatarUrl: '/assets/gooru/profile.png'
      }
    ];

    var license = 'Public Domain';
    var useCase = 'Donec nulla tortor, viverra et posuere id, lobortis non felis. Nam id tristique metus, vitae sollicitudin mauris. Maecenas nec nisi arcu. Proin at ante sit amet velit fermentum porta. Nunc vitae egestas orci, ac pellentesque mi. Donec a urna nisi. Donec iaculis tincidunt nisi vel semper. Nam ullamcorper dictum lacus ac consequat. Nulla tempus tristique erat sed ornare. Etiam aliquet a velit in interdum. Nulla condimentum scelerisque elit, ac rhoncus ex euismod non. Donec vestibulum odio odio, at mollis quam tempor a. Phasellus hendrerit iaculis odio, eget auctor enim finibus at. Fusce posuere vel purus a dapibus.';

    model.course.owner_details = owner_details;
    model.course.collaborator_details = collaborator_details;
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
    controller.set('isOwner', isOwner);
  }

});
