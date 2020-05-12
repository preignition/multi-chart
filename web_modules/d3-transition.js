import './common/index-7aa57c77.js';
import { S as SCHEDULED, T as Transition } from './common/index-6c8f896b.js';
export { i as interrupt, t as transition } from './common/index-6c8f896b.js';
import './common/rgb-784c3fe6.js';
import './common/string-31fe99e6.js';
import './common/index-e6098f30.js';

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
