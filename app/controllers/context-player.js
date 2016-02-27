import Ember from 'ember';
import PlayerController from 'gooru-web/controllers/player';
import {truncate} from 'gooru-web/utils/utils';

/**
 * Context Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Properties
  /**
   * The lesson for this collection
   * @property {Lesson}
   */
  lesson: null,

  /**
   * Text used for the back navigation link
   * @property {string}
   */
  lessonTitle: Ember.computed("lesson", function(){
    return truncate(this.get("lesson.title"), null, "name");
  })

});
