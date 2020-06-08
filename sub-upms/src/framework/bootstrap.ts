// import 'reflect-metadata';
import '~assets/style/main.less';
import * as Sentry from '@sentry/browser';

process.env.SENTRY_URL && Sentry.init({ dsn: process.env.SENTRY_URL });
