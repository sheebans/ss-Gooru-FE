import { moduleFor } from 'ember-qunit';
import Pretender from 'pretender';

export default function(name, moduleName, options = {}) {
  moduleFor(name, moduleName, {
    needs: options.needs,

    beforeEach: function () {
      // Start up Pretender
      this.pretender = new Pretender();

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach: function () {
      // Shut down Pretender
      this.pretender.shutdown();

      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }
    }
  });
}
