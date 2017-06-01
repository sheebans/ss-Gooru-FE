import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Serializer to support the Bookmark CRUD operations for API 3.0
 *
 * @typedef {Object} BookmarkSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {

  session: Ember.inject.service('session'),

  /**
   * Serialize a Bookmark object into a JSON representation required by the Create Bookmark endpoint
   *
   * @param bookmarkModel The Bookmark model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateBookmark: function(bookmarkModel) {
    return this.serializeBookmark(bookmarkModel);
  },

  serializeBookmark: function(bookmarkModel) {
    let serializedBookmark = {
      title: bookmarkModel.get('title'),
      content_id: bookmarkModel.get("contentId"),
      content_type: bookmarkModel.get('contentType')
    };
    return serializedBookmark;
  }

});
