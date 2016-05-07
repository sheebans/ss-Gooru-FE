import Ember from 'ember';

/**
 * Teacher Analytics Performance Controller
 *
 * Controller responsible of the logic for the teacher performance
 *
 * @module
 * @see routes/analytics/performance/teacher.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['filterBy'],

  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    /**
     * Triggered when a filter option is selected
     * @param {string} option
     */
    optionsChange:function(options){
      this.set('selectedOptions', options.map(function(option){
        return option.get("value");

      }));
    },

    /**
     * Triggered when a filter option is selected
     * @param {string} option
     */
    selectFilterBy: function(option){
      this.set("filterBy", option);
    },

    /**
     * Triggered when the user toggles between normal and full screen mode
     */
    toggleFullScreen: function () {
      return this.get("classController").toggleFullScreen();
    },

    /**
     * Launch an assessment on-air
     *
     * @function actions:launchOnAir
     */
    launchOnAir: function () {
      const currentClass = this.get("classController").class;
      const classId = currentClass.get("id");
      const courseId = currentClass.get("courseId");
      const unitId = this.get("unit.id");
      const lessonId = this.get("lesson.id");
      const collectionId = this.get("collection.id");

      var url = 'reports/class/'+classId+'/course/'+courseId+'/unit/'+unitId+'/lesson/'+lessonId+'/collection/'+collectionId;

      url += '?anonymous=true';
      window.open(url, 'realTimeAnonymous', 'width=' + window.screen.width + ', height=' + window.screen.height + ', left=0, top=0', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class'),

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Course}
   */
  course: Ember.computed.alias('classController.course'),

  /**
   * @property {Unit} unit
   */
  unit: null,

  /**
   * @property {Lesson} lesson
   */
  lesson: null,

  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   * @property {Boolean} collectionLevel - shows if the collection level.
   */
  collectionLevel: false,

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: 'assessment',

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  selectedOptions: Ember.A(["score"]),

  /**
   * If analytics is fullscreen
   * @property {Boolean}
   */
  isFullScreen:  Ember.computed.alias('classController.isFullScreen'),

  /**
   * List of breadcrumbs.
   * @property {Array}
   */
  breadcrumb: Ember.A(),

  /**
   * List of  options specific to teacher to be displayed by the component Data picker
   *
   * Only to validate acceptance criteria 6 "The data picker could received which options are selectable by default"
   *
   * @constant {Array}
   */
  optionsTeacher: Ember.A([]),

  /**
   * List of  options specific to teacher to be displayed by the component Data picker for mobiles
   * @constant {Array}
   */
  mobileOptionsTeacher: Ember.A([]),

  /**
   * Indicates if the filters are visible
   * @property {boolean}
   */
  showFilters: Ember.computed.not('collectionLevel'),
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Updates the breadcrumb based on the provided item
   * @param {[]} breadcrumb
   * @param {item} item
   * @param {type} course, unit, lesson, assessment
   */
  updateBreadcrumb: function(item, type){
    const controller = this;
    let breadcrumb = controller.get('breadcrumb');

    const value = Ember.Object.create({id: item.get("id"), type: type});
    const breadcrumbObject = Ember.Object.create({
      label: item.get("title"),
      value: value
    });

    //removes all items
    const levels = ["course", "unit", "lesson"];
    const index = levels.indexOf(type);
    const toRemove = breadcrumb.slice(index, breadcrumb.get("length"));
    breadcrumb.removeObjects(toRemove.toArray());

    //add new breadcrumb item
    breadcrumb.pushObject(breadcrumbObject);
    return breadcrumb;
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('unit', null);
    this.set('lesson', null);
    this.set('collection', null);
  }
});
