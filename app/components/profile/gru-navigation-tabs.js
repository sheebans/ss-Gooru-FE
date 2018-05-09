import Ember from 'ember';
import { getRoutePathFirstOccurrence } from 'gooru-web/utils/utils';
import { PROFILE_NAV_MENU_ITEMS } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['profile gru-navigation-tabs'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      this.highlightMenuItem(item);
      if (this.get('onItemSelected')) {
        this.sendAction('onItemSelected', item);
      }
    },

    /**
     *
     * Triggered when the user clicks follow/unfollow button
     */
    toggleFollowingStatus: function() {
      if (this.get('onFollowChanged')) {
        this.sendAction('onFollowChanged');
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    let component = this;
    let firstOccurancePath = getRoutePathFirstOccurrence();
    var item = PROFILE_NAV_MENU_ITEMS.includes(firstOccurancePath)
      ? firstOccurancePath
      : component.get('selectedMenuItem');
    component.highlightMenuItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String|Function} onItemSelected - event handler for when an menu item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedMenuItem - menu Item selected
   */

  selectedMenuItem: null,

  /**
   * @property {boolean} roles is student or not for proficiency tabs view
   */
  isStudent: Ember.computed('profile', function() {
    let component = this;
    return component.get('profile').get('role') === 'student';
  }),

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected menu item
   */
  refreshSelectedMenuItem: function() {
    var item = this.get('selectedMenuItem');
    this.highlightMenuItem(item);
  }.observes('selectedMenuItem'),

  // -------------------------------------------------------------------------
  // Methods

  highlightMenuItem: function(item) {
    this.$('.profile-menu-item').removeClass('selected');
    this.$(`.profile-menu-item.${item}`).addClass('selected');
  }
});
