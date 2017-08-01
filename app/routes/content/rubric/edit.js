import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import Rubric from 'gooru-web/models/rubric/rubric';
import EditRubricValidations from 'gooru-web/validations/edit-rubric';

export default Ember.Route.extend(PrivateRouteMixin, {
  queryParams: {
    editing: {},
    editingContent: {
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

  model: function(params) {
    const route = this;
    const RurbicValidation = Rubric.extend(EditRubricValidations);
    return route
      .get('rubricService')
      .getRubric(params.rubricId)
      .then(function(rubric) {
        const isEditing = params.editing;
        const editingContent = params.editingContent
          ? params.editingContent
          : null;
        return Ember.RSVP.hash({
          rubric: RurbicValidation.create(rubric),
          isEditing: !!isEditing,
          editingContent: editingContent
        });
      });
  },

  setupController(controller, model) {
    controller.set('rubric', model.rubric);
    controller.set('isEditing', model.isEditing);
    controller.set('editingContent', model.editingContent);
    controller.set('tempRubric', model.rubric.copy());
  }
});
