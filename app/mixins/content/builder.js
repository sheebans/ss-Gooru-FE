import Ember from 'ember';

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
     * Reorder lesson items
     */
    sortLessonItems:function() {
      this.loadData();
      this.set('model.isExpanded', true);
      this.set('isSorting',true);
      this.$('.sortable').sortable('enable');
    },

    /**
     * Cancel reorder lesson items
     */
    cancelSort:function() {
      this.$('.sortable').sortable('disable');
      this.set('isSorting', false);
    },

    /**
     * Save reorder lesson items
     */
    saveReorder:function() {
      var courseId = this.get('course.id');
      var unitId = this.get('unitId');
      var lessonId = this.get('lesson.id');
      var orderList = this.get('orderList');

      this.get('lessonService').reorderLesson(courseId, unitId, lessonId, orderList)
        .then(function(){
          this.$('.sortable').sortable('disable');
          this.set('isSorting', false);
          this.refreshList(orderList);
        }.bind(this));
    }
  },


  // -------------------------------------------------------------------------
  // Events

  setupSortable: Ember.on('didInsertElement', function() {
    this._super(...arguments);
    var component = this;

    this.$('.sortable').sortable({
      disabled: true,
      update: function() {
        const $items = component.$('.sortable').find('li');
        const orderList = $items.map(function(idx, item) {
          // Note: all child elements must have a data-id attribute for the .sortable plugin to work
          return $(item).data('id');
        }).toArray();
        component.set('orderList',orderList);
      }
    });
  }),

  destroySortable: Ember.on('willDestroyElement', function(){
    var $sortable = this.$('.sortable');

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
   * @property {Boolean} Are the child items of this item currently being sorted?
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
  refreshList: function(list) {
    var items = this.get('items');
    var sortedItems = items.map(function(item, index, items) {
      return items.findBy('id', list[index]);
    });
    items.clear();
    items.addObjects(sortedItems);
  }

});
