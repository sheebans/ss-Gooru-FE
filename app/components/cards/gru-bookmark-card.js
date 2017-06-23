import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {BookmarkService} Service to retrieve bookmark information
   */
  bookmarkService: Ember.inject.service('api-sdk/bookmark'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Remove bookmark
     *
     */
    removeBookmark: function () {
      let component = this;
      var model = {
        content: component.get('bookmark'),
        deleteMethod: function () {
          return component.get('bookmarkService').deleteBookmark(component.get('bookmark.id'));
        },
        type: component.get('bookmark.contentType'),
        callback: {
          success: function () {
            component.get('onDeleteBookmark')(component.get('bookmark'));
          }
        }
      };
      this.actions.showModal.call(this, 'content.modals.gru-delete-bookmark', model);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-bookmark-card'],

  // Events
  didRender(){
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Bookmark} bookmark information
   */
  bookmark: null

});
