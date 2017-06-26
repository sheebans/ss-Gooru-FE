import Ember from 'ember';
import {DEFAULT_SEARCH_PAGE_SIZE} from 'gooru-web/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  /**
   * @type {BookmarkService} Service to retrieve bookmark information
   */
  bookmarkService: Ember.inject.service('api-sdk/bookmark'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * show more bookmark results
     */
    showMoreResults: function(){
      this.showMoreResults();
    },

    /**
     * Remove a bookmark from a list of bookmarks
     */
    removeBookmark: function (bookmark) {
      this.get('bookmarks').removeObject(bookmark);
    },

    /**
     * Triggered when the expand/collapse arrows are selected.
     */
    togglePanel: function () {
      this.set('toggleState', !this.get('toggleState'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed('applicationController.myClasses.classes.[]', function(){
    return this.get('applicationController.myClasses').getStudentActiveClasses(this.get('profile.id'));
  }),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed.alias('activeClasses.length'),

   /*
   * @property {Array[]} - featuredCourses
   */
  featuredCourses: null,

  /*
   * @property {Array[]} - bookmarks
   */
  bookmarks: null,

  /**
   * @property {Number} firstRowLimit of bookmarks in the planel
   */
  firstRowLimit: 9,

  /**
   * @property {boolean}
   */
  showExpandIcon: Ember.computed("bookmarks.[]", function(){
    return this.get("bookmarks.length") && this.get("bookmarks.length") > this.get("firstRowLimit");
  }),

  /**
   * @property {*}
   */
  pagination: null,

  /**
   * Shows the rest of bookmarks
   * @property {Boolean} toggleState
   */
  toggleState: true,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * show more bookmark results
   */
  showMoreResults: function(){
    const controller = this;
    const pagination = this.get("pagination");

    pagination.offset = pagination.offset + pagination.pageSize;
    pagination.pageSize = DEFAULT_SEARCH_PAGE_SIZE;
    this.set("pagination", pagination);
    controller.get('bookmarkService').fetchBookmarks(pagination, false).then(function(bookmarkResults){
      controller.get("bookmarks").pushObjects(bookmarkResults);
    });
  }
});
