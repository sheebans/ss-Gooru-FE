import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  //TO DO We need use i18n for error messages
  url: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter a valid URL.'
      }),
      validator('format', {
        type: 'url',
        message: 'Invalid URL.'
      }),
      validator('host',{
        message:'Resources can not be Gooru\'s URLs.',
        location: window.location.hostname
      })
    ]
  },
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter a resource title.'
      })
    ]
  }
});

/**
 * Resource model
 *
 * @typedef {Object} Resource
 */
const ResourceModel = Ember.Object.extend(Validations,{


  /**
   * @property {Number} id
   */
  id: 0,

  /**
   * @property {String} url
   */
  url: null,

  /**
   * @property {String} thumbnailUrl
   */
  thumbnailUrl: null,

  /**
   * @property {Boolean} isEditing
   */
  isEditing: false,

  /**
   * @property {string}
   */
  format: null,

  /**
   * @property {string}
   */
  title: null,

  /**
   * @property {string}
   */
  description: null,

  /**
   * @property {string} published|unpublished|requested
   */
  publishStatus: null,

  /**
   * @property { Content/User }
   */
  owner: null,

  /**
   * @property {Boolean} isPublic
   */
  isPublic: Ember.computed.equal("publishedStatus", "published"),

  /**
   * @property { { code: string, description: string }[] }
   */
  standards: null


});

ResourceModel.reopenClass({

  /**
   * Serializes the resource format to be API compliant
   * @param format
   * @returns {string}
   * TODO move to util
   */
  serializeResourceFormat: function (format) {
    return format ? `${format}_resource` : undefined;
  },

  /**
   * Converts several app format values to api values
   * @param {string[]} values values to format
   * TODO move to util
   */
  serializeAllResourceFormat: function(values){
    const model = this;
    return values.map(function(format){
      return model.serializeResourceFormat(format);
    });
  },


  /**
   * Normalizes the resource format to be App compliant
   * @param format
   * @returns {string}
   * TODO move to util
   */
  normalizeResourceFormat: function (format) {
    return format ? format.split("_")[0] : undefined;// i.e video_resource to video
  }
});

export default ResourceModel;
