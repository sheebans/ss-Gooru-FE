import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-completion-information-chart'],
  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){
     radialProgress(document.getElementById('div1'))
      .diameter(80)
      .value(78)
      .render();
  },
});
