import Ember from 'ember';
import GruImagePicker from 'gooru-web/components/gru-image-picker'

export default GruImagePicker.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-image'],

  classNameBindings: ['isEditing:is-editing', 'image:has-image'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:resetImage
     */
    resetImage: function () {
      this.set('image', null);
      this.actions.resetPicker.call(this);
    }
  }

});
