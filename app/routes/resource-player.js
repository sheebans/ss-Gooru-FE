import QuizzesResourcePlayer from 'quizzes-addon/routes/resource-player';
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
export default QuizzesResourcePlayer.extend(PrivateRouteMixin, {
  templateName: 'resource-player',

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    return this.quizzesModel(params)
      .then(hash => Object.assign(hash, {
        classId: params.classId,
        collectionUrl: params.collectionUrl
      }));
  },

  setupController(controller, model) {
    controller.set('classId', model.classId);
    controller.set('collectionUrl', model.collectionUrl);
    this._super(...arguments);
  }
});
