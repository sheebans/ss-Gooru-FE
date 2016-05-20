import Ember from 'ember';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

/**
 * Browse Item
 *
 * @typedef {Object} BrowseItem
 */

var BrowseItem = TaxonomyItem.extend({

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} selected - Does this item have children checked or not?
   */
  hasChildrenSelected: Ember.computed.bool('totalChildrenSelected'),

  /**
   * @property {string} totalChildrenSelected - Number of children that are currently selected.
   */
  totalChildrenSelected: 0,


  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super( ...arguments );

    if (this.get('isSelected')) {
      this.increaseSelected();
    }
  },

  // -------------------------------------------------------------------------
  // Observers

  onCheckUpdate: Ember.observer('isSelected', function() {
    if (this.get('isSelected')) {
      this.increaseSelected();
    } else {
      this.decreaseSelected();
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function Decrease the counter 'totalChildrenSelected' in all of this node's ancestors
   */
  decreaseSelected: function() {
    var parent = this.get('parent');

    if (parent) {
      let childrenSelected = parent.get('totalChildrenSelected');
      parent.set('totalChildrenSelected', --childrenSelected);
      parent.decreaseSelected();
    }
  },

  /**
   * @function Increase the counter 'totalChildrenSelected' in all of this node's ancestors
   */
  increaseSelected: function() {
    var parent = this.get('parent');

    if (parent) {
      let childrenSelected = parent.get('totalChildrenSelected');
      parent.set('totalChildrenSelected', ++childrenSelected);
      parent.increaseSelected();
    }
  }

});


BrowseItem.reopenClass({

  /**
   * @function Create a browse item from an existing taxonomy item
   * @static
   * @param {TaxonomyItem}
   * @return {BrowseItem}
   */
  createFromTaxonomyItem: function(taxonomyItem) {

    // Converts a taxonomy item (@see TaxonomyItem) and all its descendants
    // to browse items
    function convertToBrowseItem(taxonomyItem, parent = null) {
      var children = [];

      var properties = $.extend(taxonomyItem.getProperties([
        'id',
        'isSelected',
        'label',
        'level'
      ]), { "parent": parent });

      var browseItem = BrowseItem.create(properties);

      taxonomyItem.get('children').forEach(function(child) {
        // Convert all the children to browse items
        var browseItemChild = convertToBrowseItem(child, browseItem);
        children.push(browseItemChild);
      });

      browseItem.set('children', children);

      return browseItem;
    }

    return convertToBrowseItem(taxonomyItem);
  }

});

export default BrowseItem;
