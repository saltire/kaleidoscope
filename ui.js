'use strict';

var root = document.getElementById('kaleidoscope');

var ControlForm = React.createClass({
    displayName: 'ControlForm',
    getInitialState: function getInitialState() {
        return {
            canvasWidth: root.offsetWidth,
            canvasHeight: root.offsetHeight,
            fullscreen: this.props.fullscreen === 'true',
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
    updateFullscreen: function updateFullscreen(event) {
        this.setState({
            fullscreen: event.target.checked
        });

        this.kaleidoscope.setupCanvas(event.target.checked);
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
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 control-label' },
                        'Fullscreen'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-10' },
                        React.createElement(
                            'p',
                            { className: 'form-control-static' },
                            React.createElement('input', { id: 'fullscreen', type: 'checkbox', checked: this.state.fullscreen, onChange: this.updateFullscreen })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 control-label' },
                        'Image'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-10' },
                        React.createElement(
                            'label',
                            { className: 'checkbox-inline' },
                            React.createElement('input', { id: 'rainbow', type: 'checkbox', value: './rainbow.png', checked: this.state.image === './rainbow.png', onChange: this.updateImage }),
                            'Rainbow'
                        ),
                        React.createElement(
                            'label',
                            { className: 'checkbox-inline' },
                            React.createElement('input', { id: 'spiral', type: 'checkbox', value: './spiral.png', checked: this.state.image === './spiral.png', onChange: this.updateImage }),
                            'Spiral'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 control-label', htmlFor: 'points' },
                        'Points'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-8' },
                        React.createElement('input', { className: 'form-control', id: 'points', type: 'range', min: '0', max: '20', value: this.state.points, onChange: this.updatePoints })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-2' },
                        React.createElement(
                            'p',
                            { className: 'form-control-static' },
                            this.state.points
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 control-label', htmlFor: 'rotateTime' },
                        'Rotate time'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-8' },
                        React.createElement('input', { className: 'form-control', id: 'rotateTime', type: 'range', min: '100', max: '5000', value: this.state.rotateTime, onChange: this.updateTime })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-2' },
                        React.createElement(
                            'p',
                            { className: 'form-control-static' },
                            this.state.rotateTime
                        )
                    )
                )
            )
        );
    },
    componentDidMount: function componentDidMount() {
        // Initialize kaleidoscope object on the newly created canvas.
        this.kaleidoscope = new Kaleidoscope('canvas', this.state.image, this.state.fullscreen, this.state.points, this.state.rotateTime);

        // Set up the window resize event to update the canvas.
        window.onresize = this.updateSize;
    }
});

ReactDOM.render(React.createElement(ControlForm, { fullscreen: 'true', initialImage: './rainbow.png', initialPoints: '3', initialTime: '3000' }), root);