import Ember from 'ember';
import BookmarkSerializer from 'gooru-web/serializers/content/bookmark';
import BookmarkAdapter from 'gooru-web/adapters/content/bookmark';

/**
 * @typedef {Object} BookmarkService
 */
export default Ember.Service.extend({

  /**
   * @property {BookmarkSerializer} bookmarkSerializer
   */
  bookmarkSerializer: null,

  /**
   * @property {BookmarkAdapter} bookmarkAdapter
   */
  bookmarkAdapter: null,

  /**
   * @property {number} Number of records to fetch
   */
  limit: 20,


  init: function () {
    this._super(...arguments);
    this.set('bookmarkSerializer', BookmarkSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('bookmarkAdapter', BookmarkAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Creates a new bookmark
   *
   * @param bookmarkData object with the bookmark data
   * @returns {Promise}
   */
  createBookmark: function(bookmarkData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedBookmarkData = service.get('bookmarkSerializer').serializeCreateBookmark(bookmarkData);
      service.get('bookmarkAdapter').createBookmark({
        body: serializedBookmarkData
      }).then(function(responseData, textStatus, request) {
        let bookmarkId = request.getResponseHeader('location');
        bookmarkData.set('id', bookmarkId);
        resolve(bookmarkData);
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Fetches the Bookmarks
   *
   * @param offset - for paginated listing of bookmarks
   * @returns {Promise}
   */
  fetchBookmarks: function(offset = 0) {
    const service = this;
    const limit = service.get('limit');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('bookmarkAdapter').fetchBookmarks(offset, limit)
      .then(
        response => resolve(service.get('bookmarkSerializer').normalizeFetchBookmarks(response)),
        reject
      );
    });
  }
});
