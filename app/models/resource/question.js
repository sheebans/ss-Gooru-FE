import DS from 'ember-data';
import ResourceModel from './resource';

export default ResourceModel.extend({

  questionType: DS.attr('string'),
  text: DS.attr('string'),
  hints: DS.attr(),
  explanation: DS.attr('string'),
  answers: DS.hasMany('resource/answer')

});
