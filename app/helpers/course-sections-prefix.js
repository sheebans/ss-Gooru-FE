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
export function courseSectionsPrefix(params,{ title, index,type }) {
  var prefix;
  if(type==='unit'){
    prefix = "U"+index+" "+title;
  }else if(type==='lesson'){
    prefix = "L"+index+" "+title;
  }else if (type==='collection'){
    prefix = "C"+index+" "+title;
  }else if(type==='assessment'){
    prefix = "A"+index+" "+title;
  }
  return prefix;
}

export default Ember.Helper.helper(courseSectionsPrefix);
