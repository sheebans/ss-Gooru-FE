import Ember from 'ember';
import { MultipleChoiceUtil } from 'gooru-web/utils/questions';
import { completedResults, sortResults } from 'gooru-web/utils/question-result';
/**
 * Multiple Choice Performance Component
 *
 * Component responsible for displaying the question performance information for several students
 *
 * @module
 * @augments Ember/Component
 */
export default Ember.Component.extend({


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {User[]} students
   */
  students: null,

  /**
   * @property {QuestionResult[]} question results
   */
  studentsResults: null,

  /**
   * @property {QuestionResult[]} question results
   */
  questionResults: Ember.computed("studentsResults.[]", function(){
    return this.get("studentsResults").map(function(studentResult){
      return studentResult.get("questionResult");
    });
  }),

  /**
   * @property {Resource} question
   */
  question: null,

  /**
   * Convenience structure to display the answers distribution
   * @property {*} answer distributions
   */
  answersData: Ember.computed("studentsResults.[]", function(){
    const component = this;
    const questionUtil = MultipleChoiceUtil.create({ question: component.get("question") });

    const userAnswers = component.get("userAnswers");
    const distribution = questionUtil.distribution(userAnswers);

    const answersData = Ember.A([]);
    distribution.forEach(function(answerDistribution){
      let userAnswer = answerDistribution.get("answer");
      answersData.addObject(Ember.Object.create({
        correct: questionUtil.isCorrect(userAnswer),
        userAnswer: userAnswer,
        percentage: answerDistribution ? answerDistribution.get("count") : 0,
        students: Ember.A([])
      }));
    });

    return answersData;
  }),

  /**
   * Possible answers for this question type
   * @property {number[]} possible answers
   */
  answers: Ember.computed(function(){
    return this.get("question.answers").sortBy("order").map(function(answer){
      return answer.get("id");
    });
  }),

  /**
   * Returns valid user answers
   * @return {number[]} i.e [1, 10, 20, 40]
   */
  userAnswers: Ember.computed(function(){
    let completed = completedResults(this.get("questionResults"), true);
    let sorted = sortResults(completed);
    return sorted.map(function(questionResult){
      return questionResult.get("userAnswer");
    });
  })

  // -------------------------------------------------------------------------
  // Methods

});
