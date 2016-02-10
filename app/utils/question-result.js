import Ember from 'ember';
import { average } from "gooru-web/utils/math";

/**
 * Utility methods to handle stats for QuestionResult instances
 */

/**
 * Average user reaction to the questions in the assessment
 * @param {QuestionResult[]} questionsResults
 * @prop {Number} averageReaction
 */
export function averageReaction(questionsResults) {
  let totals = stats(questionsResults);
  return totals.get("averageReaction");
}

/**
 * Number of questions answered correctly in this attempt
 * @param {QuestionResult[]} questionsResults
 * @prop {Number}
 */
export function correctAnswers(questionsResults) {
  let totals = stats(questionsResults);
  return totals.get("totalCorrect");
}

/**
 * Percentage of correct answers vs. the total number of questions
 * @param {QuestionResult[]} questionsResults
 * @prop {Number}
 */
export function correctPercentage(questionsResults) {
  let totals = stats(questionsResults);
  return totals.get("correctPercentage");
}
/**
 * Total number of seconds spent completing the current attempt
 * @param {QuestionResult[]} questionsResults
 * @prop {Number}
 */
export function totalTimeSpent(questionsResults) {
  let totals = stats(questionsResults);
  return totals.get("totalTimeSpent");
}

/**
 * Returns stats for a set of question results
 * @param {QuestionResult[]} questionResults
 * @returns {{ total: number, correct: number, incorrect: number, skipped: number, notStarted: number}}
 */
export function stats(questionResults) {
  let total = 0;
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;
  let notStarted = 0;
  let timeSpent = 0;
  let reactions = [];

  questionResults.forEach(function (item) {
    total++;
    correct += item.get("correct") ? 1 : 0;
    incorrect += item.get("incorrect") ? 1 : 0;
    skipped += item.get("skipped") ? 1 : 0;
    notStarted += item.get("notStarted") ? 1 : 0;
    timeSpent += item.get("timeSpent");
    reactions.push(item.get("reaction") ? item.get("reaction") : 0);
  });

  let completed = total - skipped - notStarted;

  return Ember.Object.create({
    total: total,
    totalCorrect: correct,
    correctPercentage: Math.round(correct / total * 100),
    totalIncorrect: incorrect,
    incorrectPercentage: Math.round(incorrect / total * 100),
    totalSkipped: skipped,
    skippedPercentage: Math.round(skipped / total * 100),
    totalNotStarted: notStarted,
    notStartedPercentage: Math.round(notStarted / total * 100),
    totalCompleted: completed,
    completedPercentage: Math.round(completed / total * 100),
    averageReaction: Math.round(average(reactions)),
    totalTimeSpent: timeSpent
  });
}

/**
 * Returns only completed results
 * @param {QuestionResult[]} questionsResults
 * @prop {QuestionResult[]}
 */
export function completedResults(questionsResults) {
  return questionsResults
    .filter(function (questionResult) {
      return !questionResult.get("skipped") && !questionResult.get("notStarted");
    });
}

/**
 * Sort results by submittedAt field, ascending
 * @param {QuestionResult[]} questionsResults
 * @prop {QuestionResult[]}
 */
export function sortResults(questionsResults) {
  return questionsResults.sortBy("submittedAt");
}




