import DS from 'ember-data';

export default DS.Model.extend({

  text: DS.attr('string'),
  answerType: DS.attr('string'),
  order: DS.attr('number'),
  isCorrect: DS.attr('boolean')

});
