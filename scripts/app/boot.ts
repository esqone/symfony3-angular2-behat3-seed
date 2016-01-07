import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouteConfig,
    Location,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';
import {HeroService} from './hero.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HeroService,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
