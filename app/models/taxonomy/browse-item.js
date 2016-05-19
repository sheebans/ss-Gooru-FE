import Ember from 'ember';

/**
 * Browse Item
 *
 * @typedef {Object} BrowseItem
 */
export default Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} checked - If this item checked or not.
   */
  isChecked: false,

  /**
   * @property {browseItem[]} children - List of item's children
   */
  children: null,

  /**
   * @property {boolean} level - Level where this item is found in the
   * browse selector (@see gru-browse-selector). Level values start with 1.
   */
  level: null,

  /**
   * @property {TaxonomyItem} item
   */
  item: null,

  /**
   * @property {string} parent - Parent item or null if this is node is at the root of the tree.
   */
  parent: null,

  /**
   * @property {boolean} selected - Does this item have children checked or not?
   */
  hasChildrenChecked: Ember.computed.bool('totalChildrenChecked'),

  /**
   * @property {string} totalChildrenChecked - Number of children that are currently selected.
   * This counter will work only for items that are *not* in the last level of the
   * browse selector (@see gru-browse-selector)
   */
  totalChildrenChecked: 0,


  // -------------------------------------------------------------------------
  // Observers

  onCheckUpdate: Ember.observer('isChecked', function() {
    if (this.get('isChecked')) {
      this.increaseCheckedCounters();
    } else {
      this.decreaseCheckedCounters();
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function Calculate an array with the path to this item
   */
  calculateItemPath: function() {
    var path = new Array(this.get('level'));
    this.calculatePath(path);
    return path;
  },

  calculatePath: function(resultArray) {
    var level = this.get('level');
    var parent = this.get('parent');

    resultArray[level - 1] = this.get('item.id');
    if (parent) {
      parent.calculatePath(resultArray);
    }
  },

  /**
   * @function Decrease the counter 'totalChildrenChecked' in all of this node's ancestors
   */
  decreaseCheckedCounters: function() {
    var parent = this.get('parent');

    if (parent) {
      let childrenSelected = parent.get('totalChildrenChecked');
      parent.set('totalChildrenChecked', --childrenSelected);
      parent.decreaseCheckedCounters();
    }
  },

  /**
   * @function Increase the counter 'totalChildrenChecked' in all of this node's ancestors
   */
  increaseCheckedCounters: function() {
    var parent = this.get('parent');

    if (parent) {
      let childrenSelected = parent.get('totalChildrenChecked');
      parent.set('totalChildrenChecked', ++childrenSelected);
      parent.increaseCheckedCounters();
    }
  }

});
