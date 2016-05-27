import Ember from 'ember';

/**
 * Browse selector
 *
 * Component responsible for displaying a tree of browse items as a hierarchical
 * list of panels where each panel displays a level of data from a branch in the
 * tree. Items in the last levels of the tree can be selected/deselected.
 *
 * If there are more levels in the tree than there are levels of panels, then the
 * exceeding tree levels will be displayed as accordions in the last browse panel.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'gru-browse-selector'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Select an item that is not in the last panel
     *
     * @function actions:selectInsideItem
     */
    selectInsideItem: function(item) {
      var selectedPath = item.getPath();

      this.get('onSelectItem')(item);
      this.set('selectedPath', selectedPath);
    },

    /**
     * Select an item in the last panel
     *
     * @function actions:selectCheckableItem
     */
    selectCheckableItem: function(item) {
      var isSelected = !item.get('isSelected');

      item.set('isSelected', isSelected);
      if (isSelected) {
        this.get('onCheckItem')(item);
      } else {
        this.get('onUncheckItem')(item);
      }
    }

  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    this._super( ...arguments );

    this.$('button[data-toggle="collapse"]').on('click', function(e) {
      e.preventDefault();
    });
  },

  willDestroyElement: function () {
    this.$('button[data-toggle="collapse"]').off('click');
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of root nodes for the tree data structure for the browse panels
   * @prop {BrowseItem[][]...}
   */
  data: [],

  /**
   * List of headers, one for each browse panel
   * @prop {String[]}
   */
  headers: [],

  /**
   * List of objects, where each object serves as the model for a browse panel.
   * Each object is made up of two properties:
   * - title : panel header name (String) -@see headers
   * - data  : pointer to a list of browse items (BrowseItem[]).
   *
   * @prop {Object[]}
   */
  headerItems: Ember.computed('selectedPath', function() {
    var headers = this.get('headers');
    var selectedPath = this.get('selectedPath');
    var currentList, browseItem;

    return headers.map(function(headerTitle, index) {
      var itemId = selectedPath[index];

      if (index === 0) {
        currentList = this.get('data');
        browseItem = currentList.findBy('id', itemId);
      } else {
        if (currentList.length) {
          currentList = (browseItem) ? browseItem.get('children') : [];
          browseItem = currentList.findBy('id', itemId);
        }
      }

      return Ember.Object.create({
        title: headerTitle,
        data: (currentList) ? currentList : []
      });

    }.bind(this));
  }),

  /**
   * List of ids of selected panel items where each array index corresponds to a panel level.
   * @prop {String[]}
   */
  selectedPath: []

});
