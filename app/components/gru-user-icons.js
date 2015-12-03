import Ember from 'ember';

/**
 * User Icons
 *
 * Component responsible for indicating how many users are active/inactive
 * in a specific context (e.g. unit, lesson, assessment)
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-user-icons'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events
  setup: Ember.on('didInsertElement', function() {
    const viewMoreIn = (this.get('viewMoreIn') === 'modal') ? 'modal' : 'tooltip';

    this.addCustomStyles();

    if (viewMoreIn === 'modal') {
      this.setupModal();
    } else {
      this.setupTooltip();
    }
  }),

  cleanUp: Ember.on('willDestroyElement', function() {
    // Handler bound to the anchor if using a modal or tooltip to display more users
    const $anchor = this.$('a.first-view');

    $anchor.off('click');

    // In case a popover was open, it will need to be destroyed
    $anchor.popover('destroy');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /*
   * @prop {Ember.Array} firstUsers - List of users to be displayed at first glance
   */
  firstUsers: Ember.computed.filter('usersSorted', function(user, index) {
    var viewThreshold = this.get('viewThreshold') - 1;
    return index < viewThreshold;
  }),

  /*
   * @prop {Ember.Array} remainingUsers - List of users to be displayed if the
   * user requires to view more
   */
  remainingUsers: Ember.computed.filter('usersSorted', function(user, index) {
    var viewThreshold = this.get('viewThreshold') - 1;
    return index >= viewThreshold;
  }),

  /*
   * @prop {Number} remainingUsersNumber - Number of users surpassing the view threshold
   */
  remainingUsersNumber: Ember.computed('usersSorted.length', 'viewThreshold', function() {
    return this.get('usersSorted.length') - (this.get('viewThreshold') - 1);
  }),

  /*
   * @prop {Bool} showMoreUsers - Should the user be allowed to require to view more users
   */
  showMoreUsers: Ember.computed.gt('remainingUsersNumber', 1),

  /*
   * @prop {Ember.Array} users - List of users to be displayed by the component
   */
  users: null,

  /*
   * @prop {Ember.Array} users - List of users to be displayed by the component
   */
  usersSorted: Ember.computed.sort('users', function(a, b) {
    var firstStatus = a.get('active');
    var firstName = a.get('name');
    var secondStatus = b.get('active');
    var secondName = b.get('name');

    return (firstStatus > secondStatus) ? -1 :
      (firstStatus < secondStatus) ? 1 :
        (firstName <= secondName) ? -1 : 1;
  }),

  /*
   * @prop {String} viewMoreIn - Method for viewing additional users
   * Valid values are: 'tooltip' | 'modal'
   */
  viewMoreIn: 'tooltip',

  /*
   * @prop {Number} viewThreshold - Number of users that will be seen at first
   * glance (without requiring to view more)
   */
  viewThreshold: 3,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  addCustomStyles: function() {
    var items = this.$('.first-view .item');

    for (let i = 0; i < items.length; i++) {
      let zIndex = items.length - i;
      let left = (items.length - 1 - i) * 12;

      items.eq(i).attr('style', `z-index: ${zIndex}; left: ${left}px;`);
    }
  },

  setupTooltip: function() {
    const component = this;
    const $anchor = this.$('a.first-view');
    var showCalled = false;

    if (this.get('showMoreUsers')) {

      $anchor.addClass('clickable');
      $anchor.attr('data-html', 'true');
      $anchor.popover({
        placement: "auto bottom",
        content: function() {
          return component.$('.remaining .modal-body').html();
        },
        trigger: 'manual'
      });

      $anchor.on('click', function() {
        // The popovers are controlled manually so that only one popover
        // is visible at a time
        var $open = Ember.$('.gru-user-icons .gru-popover-open');

        if ($open.length) {
          $open.removeClass('gru-popover-open').popover('hide');
        }

        if ($open.get(0) !== this) {
          $(this).addClass('gru-popover-open').popover('show');
        }
      });
    }
  },

  setupModal: function() {
    const component = this;
    const $anchor = this.$('a.first-view');

    if (this.get('showMoreUsers')) {

      $anchor.addClass('clickable');
      $anchor.on('click', function(){
        component.$('.remaining').modal('toggle');
      });
    }
  }

});
