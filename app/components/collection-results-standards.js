import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * @property {object} Collection item
   */
  collection: null,

  /**
   * @property {number} quantityTooltips
   */
  quantityTooltips: null,

  /**
   * @property {string} tooltipStandards
   */
  tooltipStandards: '',

  /**
   * Selected all standards for each item
   * @property {array}
   */
  standards: null,

  /**
   * Standards popup identifier
   * @property {string}
   */
  standardsPopupIdentifier: function (){
    return "standards-popup_" + this.get("collection.id");
  }.property("collection.id"),

  /**
   * Selected collection results fillStandardsTooltipSection
   * @property {array}
   */
  fillStandardsTooltipSection: function () {
    var standards = this.get("standards");
    var itemsStandards = Ember.A();
    var tooltipsStand = '';
    var count = 0;
    var itemName = '';

    if (standards) {
      standards.forEach(function (item, index) {
        if (index < 2) {
          itemsStandards.addObject(item);
        }
        else {
          itemName = '<p>' + item.get('name') + '</p>';
          count += 1;
          tooltipsStand = tooltipsStand + itemName;
        }
      });

      this.set('tooltipStandards', tooltipsStand);
      if (count > 0) {
        this.set('quantityTooltips', count);
      }
    }

    return itemsStandards;

  }.property()

});
