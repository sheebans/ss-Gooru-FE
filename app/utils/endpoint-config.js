import Ember from 'ember';
import Env from 'gooru-web/config/environment';

const EnvironmentMap = Env['environment-map'] || {};
const GooruEndpoints = Env['gooru-endpoints'] || {};


export function getEndpointUrl() {
  const currentHostname = window.location.hostname;
  const protocol = `${window.location.protocol}//`;
  const port = window.location.port ? `:${window.location.port}` : '';
  const envKey = EnvironmentMap[currentHostname];
  const hostname = GooruEndpoints[envKey].hostname;
  return `${protocol}${hostname}${port}`;
}

export function getEndpointSecureUrl() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];
  const protocol = GooruEndpoints[envKey].secureProtocol;
  const hostname = GooruEndpoints[envKey].hostname;
  const port = GooruEndpoints[envKey].securePort ? `:${GooruEndpoints[envKey].securePort}` : '';
  return `${protocol}${hostname}${port}`;
}
