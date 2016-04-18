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
   * @type {String} selectedType
   */

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
