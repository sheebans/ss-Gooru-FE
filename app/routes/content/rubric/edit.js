import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    editing:{},
    editingContent:{
      refreshModel: true
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} rubricService
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    const route = this;
    return route.get('rubricService').getRubric(params.rubricId)
      .then(function(rubric) {
        const isEditing = params.editing;
        const editingContent = params.editingContent ? params.editingContent : null;
        return Ember.RSVP.hash({
          rubric:rubric,
          isEditing: !!isEditing,
          editingContent: editingContent
        });
      });
  },

  setupController(controller, model) {
    controller.set('rubric', model.rubric);
    controller.set('isEditing', model.isEditing);
    controller.set('editingContent', model.editingContent);
  }
});
