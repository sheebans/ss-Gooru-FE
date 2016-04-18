import Ember from 'ember';
import { CONTENT_TYPES } from "gooru-web/config/config";

/**
 * Builder lesson item
 *
 * @typedef {Object} Content/LessonItem
 */
export default Ember.Object.extend({

  /**
   * @property {String} id - Gooru id for the lesson item
   */
  id: '',

  /**
   * @property {String} image - Lesson item image url
   */
  image: '',

  isCollection: Ember.computed('format', function() {
    return this.get('format') === CONTENT_TYPES.COLLECTION;
  }),

  /**
   * @property {String} format - Type of lesson item
   */
  format: '',

  /**
   * @property {Number} questionCount - total number of questions in the lesson
   */
  questionCount: 0,

  /**
   * @property {Number} resourceCount - total number of resources in the lesson
   */
  resourceCount: 0,

  /**
   * @property {String} sequence - sequence order among other lesson items
   */
  sequence: 0,

  /**
   * @property {String} title
   */
  title: ''

});
