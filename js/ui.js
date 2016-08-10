const ControlForm = React.createClass({
    getInitialState() {
        return {
            image: this.props.initialImage,
            points: this.props.initialPoints,
            rotateTime: this.props.initialTime
        };
    },

    updatePoints(event) {
        this.setState({
            points: event.target.value
        });

        this.kaleidoscope.setPoints(event.target.value);
    },

    updateTime(event) {
        this.setState({
            rotateTime: event.target.value
        });

        this.kaleidoscope.rotateTime = event.target.value;
    },

    render() {
        return (
            <div>
                <canvas id='canvas' width={this.props.canvasSize} height={this.props.canvasSize} />
                <form>
                    <div>
                        <label htmlFor='points'>Points</label>
                        <input type='range' min='1' max='20' id='points' value={this.state.points} onChange={this.updatePoints} />
                        <span>{this.state.points}</span>
                    </div>
                    <div>
                        <label htmlFor='rotateTime'>Rotate time</label>
                        <input type='range' min='100' max='5000' id='rotateTime' value={this.state.rotateTime} onChange={this.updateTime} />
                        <span>{this.state.rotateTime}</span>
                    </div>
                </form>
            </div>
        );
    },

    componentDidMount() {
        this.kaleidoscope = new Kaleidoscope('canvas', this.state.image, this.state.points, this.state.rotateTime);
    }
});

ReactDOM.render(<ControlForm canvasSize='600' initialImage='./rainbow.png' initialPoints='3' initialTime='3000' />,
    document.getElementById('kaleidoscope'));
