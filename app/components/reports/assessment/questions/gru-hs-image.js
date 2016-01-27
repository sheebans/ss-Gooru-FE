import Ember from 'ember';
import {HotSpotImageUtil} from 'gooru-web/utils/questions';
import QuestionMixin from 'gooru-web/mixins/reports/assessment/questions/question';

/**
 * Multiple answer
 *
 * Component responsible for show the hot spot image, which option is selected
 * and the correct option.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(QuestionMixin, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-hs-image'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  answers: Ember.computed("question", function () {
    let component = this;
    let question = component.get("question");
    let questionUtil = component.getQuestionUtil(question);
    let userAnswers = component.get("userAnswer");

    if (component.get("showCorrect")){
      userAnswers = questionUtil.getCorrectAnswer();
    }

    let answers = question.get("answers");
    return answers.map(function(answer){
      let userAnswer = userAnswers.filterBy("id", answer.get("id"));
      let userAnswerCorrect = questionUtil.isAnswerChoiceCorrect(userAnswer.get("firstObject.id"));
      console.log('userAnswerCorrect',userAnswerCorrect);

      return {
        image: answer.get("image"),
        selected: userAnswer.get("firstObject.selection"),
        class: (userAnswerCorrect)?'correct':'incorrect'
      };
    });
  }),

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Returns the question util for the question
   * @param question
   */
  getQuestionUtil: function(question){
    return HotSpotImageUtil.create({question: question});
  }
});
