import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

/**
 * Collection List
 *
 * Component responsible for listing a set of resources/questions
 *
 * @module
 * @augments content/courses/gru-accordion-course
 *
 */
export default Ember.Component.extend(BuilderMixin, {


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'collections', 'gru-collection-list-item'],

  tagName: 'li',


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} remainingStandards - number of standards not displayed
   */
  remainingStandards: Ember.computed('visibleStandards', function() {
    return this.get('model.standards.length') - this.get('visibleStandards');
  }),

  /**
   * @property {Number} visibleStandards - number of standards that will be displayed
   */
  visibleStandards: 1,

  /**
   * @property {Object[]} visibleStandardsList - list of standards that will be displayed
   */
  visibleStandardsList: Ember.computed('visibleStandards', function() {
    var visibleStandards = this.get('visibleStandards');

    return this.get('model.standards').filter(function(item, index) {
      return index < visibleStandards;
    });
  })


});
