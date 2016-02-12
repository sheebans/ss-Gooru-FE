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
export function stats(questionResults){
  let total = questionResults.length;
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;
  let started = 0;
  let timeSpent = 0;
  let reactions = [];

  questionResults.forEach(function(item){
    correct += item.get("correct") ? 1 : 0;
    incorrect += item.get("incorrect") ? 1 : 0;
    skipped += item.get("skipped") ? 1 : 0;
    started += item.get("started") ? 1 : 0;
    timeSpent += item.get("timeSpent");

    if (item.get('reaction')) {
      reactions.push(item.get("reaction"));
    }
  });

  let notStarted = total - started;
  let completed = correct + incorrect; //incorrect should include skipped ones

  return Ember.Object.create({
    total: total,
    totalCorrect: correct,
    correctPercentage: Math.round(correct / completed * 100),
    correctPercentageFromTotal: Math.round(correct / total * 100), //percentage including not started
    totalIncorrect: incorrect,
    incorrectPercentage: Math.round(incorrect / completed * 100),
    incorrectPercentageFromTotal: Math.round(incorrect / total * 100), //percentage including not started
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
  return questionsResults.filter(function (questionResult) {
      return questionResult.get("completed");
    });
}

/**
 * Returns only answered results
 * @param {QuestionResult[]} questionsResults
 * @prop {QuestionResult[]}
 */
export function answeredResults(questionsResults) {
  return questionsResults.filter(function (questionResult) {
      return questionResult.get("answered");
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

/**
 * Returns valid user answers
 * @param {QuestionResult[]} questionResults
 * @return {*} user answers
 */
export function userAnswers(questionResults){
  let answered = answeredResults(questionResults);
  let sorted = sortResults(answered); //sort results by submitted at
  return sorted.map(function(questionResult){
    return questionResult.get("userAnswer");
  });
}




