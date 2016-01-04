
import { roundFloat } from './math';


/**
 * Check the standards that are checkable against the codes (provided by user)
 * and disable those who are not in codes arrays.
 * @param standards
 * @param checkableStandards
 * @param codes
 */
export function checkStandards(standards, checkableStandards, codes) {
  standards.forEach(function(standard) {
    if (checkableStandards.contains(standard.get("id"))) {
      standard.set("disabled", !codes.contains(standard.get("id")));
    }
  });
}

export function formatTime(timeInMillis) {
  var result = '';
  var secs = timeInMillis / 1000;
  const hours = secs / 3600;
  secs = secs % 3600;
  const mins = secs / 60;
  secs = secs % 60;

  if (hours >= 1) {
    result = roundFloat(hours) + 'h ';
    if (mins >= 1) {
      result += roundFloat(mins) + 'm';
    }
  } else {
    if (mins >= 1) {
      result = roundFloat(mins) + 'm ';
    }
    if (secs >= 1) {
      result += roundFloat(secs) + 's';
    }
  }

  return result;
}
