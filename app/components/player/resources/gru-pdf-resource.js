import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-pdf-resource'],
  attributeBindings: ['resourceHeight:style'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource} the resource
   */
  resource: null,

  pdfURL:Ember.computed('resource.assetUrl',function(){
    return this.get("resource.assetUrl");
  }),

  /**
   * @property {Number} the calculated resource content height
   */

  calculatedResourceContentHeight: null,

  /**
   * @property {string} bind the height css style for the component
   */
  resourceHeight: Ember.computed("calculatedResourceContentHeight", function(){
    var height = this.get('calculatedResourceContentHeight');
    return new Ember.Handlebars.SafeString("height: " + height + "px");
  })


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
