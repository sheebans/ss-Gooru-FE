import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Ember.Service} Service to configuration properties
   */
  configurationService: Ember.inject.service('configuration'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-pdf-resource'],

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

    const configuration = this.get('configurationService.configuration');

    if(configuration.get("player.resources.pdf.googleDriveEnable"))
    {
      return configuration.get("player.resources.pdf.googleDriveUrl") + this.get("resource.assetUrl") + '&embedded=true';
    }
    else {
      return this.get("resource.assetUrl");
    }
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
    const heightString = height > 0 ? `${height}px` : '100%';
    return new Ember.Handlebars.SafeString(`height: ${heightString}`);
  })


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
