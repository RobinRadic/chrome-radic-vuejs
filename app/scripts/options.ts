// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import { OptionsApp } from './OptionsApp';
import '../styles/options.scss'

export const options = new OptionsApp;
options.init().then(function (options) {
    options.mount('#app')
})

