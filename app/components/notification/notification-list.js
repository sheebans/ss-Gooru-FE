import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Display properties
  /**
   * Model is as is given by the API, extract display model data model
   * Update dataModel with each fetch
   * Compute display model for changes, setting moreItemsRemaining
   */
  notificationModel: {},

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Notification Actions mapping , create actions map and select action pivoting on notinItem
     */
    addressItemNotification(notinItem) {
      const component = this;
      let notifionAddresAction = component.notificationAddressAction.notificationTypes.find(
        ntype => ntype.type === notinItem.notificationType
      );
      //Run post address hook, can refresh become part of post hook ?
      if (notifionAddresAction && notifionAddresAction.postActionHook) {
        component.postActionHook(notifionAddresAction, notinItem);
      }
    },

    /**
     * Action handler to show more data if presetn
     */
    showMore() {
      const component = this;

      component.attrs.showMore();
    }
  },
  // -------------------------------------------------------------------------
  // Methods
  /**
   * Invokes post processing for notification action
   * @param {object} notifionAddresAction
   * @param {dataobject} item
   */
  postActionHook(notifionAddresAction, notin) {
    const component = this;
    if (notifionAddresAction.postActionHook.dismissafteraction) {
      let dimissPromise = component.dismissNotifiocation(notin);
      if (notifionAddresAction.postActionHook.refreshAfterDismiss) {
        dimissPromise.then(() => component.refreshList());
      }
    }
  },

  refreshList() {
    const component = this;
    component.attrs.showNotificationList();
  },

  /**
   * Concrete notification action
   * @param {notifiocationItem object} notin
   */
  dismissNotifiocation(notin) {
    //Service call and dismiss item.
    this.attr.dismissNotifiocation(notin);
  }
});
