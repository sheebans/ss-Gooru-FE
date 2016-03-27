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
  editAudiences: Ember.computed('srcSelectedAudiences.length', function () {
    return AUDIENCES.slice(0).map(function (object) {
      object.checked = this.get('srcSelectedAudiences').indexOf(object.value) > -1;
      return Ember.Object.create(object);
    }.bind(this));
  }),

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
  srcAudiences: Ember.computed('srcSelectedAudiences.length', function () {
    return AUDIENCES.slice(0).map(function (object) {
      object.checked = this.get('srcSelectedAudiences').indexOf(object.value) > -1;
      return Ember.Object.create(object);
    }.bind(this));
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
  })

});
