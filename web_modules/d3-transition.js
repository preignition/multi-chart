import { S as SCHEDULED, T as Transition } from './common/index-95163be1.js';
export { i as interrupt, t as transition } from './common/index-95163be1.js';
import './common/index-eb5ccfed.js';
import './common/rgb-33c8dfa4.js';
import './common/string-25a4a3cd.js';
import './common/index-181a2926.js';

var root = [null];

function active(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
        return new Transition([[node]], root, name, +i);
      }
    }
  }

  return null;
}

export { active };
