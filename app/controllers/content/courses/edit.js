import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import { COURSE_CATEGORIES } from 'gooru-web/config/config';

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
     * Edit Content
     * */
    editContent:function(){
      this.set('isEdit',true);
    },
    /*
     * Cancel Edit Content
     * */
    cancelEditContent:function(){
      this.set('isEdit',false);
    },
    /*
     *Set Category
     * */
    setCategory:function(newCategory){
      this.set('activeCategory',newCategory);
    },
    /*
     *Save Content
     * */
    saveNewContent:function(){
      var courseTitle= $("#course-name").val();
      this.set('course.title',courseTitle);
      this.set('course.category',this.get('activeCategory'));
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
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEdit:false,
  /**
   * Indicate the active category
   * @property {Boolean}
   */
  activeCategory: Ember.computed(function(){
    return   this.get('course.category');
  }),
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
   * @type {Ember.A} categories - List of course categories
   */
  categories: COURSE_CATEGORIES,

  selectedCategory: Ember.computed('course.category','categories',function(){
    var categoriesList = this.get('categories');
    var selectedCategoryValue=this.get('course.category');
    var selectedCategory;
    categoriesList.forEach(function(category){
      if (category.value === selectedCategoryValue ){
        selectedCategory=category.label;
      }
    });
    return selectedCategory;
  }),
});
