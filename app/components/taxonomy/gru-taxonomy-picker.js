import Ember from 'ember';
import BrowseItem from 'gooru-web/models/taxonomy/browse-item';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

/**
 * Taxonomy Picker
 *
 * Component responsible for keeping track of the selection of taxonomy items (@see gru-browse-selector)
 * and helping in the selection process of these items by providing shortcuts.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'gru-taxonomy-picker'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Clear any active shortcut tags
     * @function actions:clearActiveShortcut
     */
    clearShortcuts: function() {
      this.get('shortcutTags').forEach(function(taxonomyTag) {
        taxonomyTag.set('isActive', false);
      });
    },

    /**
     * Add a new tag to the selected tag list
     * @function actions:addSelectedTag
     * @param {BrowseItem} browseItem
     */
    addSelectedTag: function(browseItem) {
      var newSelectedTag = TaxonomyTag.create({
        isActive: true,
        isReadonly: true,
        isRemovable: true,
        taxonomyItem: browseItem
      });
      this.get('selectedTags').pushObject(newSelectedTag);
    },

    /**
     * Set a taxonomy tag as active and change the path the browse selector is open to.
     * @function actions:openShortcut
     * @param {TaxonomyTag} taxonomyTag
     */
    openShortcut: function(taxonomyTag) {
      this.actions.clearShortcuts.call(this);
      taxonomyTag.set('isActive', true);
      var path = taxonomyTag.get('taxonomyItem').getPath();
      this.set('selectedPath', path);
    },

    /**
     * Remove a tag from the selected tag list
     * @function actions:removeSelectedTag
     */
    removeSelectedTag: function(browseItem) {
      var selectedTags = this.get('selectedTags');
      var pathToRemove = browseItem.getPath().toString();

      for (let i = selectedTags.length - 1; i >= 0; --i) {
        if (selectedTags[i].get('taxonomyItem').getPath().toString() === pathToRemove) {
          selectedTags.removeAt(i);
          break;
        }
      }
    },

    /**
     * Remove a tag from the selected tag list and un-check it in
     * the browse selector.
     * @function actions:uncheckItem
     * @param {TaxonomyTag} taxonomyTag
     */
    uncheckItem: function(taxonomyTag) {
      var path = taxonomyTag.get('taxonomyItem').getPath();
      var browseItems = this.get('browseItems');
      var browseItem = null;

      for (let i = browseItems.length - 1; i >= 0; --i) {
        browseItem = browseItems[i].find(path);
        if (browseItem) { break; }
      }

      this.get('selectedTags').removeObject(taxonomyTag);
      browseItem.set('isSelected', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super( ...arguments );

    var maxLevels = this.get('panelHeaders').length;
    var browseItems, shortcutTags, selectedTags, selectedPath;

    if (!maxLevels) {
      Ember.Logger.error('Number of panel headers must be greater than zero');
    }

    browseItems = this.get('taxonomyItems').map(function(taxonomyItem) {
      return BrowseItem.createFromTaxonomyItem(taxonomyItem, maxLevels);
    });

    shortcutTags = this.get('shortcuts').map(function(taxonomyItem) {
      return TaxonomyTag.create({
        taxonomyItem: taxonomyItem
      });
    });

    selectedTags = this.get('selected').map(function(taxonomyItem) {
      return TaxonomyTag.create({
        isActive: true,
        isReadonly: true,
        isRemovable: true,
        taxonomyItem: taxonomyItem
      });
    });

    // Init values
    this.set('browseItems', browseItems);
    this.set('shortcutTags', shortcutTags);
    this.set('selectedTags', Ember.A(selectedTags));

    if (shortcutTags.length) {
      // Set default selectedPath
      var firstShortcut = shortcutTags[0];
      firstShortcut.set('isActive', true);
      selectedPath = firstShortcut.get('taxonomyItem').getPath();
      this.set('selectedPath', selectedPath);
    }

    if (selectedTags.length) {
      // Mark selected tags in browse selector
      this.get('selected').forEach(function(taxonomyItem) {
        var path = taxonomyItem.getPath();

        for (let i = browseItems.length - 1; i >= 0; --i) {
          let browseItem = browseItems[i].find(path);
          if (browseItem) {
            browseItem.set('isSelected', true);
            break;
          }
        }
      });
    }
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {BrowseItem[]} browseItems - List of browse items used by the browse selector.
   * These browse items are created from @see taxonomyItems when the component is initialized.
   */
  browseItems: null,

  /**
   * @property {String[]} panelHeaders - List of headers, one for each panel in the browse selector.
   * @see gru-browse-selector
   */
  panelHeaders: [],

  /**
   * @property {TaxonomyItem[]} selected - List of references to a subset of taxonomy
   * items (@see taxonomyItems).
   */
  selected: [],

  /**
   * @property {String[]} selectedPath - Path to open the browse selector to. If shortcut items
   * (@see shortcuts) are provided then selectedPath will be set to the path of the first
   * shortcut item by default.
   * @see gru-browse-selector
   */
  selectedPath: [],

  /**
   * @property {TaxonomyTag[]} selectedTags - List of taxonomy tags created from @see selected.
   */
  selectedTags: Ember.A(),

  /**
   * @property {TaxonomyItem[]} shortcuts - List of references to a subset of taxonomy
   * items (@see browseItems).
   */
  shortcuts: [],

  /**
   * @property {TaxonomyTag[]} shortcutTags - List of taxonomy tags to use as shortcuts in the
   * browse item tree (@see shortcuts).
   */
  shortcutTags: [],

  /**
   * @property {TaxonomyItem[]} taxonomyItems - List of taxonomy items. They are the initial
   * references to all the taxonomy data.
   */
  taxonomyItems: null

});
