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
        location: window.location.host
      })
    ]
  }
});

/**
 * Resource model
 *
 * @typedef {Object} Content/Resource
 */
const ResourceModel = Ember.Object.extend(Validations,{

  /**
   * @property {String} url
   */
  url: null,

  /**
   * @property {Number} id
   */
  id: 0,

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
  isPublic: Ember.computed.equal("publishedStatus", "published")


});

ResourceModel.reopenClass({
  /**
   * Serializes the resource format to be API compliant
   * @param format
   * @returns {string}
   */
  serializeResourceFormat: function (format) {
    return format ? `${format}_resource` : undefined;
  },

  /**
   * Normalizes the resource format to be App compliant
   * @param format
   * @returns {string}
   */
  normalizeResourceFormat: function (format) {
    return format ? format.split("_")[0] : undefined;// i.e video_resource to video
  }
});

export default ResourceModel;
