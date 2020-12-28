import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Vuetify from 'vuetify/lib';
import localforage from 'localforage';

localforage.config({
    name: 'tf2-cvar-browser'
});

Vue.config.productionTip = false;
Vue.use(Vuetify);

(async() =>
{
    let theme = await localforage.getItem('theme');
    if(!theme)
    {
        theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    
    new Vue({
        vuetify: new Vuetify({
            theme: {
                dark: theme !== 'light'
            }
        }),
        store,
        render: function(h)
        {
            return h(App);
        }
    }).$mount('#app');
})();
