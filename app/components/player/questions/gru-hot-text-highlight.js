import QuestionComponent from './gru-question';
import {HotTextHighlightUtil} from 'gooru-web/utils/questions';

/**
 * Hot Text Highlight
 *
 * Component responsible for controlling the logic and appearance of a hot
 * text question inside of the {@link player/gru-question-viewer.js}
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments Ember/Component
 */
export default QuestionComponent.extend({
// -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-hot-text-highlight'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Select or unselect an item
     * @param {{id: number, text: string, selected: boolean}} item
     */
    markItem: function (item) {
      const component = this;
      if (!component.get("readOnly")){
        item.set("selected", !item.get("selected"));
        component.notifyEvents(component.getSelectedItems());
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * Generate items from question answer choices
   */
  initItems: function(){
    this.generateItems();
  }.on("didInsertElement"),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {{id: number, text: string}} items
   */
  items: null,
  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refresh items when the question changes
   */
  refreshItems: function(){
    this.generateItems();
  }.on("question.id"),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Notifies events based on selected items
   * @param {{id: number, text: string, selected: boolean}} selectedItems
   */
  notifyEvents: function (selectedItems) {
    const component = this;
    const questionUtil = component.get("questionUtil");
    const userAnswer = selectedItems.map(function(item){
      return item.get("text");
    });

    const correct = questionUtil.isCorrect(userAnswer);
    component.notifyAnswerChanged(userAnswer, correct);
    if (selectedItems.get("length")) {
      component.notifyAnswerCompleted(userAnswer, correct);
    }
    else {
      component.notifyAnswerCleared(userAnswer);
    }
  },

  /**
   * Generate phrase items from the first question answer text
   * It handle word and sentence variants, and it sets the 'items' component property accordingly
   */
  generateItems: function(){
    const component = this;
    const question = component.get("question");
    const util = HotTextHighlightUtil.create({question: question});
    component.set("items", util.getItems());
  },

  /**
   * Returns those items selected by the user
   * @returns {{id: number, text: string, selected: boolean}[]} selected items
   */
  getSelectedItems: function(){
      return this.get("items").filterBy("selected", true);
  }

});
