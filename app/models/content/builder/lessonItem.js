import Ember from 'ember';

/**
 * Builder lesson item
 *
 * @typedef {Object} Builder/LessonItem
 */
export default Ember.Object.extend({

  /**
   * @property {String} id - Gooru id for the lesson item
   */
  id: '',

  isCollection: Ember.computed('format', function() {
    return this.get('format') === 'collection';
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
