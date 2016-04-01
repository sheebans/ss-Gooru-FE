import Ember from 'ember';

/**
 * Properties/functionality in common for content creation
 *
 * @mixin
 */
export default Ember.Mixin.create({

  actions: {

    /**
     * Cancel Edit Content
     */
    cancelEdit: function () {
      this.set('isEditing', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  UISetup: Ember.on('init', function () {
    this._super(...arguments);

    Ember.$('document').ready(function () {
      const $container = Ember.$('.controller.content.edit');
      const $header = $container.find('article > header');
      const $window = Ember.$(window);

      Ember.$(window).on('scroll', function () {
        var scrollTop = $window.scrollTop();
        var headerWidth = $header.css('width');
        var headerPaddingLeft = $header.css('paddingLeft');
        headerWidth = headerWidth && headerWidth.split('px')[0] || '100%';

        if (scrollTop >= 65) {
          if (!$container.hasClass('fixed-header')) {
            // Add inline styles to preserve the same look
            $container.find('article > header').css({
              width: headerWidth,
              paddingLeft: headerPaddingLeft
            });
            $container.addClass('fixed-header');
          }
        } else {
          if ($container.hasClass('fixed-header')) {
            // Remove any inline styles
            $container.find('article > header').prop('style', '');
            $container.removeClass('fixed-header');
          }
        }
      });

    });
  }),


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEditing: false

});
