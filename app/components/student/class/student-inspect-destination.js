import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['student-inspect-destination'],

  route0Service: Ember.inject.service('api-sdk/route0'),

  didInsertElement() {
    let component = this;
    if (component.get('isRoute0')) {
      component.fetchRout0Contents();
    }
  },

  didRender() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  actions: {
    onRoute0Accept() {
      let component = this;
      let action = 'accepted';
      component.updateRoute0Action(action);
    },

    onRoute0Reject() {
      let component = this;
      let action = 'rejected';
      component.updateRoute0Action(action);
    },

    onMoveNext(curStep) {
      let component = this;
      component.sendAction('onMoveNext', curStep);
    },

    onToggleRoute0View() {
      let component = this;
      if (component.get('isRoute0ExpandedView')) {
        component.$('.route0-body').hide(1000);
      } else {
        component.$('.route0-body').show(1000);
      }
      component.toggleProperty('isRoute0ExpandedView');
    }
  },

  isRoute0: false,

  isRoute0Pending: Ember.computed('route0Contents', function() {
    let component = this;
    let route0Contents = component.get('route0Contents');
    return route0Contents ? route0Contents.status === 'pending': false;
  }),

  isRoute0ExpandedView: false,

  fetchRout0Contents() {
    let component = this;
    let courseId = component.get('courseId');
    let classId = component.get('classId');
    let route0Service = component.get('route0Service');
    let filters = {
      courseId, classId
    };
    return Ember.RSVP.hash({
      route0Contents: Ember.RSVP.resolve(route0Service.fetchInClass(filters))
    })
      .then(({route0Contents}) => {
        component.set('route0Contents', route0Contents);
      });
  },

  updateRoute0Action(status) {
    let component = this;
    let classId = component.get('classId');
    let courseId = component.get('courseId');
    let actionData = {
      classId,
      courseId,
      status
    };
    let route0Service = component.get('route0Service');
    return Ember.RSVP.hash({
      route0ActionStatus: Ember.RSVP.resolve(route0Service.updateRouteAction(actionData))
    });
  }
});
