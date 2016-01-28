import Ember from 'ember';
import {HotSpotImageUtil} from 'gooru-web/utils/questions';
import QuestionMixin from 'gooru-web/mixins/reports/assessment/questions/question';

// constants
import {DEFAULT_IMAGES} from 'gooru-web/config/config';

/**
 * Hot spot image
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
      let userAnswerCorrect = false;
      let selected = false;
      if (userAnswers.contains(answer.get("id"))){
        userAnswerCorrect = questionUtil.isAnswerChoiceCorrect(answer.get("id"));
        selected = true;
      }
      return {
        image: answer.get('image') ? answer.get('image') : DEFAULT_IMAGES.QUESTION_PLACEHOLDER_IMAGE,
        selected: selected,
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
