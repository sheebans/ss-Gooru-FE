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
    if (
      notifionAddresAction.postActionHook.dismissafteraction &&
      notifionAddresAction.postActionHook.dismissafteraction === true
    ) {
      let dimissPromise = component.dismissNotifiocation(notin);
      if (notifionAddresAction.postActionHook.refreshAfterDismiss) {
        dimissPromise.then(() => component.refreshList());
      }
    }
    if (
      notifionAddresAction.postActionHook.navigate &&
      notifionAddresAction.postActionHook.navigate === true
    ) {
      component.navigateNotification(
        notifionAddresAction.postActionHook.navigationDetails,
        notin
      ); //  let ngtnPromise =  chain ?
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
  },

  navigateNotification(ngtnDetails, notin) {
    const component = this;
    //let { questionId , classId, courseId, unitId , lessonId, collectionId } = ngtnDetails.queryParams;
    let qpm, queryParams;
    var route = component.get('router');
    qpm = component.transfromQpms(notin, ngtnDetails.queryparams);
    if (ngtnDetails.queryPType === 'qponly') {
      queryParams = {
        queryParams: qpm
      };
      route.transitionTo(ngtnDetails.route, queryParams);
    } else if (ngtnDetails.queryPType === 'paramonly') {
      queryParams = qpm;
      route.transitionTo(
        ngtnDetails.route,
        queryParams[ngtnDetails.exactparams]
      );
    } else if (ngtnDetails.queryPType === 'hybrid') {
      queryParams = qpm;
      route.transitionTo(
        ngtnDetails.route,
        queryParams[ngtnDetails.exactparams],
        {
          queryParams: queryParams
        }
      );
    }
  },

  transfromQpms(srcNotin, tgtQueryParams) {
    /* {"id":9,"ctxClassId":"002b0b27-1b51-4343-a51f-76fae80534f8","ctxClassCode":"FZRC834","ctxCourseId":"5d2d7b02-540f-495b-9ce3-6f3ed5a99074","ctxUnitId":"495644c9-5814-4144-8a06-bb2d55d58e30","ctxLessonId":"21f1bdf8-f983-4cbe-9446-0b95fdeb6798","ctxCollectionId":"63d1e631-7560-4f02-9adf-9679a1f97b63","currentItemId":"4f3b3a9e-3475-464c-9579-e1e5b1ad5f46","currentItemType":"assessment","currentItemTitle":"CFU:  Lesson 24 -Exit Ticket","notificationType":"teacher.suggestion","ctxPathId":527,"ctxPathType":"teacher","updatedAt":1535587200000}
    */
    var keys = Object.keys(srcNotin);
    var result = {},
      fresult = {};
    var fix_key = function(key) {
      let retvar = '';
      if (key.indexOf('ctx') > -1) {
        retvar = key.substring(3);
        retvar = retvar.camelize();
      }
      return retvar;
    };
    for (let i = 0; i < keys.length; i++) {
      var key = keys[i];
      result[fix_key(key)] = srcNotin[key];
    }

    var tgtkeys = Object.keys(tgtQueryParams);
    for (let i = 0; i < tgtkeys.length; i++) {
      var tkey = tgtkeys[i];
      fresult[tkey] = result[tkey] || tgtQueryParams[tkey];
    }

    // if (!fresult.questionId && notin.currentItemId) {
    //   fresult.questionId = notin.currentItemId;
    // }

    return fresult;
  }
});
