import Ember from 'ember';

/**
 * Properties/functionality in common for content creation
 *
 * @mixin
 */
export default Ember.Mixin.create({


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {Number} index - Item index number relative to its sibling
   */
  index: null,

  /**
   * @prop {Ember.RSVP.Promise} items - children of the accordion
   * Will resolve to {Unit[] | Lesson[] | Collection[]}
   */
  items: [],

  /**
   * @prop {Unit | Lesson} model - Item data model (accordion root)
   */
  model: null,

  /**
   * @property {Boolean} isAddingItem - Is a new item being added or not?
   */
  isAddingItem: Ember.computed('items.@each.isNew', function () {
    var items = this.get('items');
    return !!items.filterBy('isNew').length;
  }),

  /**
   * @property {Boolean} isEditingItem - Is an item being edited or not?
   * New items (i.e. not yet saved) are also considered as being edited.
   */
  isEditingItem: Ember.computed('items.@each.isEditing', function () {
    var items = this.get('items');
    return items.filterBy('isEditing', true).length;
  }),

  /**
   * @property {Boolean} totalSavedItems - Number of items that have been saved at least once?
   */
  totalSavedItems: Ember.computed('items.@each.isNew', function () {
    var items = this.get('items');
    return items.filterBy('isNew', false).length;
  })

});
