import { average } from "gooru-web/utils/math";

/**
 * Utility methods to handle stats for QuestionResult and QuestionDetailsResult instances
 */

/**
 * Average user reaction to the questions in the assessment
 * @param {QuestionDetailsResult[]|QuestionResult[]} questionsResults
 * @prop {Number} averageReaction
 */
export function averageReaction(questionsResults) {
  var reactions = questionsResults.map(function (questionResult) {
    return questionResult.get("reaction");
  });
  return Math.round(average(reactions));
}

/**
 * Number of questions answered correctly in this attempt
 * @param {QuestionDetailsResult[]|QuestionResult[]} questionsResults
 * @prop {Number}
 */
export function correctAnswers(questionsResults){
  return questionsResults.filterBy("correct", true).get("length");
}
/**
 * Percentage of correct answers vs. the total number of questions
 * @param {QuestionDetailsResult[]|QuestionResult[]} questionsResults
 * @param {number} correctAnswers
 * @prop {Number}
 */
export function correctPercentage(questionsResults, correctAnswers){
  var totalQuestions = questionsResults.get("length");
  var percentage = 0;

  if (totalQuestions) {
    percentage = Math.round(correctAnswers / totalQuestions * 100);
  }
  return percentage;
}
/**
 * Total number of seconds spent completing the current attempt
 * @param {QuestionDetailsResult[]|QuestionResult[]} questionsResults
 * @prop {Number}
 */
export function totalTimeSpent(questionsResults){
  var results = questionsResults;
  var time = 0;

  if (results.get("length")) {
    time = results.map(function (questionResult) {
      return questionResult.get("timeSpent");
    })
      .reduce(function (a, b) {
        return a + b;
      });
  }
  return time;
}



