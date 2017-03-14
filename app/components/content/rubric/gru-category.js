import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content','rubric','gru-category'],

  // -------------------------------------------------------------------------
  // Actions

  actions:{
    /**
     * Enable edit inline
     */
    editInline: function () {
      this.showInlinePanel();
    },
    /**
     * Cancel edit inline
     */
    cancel: function (){
      this.setProperties({
        'isPanelExpanded': false,
        'isEditingInline': false
      });
    }
  },
  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    this._super(...arguments);
    const component = this;
    // Adds tooltip to UI elements (elements with attribute 'data-toggle')
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

    //Determinate if the device when the component is showing is a touch device, in order to deactivate the tooltips
    var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    if (isTouch) {
      component.$('.actions .item-actions button').tooltip('disable');
    }

    if(!this.get('category.title')){
      component.showInlinePanel();
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Category} category
   */
  category: null,
  /**
   * @property {Boolean} isEditingInline
   */
  isEditingInline: false,

  /**
   * @property {Boolean} isPanelExpanded
   */
  isPanelExpanded: false,

  /**
   * Copy of the category used for editing.
   * @property {Category}
   */
  categoryModel: null,
  // -------------------------------------------------------------------------
  // Methods
  /**
   * Show Inline Edit Panel
   */
  showInlinePanel: function () {
    var modelForEditing = this.get('category').copy();
    this.setProperties({
      'categoryModel': modelForEditing,
      'isPanelExpanded': true,
      'isEditingInline': true
    });
  }
});
