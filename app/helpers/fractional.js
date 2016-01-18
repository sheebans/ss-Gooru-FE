import Ember from 'ember';

export function fractional(params,{ numerator, denominator,expression }) {
  var num = numerator;
  var den = denominator;

  if(expression!=undefined){
    var split = expression.split("/");
    if( split.length == 2 ){
      num =split[0];
      den=split[1];
    }
  }
  return ('<span class="top">'+num+'</span><span class="bottom">'+den+'</span>')
}

export default Ember.Helper.helper(fractional);
