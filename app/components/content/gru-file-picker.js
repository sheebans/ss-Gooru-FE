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

  classNames: ['content', 'gru-file-picker'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:enableButtons
     */
    prepareForSubmission(file) {
      this.set('selectedFile', file);
      this.get('onSelectFile')(file);
    },

    /**
     * @function actions:disableButtons
     */
    resetFileSelection() {
      this.set('selectedFile', null);
      this.get('onSelectFile')(null);
    }
  },

  init: function() {
    this._super(...arguments);
    this.set('filePickerErrors', Ember.A());
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Selected file
   * @prop {Object}
   */
  selectedFile: null,

  /**
   * Has a file been selected and loaded into the file picker?
   * @prop {Bool}
   */
  isFileLoaded: Ember.computed.notEmpty('selectedFile'),

  /**
   * List of error messages to present to the user for conditions that the loaded image does not meet
   * @prop {String[]}
   */
  filePickerErrors: null,

  /**
   * List of valid file extensions. Image file extensions are set by default.
   * @prop {String}
   */
  validFileExtensions: ".jpg,.jpeg,.gif,.png",


  // -------------------------------------------------------------------------
  // Observers

  resetPicker: Ember.observer('validFileExtensions', function() {
    // Clear any previous errors
    this.get('filePickerErrors').clear();
  })

});
