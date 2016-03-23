import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import Course from 'gooru-web/models/content/course';
import { COURSE_AUDIENCE } from 'gooru-web/config/config';

export default Ember.Controller.extend(BuilderMixin, {

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Actions

  actions:{
    /**
     * Send request to publish a course
     */
    sendRequest: function () {
      this.set('wasRequestSent',true);
    },

    /**
     * Save Content
     */
    saveNewContent: function () {
      var courseTitle= $("#course-name").val();
      this.set('course.title',courseTitle);
      this.set('course.category',this.get('activeCategory.value'));
      this.saveAudience();
      this.set('isEditing',false);
    },
    /*
     *Action Triggered when change category
     * @see content.gru-category
     */
    changeCategory:function(newCategory){
      this.set('activeCategory',newCategory);
    },
    /*
     *Action Triggered when change the audience
     * @see content.audience
     */
    changeAudience:function(newAudience){
      this.set('tempAudience',newAudience);
    },

  },
  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var course = Course.create(Ember.getOwner(this).ownerInjection(), {
      'title': "Course Title",
      'category':1,
      'audience':[2,4]
    });
    this.set('course', course);
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model
   * @property {Course}
   */
  course: null,

  /**
   * Is a request pending approval?
   * @property {Boolean}
   */
  isRequestApproved: false,

  /**
   * Has a request to make the course searchable been sent?
   * @property {Boolean}
   */
  wasRequestSent: false,

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

  /**
   * Active Category
   * @property {Number}
   */
  activeCategory:null,
  /**
   * Active Audience
   * @property {Number}
   */
   tempAudience:null,
  /**
   * @type {Ember.A} audienceList - List of audiences
   */
  audienceList:Ember.computed('course.audience',function(){
    var component = this;
    var list = COURSE_AUDIENCE.slice(0);
    list.forEach(function(object){
      Ember.set(object,'checked', component.findInArray(object.value,component.get('course.audience')));
    });
    return list;
  }),

  // -------------------------------------------------------------------------
  //Methods

  /*
   * Check if the value exist into array
   */
  findInArray: function (value,array) {
   return $.inArray(value, array) > -1;
  },
  /*
   * Save new audience
   */
  saveAudience: function () {
    var component = this;
    var tempAudience = component.get('tempAudience');
    var newAudience = [];
    if(tempAudience==null){
      tempAudience =  component.get('audienceList');
    }
    tempAudience.map(function (object) {
      if(object.checked===true){
        newAudience.push(object.value);
      }
    });
    component.set('course.audience',newAudience);
  }

});
