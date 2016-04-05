import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import Course from 'gooru-web/models/content/course';
import Unit from 'gooru-web/models/content/unit';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  setupController(controller /*, model */) {

    // TODO: Fetch data from model
    var course = Course.create(Ember.getOwner(this).ownerInjection(), {
      title: "Course Title",
      category: 1,
      audience: [2, 4],
      image: '',

      // TODO: Fetch unit detail data from services
      children: [
        BuilderItem.create({
          data: Unit.create(Ember.getOwner(this).ownerInjection(), {
            bigIdeas: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis eros vitae magna hendrerit mollis. Nullam est libero, aliquet sed tristique non, pellentesque non nunc. Integer augue erat, luctus eu suscipit vitae, consectetur vitae nisi. Morbi pretium quam diam. Ut sit amet bibendum libero.',
            essentialQuestions: 'Nunc venenatis elementum dolor a imperdiet. Donec rhoncus est eget magna imperdiet mollis. Nam tristique, est nec molestie placerat, eros turpis semper erat, vitae sodales eros risus gravida turpis. Vivamus sit amet commodo turpis, et ultricies tortor. Nunc vitae neque non erat sagittis imperdiet ac ut dui.',
            id: 12345,
            sequence: 1,
            title: 'Sample Unit Title'
          })
        }),
        BuilderItem.create({
          data: Unit.create(Ember.getOwner(this).ownerInjection(), {
            bigIdeas: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis eros vitae magna hendrerit mollis. Nullam est libero, aliquet sed tristique non, pellentesque non nunc. Integer augue erat, luctus eu suscipit vitae, consectetur vitae nisi. Morbi pretium quam diam. Ut sit amet bibendum libero.',
            essentialQuestions: 'Nunc venenatis elementum dolor a imperdiet. Donec rhoncus est eget magna imperdiet mollis. Nam tristique, est nec molestie placerat, eros turpis semper erat, vitae sodales eros risus gravida turpis. Vivamus sit amet commodo turpis, et ultricies tortor. Nunc vitae neque non erat sagittis imperdiet ac ut dui.',
            id: 56789,
            sequence: 2,
            title: 'Another Unit Title'
          })
        })
      ]
    });

    controller.set('course', course);
  }

});
