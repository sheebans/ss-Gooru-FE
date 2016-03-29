import Ember from 'ember';
import GruImagePicker from 'gooru-web/components/gru-image-picker';

export default GruImagePicker.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-image'],

  classNameBindings: ['isEditing:is-editing:is-viewing', 'srcImage:has-src-image', 'editImage:has-edit-image'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:resetImage
     */
    resetImage: function () {
      this.set('editImage', null);
      this.actions.resetPicker.call(this);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Is the course being edited or not?
   * @property {Boolean}
   */
  isEditing: null,

  /**
   * @type {string} editImage - Edited image url
   */
  editImage: Ember.computed.alias('image'),

  /**
   * @type {string} srcImage - Initial image url
   */
  srcImage: null


});
