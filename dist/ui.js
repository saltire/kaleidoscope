'use strict';

var root = document.getElementById('kaleidoscope');

var ControlForm = React.createClass({
    displayName: 'ControlForm',
    getInitialState: function getInitialState() {
        return {
            canvasWidth: root.offsetWidth,
            canvasHeight: root.offsetHeight,
            image: this.props.initialImage,
            points: this.props.initialPoints,
            rotateTime: this.props.initialTime
        };
    },
    updateSize: function updateSize(event) {
        this.setState({
            canvasWidth: root.offsetWidth,
            canvasHeight: root.offsetHeight
        });

        this.kaleidoscope.setupCanvas();
    },
    updateImage: function updateImage(event) {
        this.setState({
            image: event.target.value
        });

        this.kaleidoscope.setImage(event.target.value);
    },
    updatePoints: function updatePoints(event) {
        this.setState({
            points: event.target.value
        });

        this.kaleidoscope.setPoints(event.target.value);
    },
    updateTime: function updateTime(event) {
        this.setState({
            rotateTime: event.target.value
        });

        this.kaleidoscope.rotateTime = event.target.value;
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('canvas', { id: 'canvas', width: this.state.canvasWidth, height: this.state.canvasHeight }),
            React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement('input', { id: 'rainbow', type: 'checkbox', value: './rainbow.png', checked: this.state.image === './rainbow.png', onChange: this.updateImage }),
                    React.createElement(
                        'label',
                        { htmlFor: 'rainbow' },
                        'Rainbow'
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement('input', { id: 'spiral', type: 'checkbox', value: './spiral.png', checked: this.state.image === './spiral.png', onChange: this.updateImage }),
                    React.createElement(
                        'label',
                        { htmlFor: 'spiral' },
                        'Spiral'
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        { htmlFor: 'points' },
                        'Points'
                    ),
                    React.createElement('input', { id: 'points', type: 'range', min: '0', max: '20', value: this.state.points, onChange: this.updatePoints }),
                    React.createElement(
                        'span',
                        null,
                        this.state.points
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        { htmlFor: 'rotateTime' },
                        'Rotate time'
                    ),
                    React.createElement('input', { id: 'rotateTime', type: 'range', min: '100', max: '5000', value: this.state.rotateTime, onChange: this.updateTime }),
                    React.createElement(
                        'span',
                        null,
                        this.state.rotateTime
                    )
                )
            )
        );
    },
    componentDidMount: function componentDidMount() {
        // Initialize kaleidoscope object on the newly created canvas.
        this.kaleidoscope = new Kaleidoscope('canvas', this.state.image, this.state.points, this.state.rotateTime);

        // Set up the window resize event to update the canvas.
        window.onresize = this.updateSize;
    }
});

ReactDOM.render(React.createElement(ControlForm, { canvasSize: '600', initialImage: './rainbow.png', initialPoints: '3', initialTime: '3000' }), root);