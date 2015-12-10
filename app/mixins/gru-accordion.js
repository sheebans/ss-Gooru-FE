import Ember from 'ember';

/**
 * Properties in common for all accordion components
 *
 * @mixin
 */
export default Ember.Mixin.create({


  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events
  setupAccordion: Ember.on('init', function() {
    this.set('accordionId', this.get('elementId') + 'Accordion');
  }),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @prop {String} accordionId - element id of the accordion element. This is
   * necessary to tie things up in the DOM (all open/close interactions will be
   * handled by Bootstrap)
   */
  accordionId: '',

  /**
   * @prop {Class} currentClass - class to use as context for the retrieval
   * of information
   */
  currentClass: null,

  /**
   * @prop {Number} index - position of the item in the visibleItems list
   */
  index: null,

  /**
   * @prop {Ember.RSVP.Promise} items - children of the accordion
   * Will resolve to {Unit[] | Lesson[] | Collection[]}
   */
  items: null,

  /**
   * @prop {Unit | Lesson} model - accordion root
   */
  model: null,

  /**
   * @prop {Bool} expanded - is the accordion expanded or collapsed?
   */
  expanded: false,

  /**
   * @prop {Unit[] | Lesson[] | Collection[]} visibleItems - Items set to be visible
   */
  visibleItems: Ember.computed.filterBy('items.content', 'visibility', true)


  // -------------------------------------------------------------------------
  // Methods

});
