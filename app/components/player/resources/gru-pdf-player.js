import Ember from 'ember';

import Env from '../../../config/environment';

export default Ember.Component.extend(Env,{
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-pdf-player'],

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
    return Env['player'].pdfViewerUrl+"?startPage=1&endPage=&signedFlag=0"+"&oid="+this.get("resource.gooruOid")+"&appKey=beta"+"&url="+this.get("resource.assetUrl");
  }),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
