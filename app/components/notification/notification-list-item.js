import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Display properties

  /**
   * @description constants display css mapping
   */
  displayConstants: {
    notificationType: [
      { type: 'teacher.suggestion', iconClass: 'account_circle' },
      { type: 'teacher.override', iconClass: 'iconperformance' },
      { type: 'teacher.grading.complete', iconClass: 'iconperformance' },
      { type: 'student.self.report', iconClass: 'iconperformance' },
      { type: 'student.gradable.submission', iconClass: 'iconperformance' }
    ],
    currentItemType: [
      { type: 'assessment', iconClass: 'grucount' },
      { type: 'collection', iconClass: 'view_comfy' },
      { type: 'assessment-external', iconClass: 'explore' }
    ]
    /* ,'notificationTypeCurrentItem' : [ { '' } ] //TBD if required*/
  },

  /**
   * @description Property for getting list item notification class
   */
  notificationTypeClass: Ember.computed('', function() {
    const component = this;
    return component.displayConstants.notificationType.find(
      ntype => ntype.type === component.get('model.notificationType')
    ).iconClass;
  }),

  /**
   * @description Property for getting current item  class [assessment/ collection]
   */
  currentItemType: Ember.computed('', function() {
    const component = this;
    return component.displayConstants.currentItemType.find(
      citype => citype.type === component.get('model.currentItemType')
    ).iconClass;
  }),

  // -------------------------------------------------------------------------
  // Data model property

  /**
   * @description Data model passed by parent
   * @example {
   *  /* {"id":9,"ctxClassId":"002b0b27-1b51-4343-a51f-76fae80534f8","ctxClassCode":"FZRC834","ctxCourseId":"5d2d7b02-540f-495b-9ce3-6f3ed5a99074","ctxUnitId":"495644c9-5814-4144-8a06-bb2d55d58e30","ctxLessonId":"21f1bdf8-f983-4cbe-9446-0b95fdeb6798","ctxCollectionId":"63d1e631-7560-4f02-9adf-9679a1f97b63","currentItemId":"4f3b3a9e-3475-464c-9579-e1e5b1ad5f46","currentItemType":"assessment","currentItemTitle":"CFU:  Lesson 24 -Exit Ticket","notificationType":"teacher.suggestion","ctxPathId":527,"ctxPathType":"teacher","updatedAt":1535587200000}
   */
  model: null,

  // -------------------------------------------------------------------------
  // Event
  /*
  didUpdateAttrs(options) { console.log('didUpdateAttrs', options); },
  willUpdate(options) { console.log('willUpdate', options); }, didReceiveAttrs(options) { console.log('didReceiveAttrs', options); },
  didInsertElement: function(arge) { const component = this; console.log('didrender', arge); console.log('testvar1', this.get('testvar')); Ember.run.later(this, () => { component.set('test222var', 'DDERER'); }); },
  *use as req, remove when commited
  */

  // -------------------------------------------------------------------------
  // Action
  actions: {
    /**
     * When an items is selected
     * @param {DropdownItem} item
     */
    addressNotification: function() {
      const component = this,
        item = component.model;
      this.get('addressNotification')(item);
    }
  }
});
