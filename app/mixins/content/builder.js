import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';

/**
 * Properties/functionality in common for content creation
 *
 * @mixin
 */
export default Ember.Mixin.create({

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Reorder child items
     */
    sortItems:function() {
      this.loadData();
      this.set('model.isExpanded', true);
      this.set('model.isSorting', true);
      this.$('> .panel > .panel-body > .sortable').sortable('enable');
    },

    /**
     * Cancel sorting of child items
     */
    cancelSort:function() {
      this.$('> .panel > .panel-body > .sortable').sortable('disable');
      this.set('model.isSorting', false);
    },

    /**
     * Save sorting of child items
     */
    finishSort:function() {
      this.$('> .panel > .panel-body > .sortable').sortable('disable');
      this.set('model.isSorting', false);
      this.refreshList();
    }
  },


  // -------------------------------------------------------------------------
  // Events

  setupSortable: Ember.on('didInsertElement', function() {
    this._super(...arguments);
    var component = this;

    this.$('> .panel > .panel-body > .sortable').sortable({
      disabled: true,
      update: function() {
        const $items = component.$('> .panel > .panel-body > .sortable').find('> li');
        const orderList = $items.map(function(idx, item) {
          // Note: all child elements must have a data-id attribute for the .sortable plugin to work
          return $(item).data('id');
        }).toArray();
        component.set('orderList',orderList);
      }
    });
  }),

  destroySortable: Ember.on('willDestroyElement', function(){
    var $sortable = this.$('> .panel > .panel-body > .sortable');

    // Test if the element had a sortable widget instantiated
    if ($sortable.hasClass('ui-sortable')) {
      $sortable.sortable('destroy');
    }
  }),


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
  }),

  /**
   * @property {Boolean} Is this item currently being reordered among its siblings?
   */
  isSorting: false,

  /**
   * @property {String[]} Array of item IDs corresponding to the current order of the child items
   */
  orderList: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Refresh the item list after save reorder
   */
  refreshList: function() {
    var orderList = this.get('orderList');
    var items = this.get('items');
    var filterFunc = function(item, index, items) {
      return items.findBy('id', orderList[index]);
    };

    if (items.length && items[0] instanceof BuilderItem) {
      filterFunc = function(item, index, items) {
        return items.findBy('data.id', orderList[index]);
      };
    }

    var sortedItems = items.map(filterFunc);
    items.clear();
    items.addObjects(sortedItems);
  }

});
