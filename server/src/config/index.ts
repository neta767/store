export interface AppConfig {
  host: string;
  port: number;
  db: {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number
  };
}

function env<T = string>(key: string, defaultValue: T): T {
  return (process.env[key] ?? defaultValue) as T;
}

export default function config(): AppConfig {
  return {
    host: env('APP_HOST', '0.0.0.0'),
    port: env<number>('APP_PORT', 3003),
    db: {
      host: env('DB_HOST', 'localhost'),
      user: env('DB_USER', 'ziv'),
      password: env('DB_PASS', 'ziv'),
      database: env('DB_DATABASE', 'express'),
      port: env('DB_PORT', 5432),
    },
  };
}
