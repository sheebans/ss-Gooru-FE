import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  // Common Fields
  resourceType: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  imageUrl: DS.attr('string'),
  order: DS.attr('number'),

  isQuestion: Ember.computed.equal('resourceType', 'question'),

  // Question Fields
  questionType: DS.attr('string'),
  text: DS.attr('string'),
  hints: DS.attr(),
  explanation: DS.attr('string'),
  answers: DS.hasMany('resource/answer'),

  isMultipleChoice: Ember.computed.equal('questionType', 'MC'),
  isMultipleAnswer: Ember.computed.equal('questionType', 'MA'),
  isTrueFalse: Ember.computed.equal('questionType', 'T/F'),
  isOpenEnded: Ember.computed.equal('questionType', 'OE'),
  isHotText: Ember.computed.equal('questionType', 'HS_TXT'),
  isHotImage: Ember.computed.equal('questionType', 'HS_IMG')



});
