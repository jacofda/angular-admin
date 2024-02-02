import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from 'app/app.module'
import * as Sentry from '@sentry/angular-ivy'
import { environment } from 'environments/environment'

if (environment.sentry) {
    Sentry.init({
        dsn: environment.sentry,
        integrations: [
            new Sentry.BrowserTracing({
                // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
                tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
                routingInstrumentation: Sentry.routingInstrumentation,
            }),
            new Sentry.Replay(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    })
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
