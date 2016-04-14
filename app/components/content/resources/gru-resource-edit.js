import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';

export default Ember.Component.extend(ContentEditMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'resources', 'gru-resource-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Resource model as instantiated by the route. This is the model used when not editing
   * or after any resource changes have been saved.
   * @property {Resource}
   */
  resource: null
});
