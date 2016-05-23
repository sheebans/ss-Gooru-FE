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
   * @property {boolean} isSelected - Is this item selected or not.
   */
  isSelected: false,

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
   * @param {TaxonomyItem} taxonomyItem
   * @param {Number} untilLevel - Max level of descendants that will be copied onto the browse item (default: 1).
   *   In other words, by default a new browse item will be created from an existing taxonomy item
   *   with no children.
   * @return {BrowseItem}
   */
  createFromTaxonomyItem: function(taxonomyItem, untilLevel) {

    // Converts a taxonomy item (@see TaxonomyItem) and all its descendants
    // to browse items
    function convertToBrowseItem(taxonomyItem, untilLevel = 1, parent = null) {
      var children = [];

      var properties = $.extend(taxonomyItem.getProperties([
        'id',
        'label',
        'level'
      ]), { "parent": parent });

      var browseItem = BrowseItem.create(properties);

      // Restrict the number of children levels that will be copied
      // onto the browse item
      if (browseItem.get('level') < untilLevel) {

        taxonomyItem.get('children').forEach(function(child) {
          // Convert all the children to browse items
          var browseItemChild = convertToBrowseItem(child, untilLevel, browseItem);
          children.push(browseItemChild);
        });
      }

      browseItem.set('children', children);

      return browseItem;
    }

    return convertToBrowseItem(taxonomyItem, untilLevel);
  }

});

export default BrowseItem;
