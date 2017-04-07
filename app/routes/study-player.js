import PlayerRoute from 'gooru-web/routes/player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

/**
 * Study Player Route
 *
 * The context player route extends the player route to provide the study player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend(PrivateRouteMixin, {
  templateName: 'study-player',

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * When the submission is complete
     */
    onFinish: function () {
      let controller = this.get('controller');
      let queryParams = {
        collectionId: controller.get('collection.id'),
        type: controller.get('type'),
        role: controller.get('role'),
        classId: controller.get('classId'),
        contextId: controller.get('contextResult.contextId')
      };
      this.transitionTo(
        'reports.study-student-collection',
        { queryParams }
      );
    }
  }
});
