if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

//Define your routes here
import LandingPageView from '../src/components/landing-page/landing-page-view';
import SplashPageView from '../src/components/splash-page/splash-page-view';

m.route(document.body.querySelector('#root'), '/splash', {
    '/splash': SplashPageView,
    '/landing': LandingPageView,
});