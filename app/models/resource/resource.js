import Ember from 'ember';
import DS from 'ember-data';

/**
 * Resource Model
 *
 * @typedef {Object} Resource
 */
export default DS.Model.extend({

  // Common Fields
  /**
   * Indicates the resoruce type. i.e video/youtube, assessment-question, image/png
   * @property {string} resource type
   */
  resourceType: DS.attr('string'),

  /**
   * Indicates the resource format. i.e image, text, video, interaction, webpage, question
   * @property {string} resource format
   */
  resourceFormat: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  thumbnail: DS.attr('string'),
  /**
   * @property {string} asset URI
   */
  assetUri: DS.attr('string'),

  /**
   * Folder path for the resource url
   * @property {string} folder
   */
  folder: DS.attr('string'),

  /**
   * Resource asset url, this is the actual resource content url
   * @property {string} folder
   */
  url: DS.attr('string'),

  mediaUrl: DS.attr('string'),
  narration: DS.attr('string'),
  order: DS.attr('number'),
  owner: DS.attr(),

  // Question Fields
  questionType: DS.attr('string'),
  text: DS.attr('string'),
  hints: DS.attr(),
  explanation: DS.attr('string'),
  answers: DS.hasMany('resource/answer'),

  thumbnailUrl: Ember.computed('thumbnail', function() {
    return (this.get('thumbnail') ? this.get('thumbnail') : '/assets/gooru/default-' + this.get('resourceType') + '.png');
  }),

  isQuestion: Ember.computed.equal('resourceFormat', 'question'),
  isMultipleChoice: Ember.computed.equal('questionType', 'MC'),
  isMultipleAnswer: Ember.computed.equal('questionType', 'MA'),
  isTrueFalse: Ember.computed.equal('questionType', 'T/F'),
  isOpenEnded: Ember.computed.equal('questionType', 'OE'),
  isHotSpotText: Ember.computed.equal('questionType', 'HS_TXT'),
  isHotSpotImage: Ember.computed.equal('questionType', 'HS_IMG'),
  isHotTextReoder: Ember.computed.equal('questionType', 'HT_RO'),
  isHotTextHighlight: Ember.computed.equal('questionType', 'HT_HL'),

  hasMedia: Ember.computed.bool('mediaUrl'),
  hasNarration: Ember.computed.bool('narration'),
  hasOwner: Ember.computed.bool('owner'),

  /**
   * Indicates if it is an image resource
   */
  isImageResource: Ember.computed("resourceType", function(){
    var resourceType = this.get("resourceType");
    return resourceType || resourceType.indexOf("image") >= 0;
  })


});
