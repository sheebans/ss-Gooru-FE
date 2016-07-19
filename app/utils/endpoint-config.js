import Ember from 'ember';
import Env from 'gooru-web/config/environment';

const EndPointsEnv = Env['gooru-endpoints'] || {};


export function getEndpointUrl() {
  const protocol = `${window.location.protocol}//`;
  const hostname = EndPointsEnv.hostname;
  const port = EndPointsEnv.port ? `:${EndPointsEnv.port}` : '';
  return `${protocol}${hostname}${port}`;
}

export function getEndpointSecureUrl() {
  const protocol = EndPointsEnv.secureProtocol;
  const hostname = EndPointsEnv.hostname;
  const port = EndPointsEnv.securePort ? `:${EndPointsEnv.securePort}` : '';
  return `${protocol}${hostname}${port}`;
}
