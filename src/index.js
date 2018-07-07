if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

//Define your routes here
import LandingPage from '../src/components/landing-page/landing-page';
import SplashPage from '../src/components/splash-page/splash-page';

m.route(document.body.querySelector('#root'), '/splash', {
    '/splash': SplashPage,
    '/landing': LandingPage,
});