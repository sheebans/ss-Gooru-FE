import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['backdrop-pull-ups', 'teacher-class-schedule-dca-pull-up'],

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

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    let component = this;
    component.openPullUp();
    component.$('#schedule-dca-datepicker').datepicker({
      stepMonths: 0
    });
    //component.$('#schedule-dca-datepicker').on('changeDate', function() {});
  },

  // -------------------------------------------------------------------------
  // Action

  actions: {
    onPullUpClose() {
      this.closePullUp();
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
