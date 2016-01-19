import Ember from 'ember';
import {MultipleChoiceUtil} from 'gooru-web/utils/questions';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions','gru-multiple-choice'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Question information
   * @property {Question} question
   */
  question: null,

});
