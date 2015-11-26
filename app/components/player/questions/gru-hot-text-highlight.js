import Ember from 'ember';
import QuestionComponent from './gru-question';

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
     * @param {{id: number, text: string, selected: bool}} item
     */
    markItem: function (item) {
      const component = this;
      item.set("selected", !item.get("selected"));
      component.notifyEvents(component.getSelectedItems());
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
   * @param {{id: number, text: string, selected: bool}} selectedItems
   */
  notifyEvents: function (selectedItems) {
    const component = this;
    component.notifyAnswerChanged(selectedItems);
    if (selectedItems.get("length")) {
      component.notifyAnswerCompleted(selectedItems);
    }
    else {
      component.notifyAnswerCleared(selectedItems);
    }
  },

  /**
   * Correct items from the text, correct items are wrapped by []
   * i.e La casa es de [colo] pero el [teco] es azul
   * @param {string} text
   * @returns {{id: number, text: string, selected: bool}} items
   */
  getCorrectItems: function (text) {
    const component = this,
      regex = /(\[.*?])/gm;

    var items = Ember.A();
    var match = regex.exec(text);
    while (match != null) {
      items.pushObject(match[0]);
      match = regex.exec(text);
    }

    return component.toItems(items);
  },

  /**
   * Gets items based on text format.
   * This methods creates an item for each word in the text, it removes []
   * i.e La casa es de [colo] pero el [teco] es azul
   * @param {string} text
   * @returns {{id: number, text: string, selected: bool}} items
   */
  getWordItems: function (text) {
    const component = this,
      words = Ember.A(text.split(" ")),
      items = component.toItems(words);

    return items;
  },

  /**
   * Gets items based on text format
   * Each text before, after and in between [] are considered sentences
   * @param {string} text i.e Sentence 1 [Sentence 2] Sentence 3 with any text here [Sentence 4] Sentence 5
   *
   * @returns {{id: number, text: string, selected: bool}} items
   */
  getSentenceItems: function (text) {
    const component = this,
      textBlocks = Ember.A(text.split("[")); //split by [

    var items = Ember.A();
    textBlocks.forEach(function(textBlock){
      items.pushObjects(textBlock.split("]")); //now split by ]
    });

    return component.toItems(items);
  },

  /**
   * Transforms the text so it is compliant with hot text highlight question.
   * It removes the initial/wrapping <p> tag if available
   * @param {string} text
   * @returns {string}
   */
  transformText: function(text){
    const regex = /^<p>(.*)<\/p>$/gm,
      match = regex.exec(text);
    return (match) ? match[1].trim() : text;
  },

  /**
   * Transforms a list of string into item objects, it trims the texts and removes []
   * @param {string[]} textList
   *
   * @returns {{id: number, text: string, selected: bool}} items
   */
  toItems: function (textList) {
    const items = textList.map(function (text, index) {
        return Ember.Object.create({
          id: index,
          text: text.replace("[", "").replace("]", "").trim(),
          selected: false
        });
      }),
      result = items.filter(function (item) {
        return item.text || item.length;
      });
    return result;
  },

  /**
   * Generate phrase items from the first question answer text
   * It handle word and sentence variants, and it sets the 'items' component property accordingly
   */
  generateItems: function(){
    const component = this,
      question = component.get("question"),
      answers = question.get("answers");

    var items = Ember.A();
    if (question.get("hasAnswers")) {
      const answer = answers.get("firstObject"),
        text = component.transformText(answer.get("text"));

      if (question.get("isHotTextHighlightWord")) {
        items = component.getWordItems(text);
      }
      else {
        items = component.getSentenceItems(text);
      }
    }

    component.set("items", items);
  },

  /**
   * Returns those items selected by the user
   * @returns {{id: number, text: string, selected: bool}[]} selected items
   */
  getSelectedItems: function(){
      return this.get("items").filterBy("selected", true);
  }

});
