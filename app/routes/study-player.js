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
  templateName: 'study-player'
});
