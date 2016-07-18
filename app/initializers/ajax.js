import Ember from 'ember';
import Env from 'gooru-web/config/environment';
import EndPointsConfig from 'gooru-web/utils/endpoint-config';

const RealTimeConfig = Env['real-time'] || {};

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
            const endpointUrl = EndPointsConfig.getEndpointUrl();
            settings.url = `${endpointUrl}${url}`;
          }
        }
      }
    });
  }
};
