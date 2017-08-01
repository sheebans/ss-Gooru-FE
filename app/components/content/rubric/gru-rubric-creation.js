import Ember from 'ember';
import { UPLOADABLE_TYPES } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'rubric', 'gru-rubric-creation'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service('api-sdk/media'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /***
     * Select tab option
     */
    selectOption: function(type) {
      this.set('showFromWeb', type === 'fromWeb');
      this.set('showFromComputer', type === 'fromComputer');
      // Clean inputs and properties
      this.set('rubric.url', null);
      this.set('rubric.file', null);
      this.set('resource.url', null);
      this.$('.gru-file-picker input').val(null);
      this.$('.gru-input.url input').val(null);
    },

    /***
     * Select file
     */
    selectFile: function(file) {
      this.set('rubric.file', file);
      if (file) {
        this.handleResourceUpload(this.get('rubric')).then(rubric => {
          this.set('rubric', rubric);
          let resource = this.get('resource');
          resource.set('url', rubric.get('url'));
        });
      }
    },
    /***
     * Add URL
     */
    addURL: function(url) {
      this.get('rubric').validate().then(({ validations }) => {
        if (validations.get('isValid') && this.get('showFromWeb')) {
          // For preview to work
          let resource = this.get('resource');
          resource.set('url', url);
        }
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Resource used for the preview url component
   * @property {Object}
   */
  resource: Ember.Object.create({}),

  /**
   * Rubric being edited
   * @property {Rubric}
   */
  rubric: null,

  /**
   * Indicates when then show from web option is visible
   * @property {boolean}
   */
  showFromWeb: true,

  /**
   * Indicates when show from computer is visible
   * @property {boolean}
   */
  showFromComputer: false,

  /**
   * @type {String} list of all valid extension per gooru-web/config/config#UPLOAD_TYPES
   */
  validExtensions: Ember.computed(function() {
    var extensions = UPLOADABLE_TYPES.map(
      typeObject => typeObject.validExtensions
    );
    return extensions.join(' ');
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Create a resource (url/upload)
   * @param {Resource}
   * @return {Promise.<Resource>}
   */
  handleResourceUpload: function(rubric) {
    return new Ember.RSVP.Promise(resolve => {
      this.get('mediaService')
        .uploadContentFile(rubric.file)
        .then(function(filename) {
          rubric.set('url', filename);
          resolve(rubric);
        });
    });
  }
});
