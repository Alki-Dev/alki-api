import 'dotenv/config';
import { merge } from 'lodash';

import { assertNever, generateToken, isAssertNeverError } from '../utils';

export function fetchNullableVariable(key: string): string | null {
  return process.env[key] ?? null;
}

export function fetchVariable(key: string): string {
  const value = process.env[key];

  if (!value) throw new Error(`Could not fetch environment variable ${key}`);

  return value;
}

enum Environment {
  Production = 'production',
  Staging = 'staging',
  Dev = 'development',
  Test = 'test',
}

type Config = {
  appSecretKey: string;
  apiToken: string;
  port: number;
  environment: Environment;
};

const environment: Environment = (fetchNullableVariable('NODE_ENV') ??
  'development') as Environment;

export const envIsDev = () => environment === Environment.Dev;
export const envIsTest = () => environment === Environment.Test;

const baseConfig = {
  appSecretKey: fetchNullableVariable('APP_SECRET_KEY') ?? generateToken(32),
  port: parseInt(fetchNullableVariable('PORT') ?? '8080'),
  environment,
};

function getConfigForEnvironment(environment: Environment) {
  try {
    switch (environment) {
      case Environment.Production:
      case Environment.Staging:
      case Environment.Dev:
        return {
          apiToken: fetchVariable('API_TOKEN'),
        };
      case Environment.Test:
        return {
          appSecretKey: 'test',
          apiToken: 'apitoken',
        };
      default:
        assertNever(environment);
    }
  } catch (err) {
    if (isAssertNeverError(err)) {
      throw new Error(
        `Environment "${environment}" is not valid, choose one from: ${Object.values(
          Environment,
        ).join(', ')}.`,
      );
    }

    throw err;
  }
}

function getConfig(): Config {
  return merge(baseConfig, getConfigForEnvironment(environment));
}

export const config = getConfig();
