import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  // Common Fields
  resourceType: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  thumbnail: DS.attr('string'),
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

  isQuestion: Ember.computed.equal('resourceType', 'question'),
  isMultipleChoice: Ember.computed.equal('questionType', 'MC'),
  isMultipleAnswer: Ember.computed.equal('questionType', 'MA'),
  isTrueFalse: Ember.computed.equal('questionType', 'T/F'),
  isOpenEnded: Ember.computed.equal('questionType', 'OE'),
  isFIB: Ember.computed.equal('questionType', 'FIB'),

  isHotSpotText: Ember.computed.equal('questionType', 'HS_TXT'),
  isHotSpotImage: Ember.computed.equal('questionType', 'HS_IMG'),
  isHotTextReoder: Ember.computed.equal('questionType', 'HT_RO'),
  isHotTextHighlight: Ember.computed.equal('questionType', 'HT_HL'),

  hasMedia: Ember.computed.bool('mediaUrl'),
  hasNarration: Ember.computed.bool('narration'),
  hasOwner: Ember.computed.bool('owner')


});
