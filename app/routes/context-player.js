import PlayerRoute from 'gooru-web/routes/player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import QuizzesContext from 'quizzes-addon/models/context/context';
import { ROLES } from 'gooru-web/config/config';

/**
 * Context Player Route
 *
 * The context player route extends the player route to provide the context player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend(PrivateRouteMixin, {
  templateName: 'player',

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {All route params} params
   * @param {Collection} collection
   */
  createContext(params, collection) {
    let context = QuizzesContext.create({
      collectionId: collection.get('id'),
      title: collection.get('title'),
      isCollection: collection.get('isCollection')
    });
    if(params.role === ROLES.STUDENT) {
      context.setProperties({
        classId: params.classId,
        contextMapping: {
          courseId: params.courseId,
          unitId: params.unitId,
          lessonId: params.lessonId
        }
      });
    }
    return this.get('quizzesContextService').createContext(context);
  }

});
