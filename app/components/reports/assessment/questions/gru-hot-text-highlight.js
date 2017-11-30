import Ember from 'ember';
import QuestionMixin from 'gooru-web/mixins/reports/assessment/questions/question';

/**
 * Hot Text Highlight
 *
 * Component responsible for controlling the logic and appearance of an Hot Text Highlight
 * question inside of the assessment report.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(QuestionMixin, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-hot-text-highlight'],

  // -------------------------------------------------------------------------
  // Properties
  items: Ember.computed('question', function() {
    let component = this;
    let question = component.get('question');
    let questionUtil = component.getQuestionUtil(question);
    let correctAnswers = questionUtil.getCorrectAnswer();
    let showCorrect = component.get('showCorrect');
    if (!component.get('userAnswer') == null) {
      component.get('userAnswer').forEach(function(userAns) {
        userAns.text = `${userAns.text},`;
        userAns.index = userAns.index - 3;
      });
    }
    let userAnswer = showCorrect ? correctAnswers : component.get('userAnswer');
    let items = questionUtil.getItems();
    items.forEach(function(item) {
      let selected = !!userAnswer.findBy('index', item.get('index'));
      item.set('selected', selected);
      item.set('correct', !!correctAnswers.findBy('index', item.get('index')));
      //getItems already return if it is correct or not
    });
    return items;
  })

  // -------------------------------------------------------------------------
  // Methods
});
