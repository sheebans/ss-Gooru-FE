import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import Course from 'gooru-web/models/content/course';

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
      this.set('course.category', this.get('activeCategory.value'));
      this.set('isEditing', false);
    },

    /**
     * Action Triggered when change de action
     */
    changeCategory: function (newCategory) {
      this.set('activeCategory', newCategory);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var course = Course.create(Ember.getOwner(this).ownerInjection(),
      {
        'title': "Course Title",
        'category': 1
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
  activeCategory:null

});
