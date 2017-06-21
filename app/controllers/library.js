import Ember from 'ember';
import Bookmark from 'gooru-web/models/content/bookmark';
import { CONTENT_TYPES } from 'gooru-web/config/config';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/bookmark
   */
  bookmarkService: Ember.inject.service('api-sdk/bookmark'),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered to bookmark a course
     * @param {Course} course
     */
    onBookmarkCourse: function({ title, id }, showType) {
      let bookmark = Bookmark.create(Ember.getOwner(this).ownerInjection(), {
        title,
        contentId: id,
        contentType: CONTENT_TYPES.COURSE
      });
      this.createBookmark(bookmark, showType);
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Object[]} options List of tab options to show
   */
  options: Ember.computed(function(){
    return [{
      name: 'featured-courses',
      text: this.get('i18n').t('library.featured-courses')
    }, {
      name: 'other-libraries',
      text: this.get('i18n').t('library.other-libraries')
    }];
  }),

  /**
   * @property {String} selected Current option selected
   */
  selected: 'featured-courses',

  // -------------------------------------------------------------------------
  // Properties

  /**
   * When a bookmark is created
   */
  createBookmark: function(bookmark, showType) {
    this.get('bookmarkService').createBookmark(bookmark).then(() => {
      this.get('notifications').setOptions({
        positionClass: 'toast-top-full-width',
        toastClass: 'gooru-toast',
        timeOut: 10000
      });
      const successMsg = showType ? this.get('i18n').t(
        'common.bookmarked-content-success',
        { contentType: bookmark.get('contentType') }
      ) : this.get('i18n').t('common.bookmarked-success');
      const independentLearningURL = '#';
      const buttonText = this.get('i18n').t('common.take-me-there');
      this.get('notifications').success(
        `${successMsg} <a class="btn btn-success" href="${independentLearningURL}">${buttonText}</a>`
      );
    });
  }
});
