import Ember from 'ember';
import Env from 'gooru-web/config/environment';

const EnvironmentMap = Env['environment-map'] || {};
const GooruEndpoints = Env['gooru-endpoints'] || {};


export function getEndpointUrl() {
  const currentHostname = window.location.hostname;
  const protocol = `${window.location.protocol}//`;
  const hostname = EndPointsEnv.hostname;
  var port = (protocol === 'http://') ? EndPointsEnv.port : EndPointsEnv.securePort;
  port = port ? `:${port}` : '';
  return `${protocol}${hostname}${port}`;
  //const port = window.location.port ? `:${window.location.port}` : '';
  //const envKey = EnvironmentMap[currentHostname];
  //const hostname = GooruEndpoints[envKey].hostname;
}

export function getEndpointSecureUrl() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];
  const protocol = GooruEndpoints[envKey].secureProtocol;
  const hostname = GooruEndpoints[envKey].hostname;
  const port = GooruEndpoints[envKey].securePort ? `:${GooruEndpoints[envKey].securePort}` : '';
  return `${protocol}${hostname}${port}`;
}
