import Ember from 'ember';

export default Ember.Controller.extend({
// -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Handle onSelectCourse event from gru-course-card
     *
     */
    selectCourse: function(course){
      console.log("Select Course",course);
    },
    /**
     * Handle onRemixCourse event from gru-course-card
     *
     */
    remixCourse: function(){
      console.log("Remix Course");
    },
    /**
     * Handle onViewLayoutChange event from gru-view-layout-picker
     *
     */
    viewLayoutChange:function(layout){
      console.log(layout);
    },

  },

  // -------------------------------------------------------------------------
  // Properties



  /**
   * Course to show in gru-user-teaser
   * Example1
   * @property {Course}
   */
  "course-1":Ember.Object.create({
    'title': 'Water cycle',
    'totalUnits': 8,
    'subject': 'Science',
    'imageUrl': '/assets/gooru/profile.png',
    'remixedBy':  Ember.A([Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-1',
      'fullName': 'lastname-1 firstname-1',
      'id': 'id-1',
      'lastName': 'lastname-1',
      'profileImageUrl': '/assets/gooru/profile.png',
      'username': 'username-1'
    }),Ember.Object.create({
      'email': 'user_2@test.com',
      'firstName': 'firstname-2',
      'fullName': 'lastname-2 firstname-2',
      'id': 'id-2',
      'lastName': 'lastname-2',
      'profileImageUrl': '/assets/gooru/profile.png',
      'username': 'username-2'
    }),Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-3',
      'fullName': 'lastname-3 firstname-3',
      'id': 'id-1',
      'lastName': 'lastname-3',
      'profileImageUrl': '/assets/gooru/profile.png',
      'username': 'username-3'
    })])
  }),
  /**
   * Course to show in gru-user-teaser
   * Example2
   * @property {Course}
   */
  "course-2":Ember.Object.create({
    'title': 'Earths Water',
    'totalUnits': 3,
    'subject': 'Science',
    'imageUrl': '/assets/gooru/profile.png',
    'remixedBy': Ember.A([Ember.Object.create({
      'email': 'user_1@test.com',
      'firstName': 'firstname-1',
      'fullName': 'lastname-1 firstname-1',
      'id': 'id-1',
      'lastName': 'lastname-1',
      'profileImageUrl': '/assets/gooru/profile.png',
      'username': 'username-1'
    })])
  })

});
