import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-class-schedule-dca-pull-up'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * property to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Content object which needs to add for DCA schedule.
   * @type {Object}
   */
  content: Ember.computed.alias('context.content'),

  /**
   * Maintains the value of content type.
   * @type {String}
   */
  contentType: Ember.computed.alias('context.contentType'),

  /**
   * Maintains the value of class id.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * Maximum number of days to schedule dca content ahead.
   * @type {Number}
   */
  maxNumberOfDays: 30,

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.openPullUp();
    let startDate = moment().toDate();
    let maxNumberOfDays = component.get('maxNumberOfDays');
    let endDate = moment()
      .add(maxNumberOfDays, 'd')
      .toDate();
    component.$('#schedule-dca-datepicker').datepicker({
      startDate: startDate,
      endDate: endDate,
      maxViewMode: 0,
      format: 'yyyy-mm-dd'
    });
  },

  // -------------------------------------------------------------------------
  // Action

  actions: {
    /**
     * Action get triggered when schedule DCA pull got closed
     *
     */
    onPullUpClose() {
      this.closePullUp();
    },

    /**
     * Action get triggered when schedule DCA date confirm
     *
     */
    onConfirmDcaScheduleDate() {
      let scheduleDate = this.$('#schedule-dca-datepicker')
        .datepicker('getFormattedDate')
        .valueOf();
      let component = this;
      let classId = component.get('classId');
      let contentType = component.get('contentType');
      let contentId = component.get('content.id');
      component
        .get('classActivityService')
        .addActivityToClass(classId, contentId, contentType, scheduleDate)
        .then(newContentId => {
          component.sendAction(
            'addedScheduleContentToDCA',
            component.get('content'),
            newContentId,
            scheduleDate
          );
          component.closePullUp();
        });
    }
  },

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      400
    );
  },

  /**
   * Function to animate the  pullup from top to bottom
   */
  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
      }
    );
  }
});
