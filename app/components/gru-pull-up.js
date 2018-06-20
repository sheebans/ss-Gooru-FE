import Ember from 'ember';

/**
 * Gooru APP pull up component
 *
 * Component responsible for generating the skeleton pull up component,
 * which  have header, footer(Optional), title, close button and more info(Optional).
 * @augments ember/Component
 * see the sample usage below
 * {{#gru-pull-up showPullUp=showPullUp title=title  description=description  showMore=true  as |section| }}
 * {{/gru-pull-up}}
 */

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-pull-up'],

  // -------------------------------------------------------------------------
  // Actions

  /**
   * Action triggered when the user invoke the pull up.
   **/
  actions: {
    onPullUpClose() {
      this.set('showPullUp', false);
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
   * Propery to show header in pullup component.
   * @property {showPisShowHeaderullUp}
   */
  header: {
    isShowHeader: true
  },

  /**
   * Propery to show pullup body content.
   * @property {isShowBody}
   */
  body: {
    isShowBody: true
  },

  //--------------------------------------------------------------------------
  // Observer
  //

  /**
   * Observer to check the showPullUp property in component
   **/
  onChange: Ember.observer('showPullUp', function() {
    if (this.get('showPullUp')) {
      Ember.$('.gru-pull-up').animate(
        {
          top: '15%'
        },
        850
      );
    } else {
      Ember.$('.gru-pull-up').animate(
        {
          top: '100%'
        },
        850
      );
    }
  })
});
