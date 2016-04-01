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
   * @property {Boolean} savedItems - List of all items with a truthy 'id' value?
   */
  savedItems: Ember.computed('items.@each.id', function () {
    var items = this.get('items');
    return items.filterBy('id');
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
   * @property {Boolean} isAddingItem - Is a new item being added or not?
   */
  isAddingItem: Ember.computed('items.[]', 'savedItems.[]', function () {
    return this.get('items.length') > this.get('savedItems.length');
  })

});
