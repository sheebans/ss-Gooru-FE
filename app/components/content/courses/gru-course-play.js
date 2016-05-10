import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-course-play'],

  classNameBindings: ['view', 'fixed-header'],

  tagName: 'article',


  // -------------------------------------------------------------------------
  // Actions

  actions:  {
    view: function(viewName) {
      this.set('view', viewName);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement: function () {
    this._super(...arguments);

    const $header = this.$().find('> header');

    if ($header.find('nav').css('display') !== 'none') {
      // If there's a nav in the header then the resolution must be xs or sm
      // Set the default view
      this.set('view', 'content-view');
    }

    // Add fix header behaviour
    var headerWidth = $header.css('width');
    headerWidth = headerWidth && headerWidth.split('px')[0] || '100%';

    // Add inline styles to preserve the same look
    $header.css({
      width: headerWidth
    });

    this.set('fixed-header', true);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route.
   * @property {Course}
   */
  course: null

});
