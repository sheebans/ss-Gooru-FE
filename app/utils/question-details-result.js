import { average } from "gooru-web/utils/math";

/**
 * Average user reaction to the questions in the assessment
 * @prop {Number} averageReaction
 */
export function averageReaction(questionsResults) {
  var reactions = questionsResults.map(function (questionResult) {
    return questionResult.reaction;
  });
  return Math.round(average(reactions));
}

/**
 * Number of questions answered correctly in this attempt
 * @prop {Number}
 */
export function correctAnswers(questionsResults){
  var results = questionsResults;
  var correct = 0;

  if (results.length) {
    correct = results.map(function (questionsResult) {
      return questionsResult.correct ? 1 : 0;
    })
      .reduce(function (a, b) {
        return a + b;
      });
  }
  return correct;
}
/**
 * Percentage of correct answers vs. the total number of questions
 * @prop {Number}
 */
export function correctPercentage(questionsResults,correctAnswers){
  var totalQuestions = questionsResults.length;
  var percentage = 0;

  if (totalQuestions) {
    percentage = Math.round(correctAnswers / totalQuestions * 100);
  }
  return percentage;
}
/**
 * Total number of seconds spent completing the current attempt
 * @prop {Number}
 */
export function totalTimeSpent(questionsResults){
  var results = questionsResults;
  var time = 0;

  if (results.length) {
    time = results.map(function (questionResult) {
      return questionResult.timeSpent;
    })
      .reduce(function (a, b) {
        return a + b;
      });
  }
  return time;
}



