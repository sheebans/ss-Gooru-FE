import Ember from 'ember';
import {CONTENT_TYPES} from 'gooru-web/config/config';
/**
 * Delete content component
 *
 * Component responsible for delete a content from content builder
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-delete-content'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * This is the model used to delete.
   * @property {model}
   */
  model: null,
  /**
   * Content types.
   */
  types: CONTENT_TYPES,
  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Delete Content
     */
    deleteContent: function (model) {
      let component = this;
        model.deleteMethod(model.content.id)
          .then(function () {
            if (model.callback) {
              model.callback.success();
            }
            if (model.redirect) {
              component.triggerAction({ action: 'closeModal' });
              component.get('router').transitionTo(model.redirect.route, model.redirect.params.id);
            }
          })
          .catch(function (error) {
            var message = component.get('i18n').t('common.errors.course-not-deleted').string;
            component.get('notifications').error(message);
            Ember.Logger.error(error);
          });
      }
    }
});
