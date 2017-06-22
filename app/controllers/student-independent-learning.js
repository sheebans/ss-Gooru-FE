import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Triggered when the expand/collapse arrows are selected.
     */
    togglePanel: function () {
      this.set('toggleState', !this.get('toggleState'));
    }
  },


  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed('applicationController.myClasses.classes.[]', function(){
    return this.get('applicationController.myClasses').getStudentActiveClasses(this.get('profile.id'));
  }),
  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),
  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed.alias('activeClasses.length'),
   /*
   * @property {Array[]} - featuredCourses
   */
  featuredCourses: null,

  // Temporal Mock data

  bookmarks: [
    {
    "id": "aaa-bbb",
    "contentId": "123",
    "contentType": "course",
    "title": "Title 1"
    }, {
      "id": "ccc-ddd",
      "title": "Title 2",
      "contentId": "456",
      "contentType": "assessment"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 3"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "collection",
      "title": "Title 4"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "course",
      "title": "Title 5"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "collection",
      "title": "Title 6"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "course",
      "title": "Title 7"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "course",
      "title": "Title 8"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 9"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 10"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "collection",
      "title": "Title 11"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 12"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "collection",
      "title": "Title 13"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 14"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 15"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 16"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "collection",
      "title": "Title 17"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "assessment",
      "title": "Title 18"
    }, {
      "id": "eee-fff",
      "contentId": "789",
      "contentType": "course",
      "title": "Title 19"
    }
  ]
});
