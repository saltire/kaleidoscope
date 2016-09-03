const root = document.getElementById('kaleidoscope');

const ControlForm = React.createClass({
    getInitialState() {
        return {
            canvasWidth: root.offsetWidth,
            canvasHeight: root.offsetHeight,
            fullscreen: this.props.fullscreen === 'true',
            image: this.props.initialImage,
            points: this.props.initialPoints,
            rotateTime: this.props.initialTime
        };
    },

    updateSize(event) {
        this.setState({
            canvasWidth: root.offsetWidth,
            canvasHeight: root.offsetHeight
        });

        this.kaleidoscope.setupCanvas();
    },

    updateFullscreen(event) {
        this.setState({
            fullscreen: event.target.checked
        });

        this.kaleidoscope.setupCanvas(event.target.checked);
    },

    updateImage(event) {
        this.setState({
            image: event.target.value
        });

        this.kaleidoscope.setImage(event.target.value);
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
                <canvas id='canvas' width={this.state.canvasWidth} height={this.state.canvasHeight} />
                <form className='form-horizontal'>
                    <div className='form-group'>
                        <label className='col-sm-2 control-label'>Fullscreen</label>
                        <div className='col-sm-10'>
                            <p className='form-control-static'>
                                <input id='fullscreen' type='checkbox' checked={this.state.fullscreen} onChange={this.updateFullscreen} />
                            </p>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='col-sm-2 control-label'>Image</label>
                        <div className='col-sm-10'>
                            <label className='checkbox-inline'>
                                <input id='rainbow' type='checkbox' value='./rainbow.png' checked={this.state.image === './rainbow.png'} onChange={this.updateImage} />
                                Rainbow
                            </label>
                            <label className='checkbox-inline'>
                                <input id='spiral' type='checkbox' value='./spiral.png' checked={this.state.image === './spiral.png'} onChange={this.updateImage} />
                                Spiral
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='col-sm-2 control-label' htmlFor='points'>Points</label>
                        <div className='col-sm-8'>
                            <input className='form-control' id='points' type='range' min='0' max='20' value={this.state.points} onChange={this.updatePoints} />
                        </div>
                        <div className='col-sm-2'>
                            <p className='form-control-static'>{this.state.points}</p>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='col-sm-2 control-label' htmlFor='rotateTime'>Rotate time</label>
                        <div className='col-sm-8'>
                            <input className='form-control' id='rotateTime' type='range' min='100' max='5000' value={this.state.rotateTime} onChange={this.updateTime} />
                        </div>
                        <div className='col-sm-2'>
                            <p className='form-control-static'>{this.state.rotateTime}</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    },

    componentDidMount() {
        // Initialize kaleidoscope object on the newly created canvas.
        this.kaleidoscope = new Kaleidoscope('canvas', this.state.image, this.state.fullscreen, this.state.points, this.state.rotateTime);

        // Set up the window resize event to update the canvas.
        window.onresize = this.updateSize;
    }
});

ReactDOM.render(
    <ControlForm fullscreen='true' initialImage='./rainbow.png' initialPoints='3' initialTime='3000' />, root);
