import Ember from 'ember';

/**Show the Unit, Lesson, Assessment and Collection label correctly,
 *  this is showing the letter and number prior the name.
 *
 * @example
 *
 * <span>{{course-sections-prefix title="My Unit" type="unit" index=1}}</span>
 * @see /app/templates/components
 *
 * @param title {String}
 * @param index {Number}
 * @param trype {String} "unit","lesson","collection" and "assessment"
 * @returns {String}
 */
export default Ember.Helper.extend({
  i18n: Ember.inject.service('i18n'),

  compute(params,{ title, index,type }) {
    let i18n = this.get('i18n');
    var prefix;

    if(type==='unit'){
      prefix = i18n.t('common.unitInitial')+index+" "+title;
    }else if(type==='lesson'){
      prefix = i18n.t('common.lessonInitial')+index+" "+title;
    }else if (type==='collection'){
      prefix = i18n.t('common.collectionInitial')+index+" "+title;
    }else if(type==='assessment'){
      prefix = i18n.t('common.assessmentInitial')+index+" "+title;
    }
    return prefix;
  }

});
