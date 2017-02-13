'use strict';

var root = document.getElementById('root');

var ControlForm = React.createClass({
    displayName: 'ControlForm',
    getInitialState: function getInitialState() {
        return {
            formHidden: false,
            fullscreen: this.props.fullscreen === 'true',
            image: this.props.initialImage,
            points: this.props.initialPoints,
            rotateTime: this.props.initialTime
        };
    },
    toggleForm: function toggleForm() {
        this.setState({
            formHidden: !this.state.formHidden
        });
    },
    updateSize: function updateSize(event) {
        this.kaleidoscope.setDimensions(root.offsetWidth, root.offsetHeight);
    },
    updateFullscreen: function updateFullscreen(event) {
        this.setState({
            fullscreen: event.target.checked
        });

        this.kaleidoscope.setFullscreen(event.target.checked);
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
            { className: 'form-container' + (this.state.formHidden ? ' formHidden' : '') },
            React.createElement(
                'div',
                { className: 'show-hide', onClick: this.toggleForm },
                this.state.formHidden ? '▲' : '▼'
            ),
            React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement('header', null),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            React.createElement('input', { id: 'fullscreen', type: 'checkbox', checked: this.state.fullscreen, onChange: this.updateFullscreen }),
                            'Fullscreen'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'header',
                        null,
                        'Image'
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            null,
                            React.createElement('input', { id: 'rainbow', type: 'checkbox', value: './rainbow.png', checked: this.state.image === './rainbow.png', onChange: this.updateImage }),
                            'Rainbow'
                        ),
                        React.createElement(
                            'label',
                            null,
                            React.createElement('input', { id: 'spiral', type: 'checkbox', value: './spiral.png', checked: this.state.image === './spiral.png', onChange: this.updateImage }),
                            'Spiral'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'header',
                        null,
                        'Points'
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('input', { id: 'points', type: 'range', min: '0', max: '20', value: this.state.points, onChange: this.updatePoints })
                    ),
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
                        'header',
                        null,
                        'Rotate time'
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('input', { id: 'rotateTime', type: 'range', min: '100', max: '5000', value: this.state.rotateTime, onChange: this.updateTime })
                    ),
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
        this.kaleidoscope = new Kaleidoscope('kaleidoscope', root.offsetWidth, root.offsetHeight, this.state.fullscreen, this.state.points, this.state.image, this.state.rotateTime);

        // Set up the window resize event to update the canvas.
        window.onresize = this.updateSize;
    }
});

ReactDOM.render(React.createElement(ControlForm, { fullscreen: 'true', initialImage: './rainbow.png', initialPoints: '3', initialTime: '3000' }), document.getElementById('control-form'));