import Ember from 'ember';
import { COURSE_CATEGORIES } from 'gooru-web/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} User service API SDK
   */
  userService: Ember.inject.service("api-sdk/user"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-course-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {},

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  categories: COURSE_CATEGORIES,

  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});
