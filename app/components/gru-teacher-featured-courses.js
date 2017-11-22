import Ember from 'ember';
import Bookmark from 'gooru-web/models/content/bookmark';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * student featured courses component
 *
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(ModalMixin, {
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
  // Attributes

  /**
   * Create a bookmark
   * @param bookmark
   */
  createBookmark: function(bookmark) {
    return this.get('bookmarkService').createBookmark(bookmark);
  },

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
      this.createBookmark(bookmark).then(() =>
        this.notifyBookmarkSuccess(bookmark, showType)
      );
    },

    /**
     * Action triggered to preview the course
     * @param course
     */
    previewCourse: function(course) {
      let component = this;
      let isTeacher = this.get('isTeacher');
      this.set('course', course);
      var model = Ember.Object.create({
        content: course,
        isTeacher
      });

      model.set('remixCourse', () => component.remixCourse());
      model.set('playCourse', () => component.playCourse());
      model.set('bookmarkCourse', () => component.bookmarkCourse());
      component.send('showModal', 'gru-preview-course', model);
    }
  },

  /**
   *Action triggered when select remix the course
   */
  remixCourse: function() {
    if (this.get('session.isAnonymous')) {
      this.send('showModal', 'content.modals.gru-login-prompt');
    } else {
      var remixModel = {
        content: this.get('course')
      };
      this.send('showModal', 'content.modals.gru-course-remix', remixModel);
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Array[]} - courses
   */
  courses: null,

  /**
   * @property {Profile} user profile
   */
  profile: null
});
