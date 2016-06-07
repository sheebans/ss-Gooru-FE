import Ember from 'ember';
import { AUDIENCES } from 'gooru-web/config/config';

/**
 * Audience component
 *
 * Component responsible for show the audience
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-audience'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Remove audience from active audience
     */
    removeAudience: function (audience) {
      audience.set('checked', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function() {
    this._super( ...arguments );
    this.set('editAudiences', this.getOptionsArray(AUDIENCES, this.get('srcSelectedAudiences')));
  },

  /**
   * Overwrites didUpdate hook
   */
  didUpdate: function() {
    this.$('.dropdown-menu.audience li label').on('click', function (e) {
      e.stopPropagation();
    });
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A}
   */
  editAudiences: null,

  /**
   * @type {Ember.A} editSelectedAudiences - Editable list of audiences selected for the course
   */
  editSelectedAudiences: null,

  /**
   * Is the course being edited or not?
   * @property {Boolean}
   */
  isEditing: null,

  /**
   * @type {Ember.A}
   */
  srcAudiences: Ember.computed('srcSelectedAudiences.[]', function () {
    return this.getOptionsArray(AUDIENCES, this.get('srcSelectedAudiences'));
  }),

  /**
   * @type {Ember.A} srcSelectedAudiences - Initial list of audiences selected for the course
   */
  srcSelectedAudiences: null,


  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observes if the selection has changed
   */
  updateSelectedAudiences: Ember.observer('editAudiences.@each.checked', function () {
    var selectedAudiences = this.get('editAudiences').filterBy('checked').map(function (audience) {
      return audience.get('value');
    });
    this.set('editSelectedAudiences', selectedAudiences);
  }),

  resetSelectedAudiences: Ember.observer('isEditing', function () {
    if (this.get('isEditing')) {
      this.set('editAudiences', this.getOptionsArray(AUDIENCES, this.get('srcSelectedAudiences')));
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Create a copy of an array of value-label objects and add an additional property
   * 'checked' to each one, where its value will depend on whether the object value is
   * present or not in the 'selectedOptions' array (list of values)
   * @param {Object[]} allOptions - Array of objects
   * @param {Number[]} selectedOptions - Array of values
   */
  getOptionsArray: function(allOptions, selectedOptions) {
    return allOptions.slice(0).map(function (object) {
      object.checked = selectedOptions.indexOf(object.value) > -1;
      return Ember.Object.create(object);
    });
  }

});
