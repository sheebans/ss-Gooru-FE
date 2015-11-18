import DS from 'ember-data';
import ResourceModel from './resource';

export default ResourceModel.extend({

  type: DS.attr('number'),
  typeName: DS.attr('string'),
  singleCorrectAnswer: DS.attr('boolean'),
  questionText: DS.attr('string'),
  hints: DS.attr(),
  explanation: DS.attr('string'),
  answers: DS.hasMany('resource/answer')

});
