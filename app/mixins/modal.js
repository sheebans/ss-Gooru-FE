import Ember from 'ember';

export default Ember.Mixin.create({

  modal: Ember.Object.create({
    isVisible: false,
    name: null,
    model: null,
    target: null,
    activeChannel: null,
    'component-class':null
  }),

  actions: {
    showModal: function(componentName, componentModel, actionsTarget, activeChannel, componentClass) {
      this.get('modal').setProperties({
          isVisible: true,
          name: componentName,
          model: componentModel,
          target: actionsTarget,
          activeChannel: activeChannel,
          'component-class': componentClass
      });
    }
  }

});
