import Ember from 'ember';
import i18nMixin from '../mixins/i18n';

/**
 * @typedef {object} AppDropdown
 */
export default Ember.Component.extend(i18nMixin, {

  /**
   * @property {DropdownItem[]} dropdown items
   */
  items: Ember.A(),

  /**
   * @property {string} dropdown placeholder
   */
  placeholder: "Select items",

  /**
   * @property {string} dropdown prompt
   */
  prompt: null,

  /**
   *
   * @property {string} size class
   * @see bootstrap button dropdown
   */
  "btn-group-size": 'btn-group-lg',

  /**
   * @property {string} button type class
   */
  "btn-type": 'btn-primary',

  /**
   * @property {bool} indicates if can select multiple
   */
  multiple: false,

  "keep-open" : function() {
    return this.get("multiple") ? 'keep-open-yes' : 'keep-open-no';
  }.property("multiple"),

  /**
   * @property {bool} true when selection were made
   */
  selectedItems: function () {
    return this.get("items").filterBy("selected", true);
  }.property("items.@each.selected"),


  /**
   * @property {string} selection text
   */
  selectedText: function () {
    const component = this,
      selectedItems = component.get("selectedItems"),
      names = selectedItems.map(function (item) {
        return item.get("label");
      }).toArray().join(",");

    return (!names.length)? component.get("placeholder") : names;

  }.property("selectedItems.[]"),

  /**
   * This is triggered when the drop down selection changes
   * @property {string} on selection action
   */
  onChangeAction: "onChange",

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function(){
    const component = this,
      element = component.$(component.get("element"));

    var canClose = true;
    element.find('.keep-open-yes').on({
      "click":             function(e) { canClose = !component.$(e.target).hasClass('item'); },
      "hide.bs.dropdown":  function() { return canClose; }
    });
  },

  /**
   * Marks all items as non selected
   */
  unselectAll: function(){
    this.get("items").forEach(function(item){
      item.set("selected", false);
    });
  },

  actions: {

    onItemSelected: function (item) {
      const component = this;

      if (!component.get("multiple")){
        component.unselectAll();
      }
      item.set("selected", !item.get("selected"));

      if (component.get("onChangeAction")) {
        component.sendAction("onChangeAction", component.get("selectedItems"));
      }
    }
  }


});
