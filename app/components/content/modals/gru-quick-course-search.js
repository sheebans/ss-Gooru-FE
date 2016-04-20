import Ember from 'ember';
//import Course from 'gooru-web/models/content/course';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies



  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-quick-course-search'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions


  actions: {
    selectCourse:function(id){
      this.set("selectedCourse", id);
      $('.gru-quick-course-search .selected').removeClass('selected');
      $('.'+id).addClass('selected');
      console.log(this);
      console.log(this.get('target'),'target');
      this.get('target').actions.addCourseToClass(id);
    },
    assignCourse:function(){
      this.get('target.addCourseToClass')(this.get('selectedCourse'));
    }

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);

  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Array} courses
   */
  courses: null,

  /**
   * @type {String} selected Course's ID
   */
   selectedCourse: null,
  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null,




  //Methods

  /*
   * Move array object into array
   * */
  move(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

});
