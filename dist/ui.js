'use strict';

var ControlForm = React.createClass({
    displayName: 'ControlForm',
    getInitialState: function getInitialState() {
        return {
            image: this.props.initialImage,
            points: this.props.initialPoints,
            rotateTime: this.props.initialTime
        };
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
            React.createElement('canvas', { id: 'canvas', width: this.props.canvasSize, height: this.props.canvasSize }),
            React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        { htmlFor: 'points' },
                        'Points'
                    ),
                    React.createElement('input', { type: 'range', min: '1', max: '20', id: 'points', value: this.state.points, onChange: this.updatePoints }),
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
                    React.createElement('input', { type: 'range', min: '100', max: '5000', id: 'rotateTime', value: this.state.rotateTime, onChange: this.updateTime }),
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
        this.kaleidoscope = new Kaleidoscope('canvas', this.state.image, this.state.points, this.state.rotateTime);
    }
});

ReactDOM.render(React.createElement(ControlForm, { canvasSize: '600', initialImage: './rainbow.png', initialPoints: '3', initialTime: '3000' }), document.getElementById('kaleidoscope'));
