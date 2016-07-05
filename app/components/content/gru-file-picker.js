import Ember from 'ember';

/**
 * File picker
 *
 * Component responsible for letting the user select a file using a
 * system file browser dialog. Only certain file types are allowed;
 * otherwise an error is presented to the user.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-file-picker'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:enableButtons
     */
    prepareForSubmission(file) {
      this.set('isFileInputEmpty', false);
      this.set('fileSelected', file);
    },

    /**
     * @function actions:disableButtons
     */
    resetFileSelection() {
      this.set('isFileInputEmpty', true);
    },

    /**
     * @function actions:resetPicker
     */
    resetPicker() {
      // Reset the input element in the file picker
      // http://stackoverflow.com/questions/1043957/clearing-input-type-file-using-jquery/13351234#13351234
      var $fileInput = this.$('input[type="file"]');
      $fileInput.wrap('<form>').closest('form').get(0).reset();
      $fileInput.unwrap();

      // Prompt the file picker to reset the image preview
      this.set('isFileInputEmpty', true);
    }
  },

  init: function() {
    this._super(...arguments);
    this.set('filePickerErrors', Ember.A());
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Image for submission
   * @prop {Object}
   */
  fileSelected: null,

  /**
   * Has a file been selected and loaded into the file picker?
   * @prop {Bool}
   */
  isFileLoaded: Ember.computed.not('isFileInputEmpty'),

  /**
   * Has the file picker's input field been reset?
   * @prop {Bool}
   */
  isFileInputEmpty: true,

  /**
   * List of error messages to present to the user for conditions that the loaded image does not meet
   * @prop {String[]}
   */
  filePickerErrors: null,

  /**
   * List of valid file extensions. Image file extensions are set by default.
   * @prop {String}
   */
  validFileExtensions: ".jpg,.jpeg,.gif,.png"

});
