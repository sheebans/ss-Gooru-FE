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

  classService: Ember.inject.service('api-sdk/class'),

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
    },
    assignCourse:function(){
      const component = this;
      const courseId = component.get('selectedCourse');
      const classId = component.get('model.classId');
      component.get('classService')
      .associateCourseToClass(courseId,classId)
      .then(function(){
          component.triggerAction({ action: 'closeModal' });
          component.get('router').transitionTo('class.info', classId);
        },
        function () {
          const message = component.get('i18n').t('common.errors.course-not-associated').string;
          component.get('notifications').error(message);
        });
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
