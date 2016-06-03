import Ember from 'ember';
import BrowseItem from 'gooru-web/models/taxonomy/browse-item';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

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
     * Add a new tag to the selected tag list
     * @function actions:addSelectedTag
     * @param {BrowseItem} browseItem
     */
    addSelectedTag: function(browseItem) {
      var tagData = TaxonomyTagData.createFromTaxonomyItem(browseItem, this.get('subject'));

      var newSelectedTag = TaxonomyTag.create({
        isActive: true,
        isReadonly: true,
        isRemovable: true,
        data: tagData
      });
      this.get('selectedTags').pushObject(newSelectedTag);
    },

    /**
     * Clear any active shortcut tags, then change the path the browse selector is open to.
     * @function actions:updatePath
     * @param {String[]} path
     * @return {Promise}
     */
    updatePath: function(path) {
      this.get('shortcutTags').forEach(function(taxonomyTag) {
        taxonomyTag.set('isActive', false);
      });
      return this.updateSelectedPath(path);
    },

    /**
     * Set a taxonomy tag as active and change the path the browse selector is open to.
     * @function actions:openShortcut
     * @param {TaxonomyTag} taxonomyTag
     */
    /* TODO: Revisit this functionality
    openShortcut: function(taxonomyTag) {
      var path = taxonomyTag.get('taxonomyItem').getPath();
      taxonomyTag.set('isActive', true);

      return this.updateSelectedPath(path);
    },
    */

    /**
     * Remove a tag from the selected tag list
     * @function actions:removeSelectedTag
     */
    removeSelectedTag: function(browseItem) {
      var selectedTags = this.get('selectedTags');
      var idToRemove = browseItem.get('id');

      for (let i = selectedTags.length - 1; i >= 0; --i) {
        if (selectedTags[i].get('data.id') === idToRemove) {
          selectedTags.removeAt(i);
          break;
        }
      }
    },

    saveSelectedTags: function(selectedTags) {
      this.get('onSave')(selectedTags);
    },

    /**
     * Remove a tag from the selected tag list and un-check it in
     * the browse selector.
     * @function actions:uncheckItem
     * @param {TaxonomyTag} taxonomyTag
     */
    uncheckItem: function(taxonomyTag) {
      var path = taxonomyTag.get('data.ancestorsPath');
      var browseItems = this.get('browseItems');
      var browseItem = null;

      for (let i = browseItems.length - 1; i >= 0; --i) {
        browseItem = browseItems[i].find(path);
        if (browseItem) { break; }
      }

      browseItem = browseItem.findItem(taxonomyTag.get('data.id'));
      Ember.Logger.assert(browseItem, 'Unable to find browse item to deselect');
      this.get('selectedTags').removeObject(taxonomyTag);
      browseItem.set('isSelected', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super( ...arguments );

    var maxLevels = this.get('maxLevels');
    var browseItems, selectedTags;
    //var shortcutTags, selectedPath;

    Ember.Logger.assert(this.get('subject.courses'), 'Courses not found for subject');

    browseItems = this.get('taxonomyItems').map(function(taxonomyItem) {
      return BrowseItem.createFromTaxonomyItem(taxonomyItem, maxLevels);
    });

    /* TODO: Revisit this functionality
    shortcutTags = this.get('shortcuts').map(function(taxonomyItem) {
      return TaxonomyTag.create({
        taxonomyItem: taxonomyItem
      });
    });
    */

    selectedTags = this.get('selected').map(function(tagData) {
      return TaxonomyTag.create({
        isActive: true,
        isReadonly: true,
        isRemovable: true,
        data: tagData
      });
    });

    // Init values
    this.set('browseItems', browseItems);
    this.set('selectedTags', Ember.A(selectedTags));

    /* TODO: Revisit this functionality
    this.set('shortcutTags', shortcutTags);

    if (shortcutTags.length) {
      // Set default selectedPath
      var firstShortcut = shortcutTags[0];
      firstShortcut.set('isActive', true);
      selectedPath = firstShortcut.get('taxonomyItem').getPath();
      this.updateSelectedPath(selectedPath);
    }
    */

    if (selectedTags.length) {
      // Mark selected tags in browse selector
      this.get('selected').forEach(function(tagData) {
        var path = tagData.get('ancestorsPath');

        // Load path data
        this.get('onUpdatePath')(path).then(function() {
          var browseItem;

          for (let i = browseItems.length - 1; i >= 0; --i) {
            browseItem = browseItems[i].find(path);
            if (browseItem) { break; }
          }

          browseItem = browseItem.findItem(tagData.get('id'));
          Ember.Logger.assert(browseItem, 'Unable to find browse item to mark as selected');
          browseItem.set('isSelected', true);
        });
      }.bind(this));
    }
  },

  willDestroyElement: function () {
    this.get('browseItems').forEach(function(browseItem){
      browseItem.destroyItem();
    });
    this.set('browseItems', null);
    this.set('shortcutTags', null);
    this.set('selectedTags', null);
    this.set('selectedPath', null);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {BrowseItem[]} browseItems - List of browse items used by the browse selector.
   * These browse items are created from @see taxonomyItems when the component is initialized.
   */
  browseItems: null,

  /**
   * @property {String} browseSelectorText - Intro text for browse selector.
   */
  browseSelectorText: '',

  /**
   * @property {Number} maxLevels - Max level of descendants (starting from the root at level 1)
   * that will be copied from the taxonomy items onto the browse items
   * @see gru-browse-item#createFromTaxonomyItem
   */
  maxLevels: 0,

  /**
   * @property {String[]} panelHeaders - List of headers, one for each panel in the browse selector.
   * @see gru-browse-selector
   */
  panelHeaders: [],

  /**
   * @property {TaxonomyTagData[]} selected - List of references to a set of taxonomy tag data.
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
   * @property {String} selectedTextKey - i18n text key for selected tags text.
   */
  selectedTextKey: '',

  /**
   * @property {TaxonomyTagData[]} shortcuts - List of references to a set of taxonomy tag data.
   */
  /* TODO: Revisit this functionality
  shortcuts: [],
  */

  /**
   * @property {TaxonomyTag[]} shortcutTags - List of taxonomy tags to use as shortcuts in the
   * browse item tree (@see shortcuts).
   */
  /* TODO: Revisit this functionality
  shortcutTags: [],
  */

  /**
   * @property {String} shortcutText - Intro text for shortcuts.
   */
  shortcutText: '',

  /**
   * @property {TaxonomyRoot} subject - Currently selected subject.
   */
  subject: {},

  /**
   * @property {TaxonomyItem[]} taxonomyItems - List of taxonomy items. They are the initial
   * references to all the taxonomy data.
   */
  taxonomyItems: Ember.computed.alias('subject.courses'),


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Run external action to ensure data has been loaded then update the selected path
   *
   * @function updateSelectedPath
   * @return { Promise | undefined }
   */
  updateSelectedPath: function(path) {
    return this.get('onUpdatePath')(path).then(function() {
      this.set('selectedPath', path);
    }.bind(this));
  }

});
