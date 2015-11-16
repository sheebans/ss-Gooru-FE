import DS from 'ember-data';

export default DS.Model.extend({

  answerText: DS.attr('string'),
  answerType: DS.attr('string'),
  sequence: DS.attr('number'),
  isCorrect: DS.attr('boolean')

});
