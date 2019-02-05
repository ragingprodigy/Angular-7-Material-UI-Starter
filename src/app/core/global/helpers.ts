import { CONFIG } from './config';
import { LocalStorageService } from 'angular-2-local-storage';
import { JwtModuleOptions } from '@auth0/angular-jwt';

export function jwtOptionsFactory(storage: LocalStorageService): JwtModuleOptions['config'] {
  return {
    tokenGetter: () => {
      return tokenGetter(storage);
    },
    skipWhenExpired: true,
    throwNoTokenError: false,
    whitelistedDomains: [ 'dev-project.local', 'localhost'],
    blacklistedRoutes: [ 'dev-project.local/api/login', 'localhost/api/login' ]
  };
}

/**
 * Get Token from Storage
 */
export function tokenGetter(storage: LocalStorageService) {
  return storage.get<string>(CONFIG.AUTH_TOKEN_KEY);
}

