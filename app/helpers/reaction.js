import Ember from 'ember';

// constants
import {EMOTIONS}  from "../config/config";

export function reaction(value /*, options*/) {
  var emotion=null;
  var emotions = EMOTIONS.emotionsList;
  emotions.forEach(function(object){
    if(object.score === value[0].toString()){
      emotion =object.emotion;
    }
  });
  return emotion;
}

export default Ember.Helper.helper(reaction);
