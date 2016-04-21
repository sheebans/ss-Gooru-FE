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
      console.log(this.get('selectedCourse'));
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
   selectedCourse: null
  //Methods
});
