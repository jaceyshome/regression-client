if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Development mode!');
}

//Define your routes here
import LandingPageView from './components/landing-page/landing-page-view';
import SplashPageView from '../src/components/splash-page/splash-page-view';

m.route(document.body.querySelector('#root'), '/splash', {
    '/splash': SplashPageView,
    '/landing': LandingPageView,
});
