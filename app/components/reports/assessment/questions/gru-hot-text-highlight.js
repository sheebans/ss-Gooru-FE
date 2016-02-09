import Ember from 'ember';
import {HotTextHighlightUtil} from 'gooru-web/utils/questions';
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
  items: Ember.computed("question", function () {
    let component = this;
    let question = component.get("question");
    let questionUtil = component.getQuestionUtil(question);
    let correctAnswers = questionUtil.getCorrectAnswer();
    let showCorrect = component.get("showCorrect");

    let userAnswer = showCorrect ? correctAnswers : component.get("userAnswer");
    let items = questionUtil.getItems();
    items.forEach(function(item){
      let text = item.get("text");
      let selected = userAnswer.contains(text);
      let correct = selected && questionUtil.isAnswerChoiceCorrect(text);

      item.set("selected", selected);
      item.set("correct", correct);
    });

    return items;
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Returns the question util for the question
   * @param question
   */
  getQuestionUtil: function(question){
    return HotTextHighlightUtil.create({question: question});
  }
});
