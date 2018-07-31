import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['routesuggestion-coursemap'],
  actions: {
    routeAction: function(actiontype) {
      this.attrs.routeSuggestAction(actiontype);
    },
    selectUnit: function() {
      //ToDo: Add impl on player
    }
  },

  /**
   * @property {isEnablePlayer}
   * Property to show/hide player icon in suggestion coursemap
   */
  isEnablePlayer: true,

  taxonomyList: [
    {
      code: 'D2.Civ.1.K-2',
      frameworkCode: 'C3',
      id: 'C3.K12.SS-K.2-CIV-01',
      parentTitle: 'Social Sciences',
      title: 'Describe roles and responsibilities of people in authority.',
      taxonomyLevel: 'standard'
    },
    {
      code: 'D2.Civ.1.K-3',
      frameworkCode: 'C3',
      id: 'C3.K12.SS-K.2-CIV-01',
      parentTitle: 'Social Sciences',
      title: 'Describe roles and responsibilities of people in authority.',
      taxonomyLevel: 'standard'
    },
    {
      code: 'D2.Civ.1.K-4',
      frameworkCode: 'C3',
      id: 'C3.K12.SS-K.2-CIV-01',
      parentTitle: 'Social Sciences',
      title: 'Describe roles and responsibilities of people in authority.',
      taxonomyLevel: 'standard'
    }
  ]
});
