import Ember from 'ember';
import RemixBaseModal from 'gooru-web/components/content/modals/gru-base-remix';

export default RemixBaseModal.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Collection service API SDK
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-collection-remix'],

  // -------------------------------------------------------------------------
  // Actions

  copyContent: function(collection) {
    return this.get("collectionService").copyCollection(collection.get('id'));
  },

  updateContent: function(collection) {
    return this.get('collectionService').updateCollection(collection.get('id'), collection);
  },

  showSuccessNotification: function(collection) {
    var component = this;
    var successMsg = component.get('i18n').t('common.remix-collection-success', {collectionTitle: collection.get('title')});
    var collectionEditUrl = component.get('router').generate('content.collections.edit', collection.get('id'));
    var edit = component.get('i18n').t('common.edit');
    component.get('notifications').success(`${successMsg} <a class="btn btn-success" href="${collectionEditUrl}">${edit}</a>`);
  },

  showFailureNotification: function() {
    const message = this.get('i18n').t('common.errors.collection-not-copied').string;
    this.get('notifications').error(message);
  }

});
