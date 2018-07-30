import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['competency-report-pull-up'],

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    component.openPullUp();
  },

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when close pull up
     */
    onClosePullUp(closeAll) {
      let component = this;
      component.closePullUp(closeAll);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * @property {title}
   * Property to store pull up title
   */
  title: '',

  /**
   * @property {type}
   * Property to store pull up type
   */
  type: '',


  // -------------------------------------------------------------------------
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

  closePullUp(closeAll) {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      400,
      function() {
        component.set('showPullUp', false);
        if (closeAll) {
          component.sendAction('onClosePullUp');
        }
      }
    );
  }
});
