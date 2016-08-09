const KaleidoscopeCanvas = React.createClass({
    render() {
        return <canvas id='canvas' width={this.props.size} height={this.props.size} />;
    }
});

const ControlForm = React.createClass({
    getInitialState() {
        return {
            points: this.props.initialPoints,
            rotateTime: this.props.initialTime
        };
    },

    updatePoints(event) {
        this.setState({
            points: event.target.value
        });
    },

    updateTime(event) {
        this.setState({
            rotateTime: event.target.value
        });
    },

    render() {
        return (
            <div>
                <KaleidoscopeCanvas size='600' />
                <form>
                    <div>
                        <label htmlFor='points'>Points</label>
                        <input type='range' min='1' max='10' id='points' value={this.state.points} onChange={this.updatePoints} />
                        <span>{this.state.points}</span>
                    </div>
                    <div>
                        <label htmlFor='rotateTime'>Rotate time</label>
                        <input type='range' min='100' max='3000' id='rotateTime' value={this.state.rotateTime} onChange={this.updateTime} />
                        <span>{this.state.rotateTime}</span>
                    </div>
                </form>
            </div>
        );
    }
});

ReactDOM.render(<ControlForm initialPoints='3' initialTime='3000' />,
    document.getElementById('kaleidoscope'));
