import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

export default Ember.Controller.extend(BuilderMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /*
    * Send request to publish a course
    * */
    sendRequest:function(){
      this.set('wasRequestSent',true);
    },
    /*
     * Edit Course
     * */
    editCourse:function(){
      this.set('isEdit',true);
    },
    /*
     * Cancel Edit
     * */
    cancelEditCourse:function(){
      this.set('isEdit',false);
    },
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * ONLY FOR TEST
   * @property {Course}
   */
  course: Ember.Object.create({
    'title': "Course Title",
    'categories':Ember.A([Ember.Object.create({
      'name': "K-12",
      'isActive': true
    }),Ember.Object.create({
      'name': "Higher Education",
      'isActive': false
    }),Ember.Object.create({
      'name': "Professional Development",
      'isActive': false
    })])
  }),
  /**
   * Indicate if a request to be publish is approved
   * @property {Boolean}
   */
  isRequestApproved:false,
  /**
   * Indicate if a request to be searchable and featured has been send
   * @property {Boolean}
   */
  wasRequestSent:false,

  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEdit:false,
  /**
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions:Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })]),
});
