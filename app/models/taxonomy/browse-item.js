import Ember from 'ember';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

/**
 * Browse Item
 *
 * @typedef {Object} BrowseItem
 */
export default TaxonomyItem.extend({

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} selected - Does this item have children checked or not?
   */
  hasChildrenChecked: Ember.computed.bool('totalChildrenChecked'),

  /**
   * @property {string} totalChildrenChecked - Number of children that are currently selected.
   */
  totalChildrenChecked: 0,


  // -------------------------------------------------------------------------
  // Observers

  onCheckUpdate: Ember.observer('isSelected', function() {
    if (this.get('isSelected')) {
      this.increaseCheckedCounters();
    } else {
      this.decreaseCheckedCounters();
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

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
