import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  tagName: 'ol',
  classNames:['gru-student-performance-container','panel-group'],
  attributeBindings: ['role','aria-multiselectable'],
  role: 'tablist',
  'aria-multiselectable':'true',
  selectedOption: null,
  setUnitBreadcrumb:null,
  performances:null,
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    setUnitBreadcrumb: function(unit, unitIndex){
      if(unit){
        this.get('setUnitBreadcrumb')(unit, unitIndex);
      }else{
        this.get('setUnitBreadcrumb')();
      }

    }
  }

});
