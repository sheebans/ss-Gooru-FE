import Ember from 'ember';

export default Ember.Mixin.create({

  modal: Ember.Object.create({
    isVisible: false,
    name: null,
    target: null,
    activeChannel: null
  }),

  actions: {
    showModal: function(componentName, actionsTarget, activeChannel) {
      this.get('modal').setProperties({
          isVisible: true,
          name: componentName,
          target: actionsTarget,
          activeChannel: activeChannel
      });
    }
  }

});
