import Vue from 'vue';

import Form from './form.vue';


new Vue({
    el: '#control-form',
    render: createElement => createElement(Form, {
        attrs: {
            initialFullscreen: false,
            initialImage: 'rainbow.png',
            initialPoints: 3,
            initialSpeed: 100
        }
    })
});
