import Ember from "ember";
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Copy value
 *
 * Component responsible for copying a value to the clipboard
 */
export default Ember.Component.extend(ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  tagName: 'span',
  classNames:['gru-copy-value'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function () {
    let clipboard = new Clipboard('.copy-btn', {
      text: function () {
        return $('#valueToCopy').val();
      }
    });

    $('.copy-btn').tooltip({placement:'right'});

    clipboard.on('success', function(e) {
      $('.copy-btn').tooltip('hide');
    });

  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {String} value to be copied
   */
  value: null,

  /**
   * @property {String} text to be displayed in the tooltip
   */
  tooltip: null,



  // -------------------------------------------------------------------------
  // Methods

});
