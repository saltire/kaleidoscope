<template>
    <div class='form-container' :class='{"form-hidden": formHidden}'>
        <div class='show-hide' v-on:click='toggleForm'>{{ formHidden ? '▲' : '▼' }}</div>
        <form>
            <div>
                <header></header>
                <div>
                    <label>
                        <input id='fullscreen' type='checkbox' v-model='fullscreen'>
                        Fullscreen
                    </label>
                </div>
            </div>
            <div>
                <header>Image</header>
                <div>
                    <label v-for='(path, label) in images'>
                        <input type='radio' v-model='image' :value='path' :checked='image === path'>
                        {{ label }}
                    </label>
                </div>
            </div>
            <div>
                <header>Points</header>
                <div>
                    <input id='points' type='range' min='0' max='20' v-model='points'>
                </div>
                <span>{{ points }}</span>
            </div>
            <div>
                <header>Rotate speed</header>
                <div>
                    <input id='rotateSpeed' type='range' min='-1000' max='1000' v-model='rotateSpeed'>
                </div>
                <span>{{ rotateSpeed }}</span>
            </div>
        </form>
    </div>
</template>

<script>
import Kaleidoscope from './kaleidoscope.js';

export default {
    props: ['initialFullscreen', 'initialImage', 'initialPoints', 'initialSpeed'],
    data() {
        return {
            formHidden: false,
            fullscreen: this.initialFullscreen,
            image: this.initialImage,
            points: this.initialPoints,
            rotateSpeed: this.initialSpeed,
            images: {
                Rainbow: 'rainbow.png',
                Spiral: 'spiral.png'
            }
        }
    },
    created() {
        this.root = document.getElementById('root');
        this.kaleidoscope = new Kaleidoscope('kaleidoscope', this.root.offsetWidth, this.root.offsetHeight, this.fullscreen, this.points, this.image, this.rotateSpeed);

        window.onresize = () => this.kaleidoscope.setDimensions(this.root.offsetWidth, this.root.offsetHeight);
    },
    methods: {
        toggleForm() {
            this.formHidden = !this.formHidden;
        }
    },
    watch: {
        fullscreen() {
            this.kaleidoscope.setFullscreen(this.fullscreen);
        },
        image() {
            this.kaleidoscope.setImage(this.image);
        },
        points() {
            this.kaleidoscope.setPoints(this.points);
        },
        rotateSpeed() {
            this.kaleidoscope.rotateSpeed = this.rotateSpeed;
        }
    }
};
</script>
