import Ember from 'ember';
import Env from '../config/environment';

const EndPointsConfig = Env['gooru-endpoints'] || {};
const RealTimeConfig = Env['real-time'] || {};

/**
 * Make ember-18n service available to all components, models and controllers
 *
 * @module
 */
export default {
  name: 'ajax',

  initialize: function(/* app */) {
    Ember.$.ajaxSetup({
      cache: false,
      crossDomain: true,
      beforeSend: function(jqXHR, settings) {
        const url = settings.url;
        if (url.startsWith('/')) {
          if (url.startsWith(RealTimeConfig.webServiceUrl) || url.startsWith(RealTimeConfig.webSocketUrl)) {
            settings.url = `${RealTimeConfig.protocol}${RealTimeConfig.hostname}:${RealTimeConfig.port}${url}`;
          } else {
            const protocol = EndPointsConfig.protocol;
            const hostname = EndPointsConfig.hostname;
            const port = EndPointsConfig.port ? `:${EndPointsConfig.port}` : '';
            settings.url = `${protocol}${hostname}${port}${url}`;
          }
        }
      }
    });
  }
};
