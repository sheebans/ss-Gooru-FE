import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import Course from 'gooru-web/models/content/course';

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
     *Set Category
     * */
    setCategory:function(newCategory){
      this.set('activeCategory',newCategory);
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
  course: Course.create(
    {'title': "Course Title",
      'category':1
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
