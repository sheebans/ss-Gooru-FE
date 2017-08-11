import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'rubric', 'gru-category'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Enable edit inline
     */
    editInline: function() {
      this.showInlinePanel();
    },
    /**
     * Cancel edit inline
     */
    cancel: function() {
      let component = this;
      let category = component.get('category');
      if (category.get('isNew') && !category.get('title')) {
        component.sendAction('onCancelNewCategory', category);
      }
      this.setProperties({
        isPanelExpanded: false,
        isEditingInline: false
      });
    },
    /**
     *Copy category
     */
    copyCategory: function(category, index) {
      this.sendAction('onCopyCategory', category, index);
    },
    /**
     *Delete a category
     */
    deleteCategory: function(category) {
      this.sendAction('onDeleteCategory', category);
    },
    /**
     *Set if feedback is required
     */
    setFeedBack: function() {
      this.set(
        'category.requiresFeedback',
        !this.get('category.requiresFeedback')
      );
    },
    /**
     *Save category
     */
    saveCategory: function() {
      const component = this;
      let tempCategory = component.get('tempCategory');
      tempCategory.validate().then(function({ validations }) {
        if (validations.get('isValid')) {
          let category = component.get('category');
          category.setProperties(tempCategory);
          component.sendAction('onUpdateCategory', category);
          component.setProperties({
            isPanelExpanded: false,
            isEditingInline: false
          });
        }
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
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

    //Determinate if the device where the component is showing is a touch device in order to deactivate the tooltips
    var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
    if (isTouch) {
      component.$('.actions .item-actions button').tooltip('disable');
    }

    if (!this.get('category.title')) {
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
   * @property {Boolean} preview
   */
  preview: false,

  /**
   * Copy of the category used for editing.
   * @property {Category}
   */
  tempCategory: null,

  /**
   * Action to send when save is clicked
   * @property {String}
   */
  onUpdateCategory: null,

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Show Inline Edit Panel
   */
  showInlinePanel: function() {
    var modelForEditing = this.get('category').copy();
    this.setProperties({
      tempCategory: modelForEditing,
      isPanelExpanded: true,
      isEditingInline: true
    });
  }
});
