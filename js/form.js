const root = document.getElementById('root');

const ControlForm = React.createClass({
    getInitialState() {
        return {
            formHidden: false,
            fullscreen: this.props.fullscreen === 'true',
            image: this.props.initialImage,
            points: this.props.initialPoints,
            rotateSpeed: this.props.initialSpeed
        };
    },

    toggleForm() {
        this.setState({
            formHidden: !this.state.formHidden
        });
    },

    updateSize(event) {
        this.kaleidoscope.setDimensions(root.offsetWidth, root.offsetHeight);
    },

    updateFullscreen(event) {
        this.setState({
            fullscreen: event.target.checked
        });

        this.kaleidoscope.setFullscreen(event.target.checked);
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

    updateSpeed(event) {
        this.setState({
            rotateSpeed: event.target.value
        });

        this.kaleidoscope.rotateSpeed = event.target.value;
    },

    render() {
        return (
            <div className={'form-container' + (this.state.formHidden ? ' formHidden' : '')}>
                <div className='show-hide' onClick={this.toggleForm}>
                    {this.state.formHidden ? '▲' : '▼'}
                </div>
                <form>
                    <div>
                        <header></header>
                        <div>
                            <label>
                                <input id='fullscreen' type='checkbox' checked={this.state.fullscreen} onChange={this.updateFullscreen} />
                                Fullscreen
                            </label>
                        </div>
                    </div>
                    <div>
                        <header>Image</header>
                        <div>
                            <label>
                                <input id='rainbow' type='checkbox' value='./rainbow.png' checked={this.state.image === './rainbow.png'} onChange={this.updateImage} />
                                Rainbow
                            </label>
                            <label>
                                <input id='spiral' type='checkbox' value='./spiral.png' checked={this.state.image === './spiral.png'} onChange={this.updateImage} />
                                Spiral
                            </label>
                        </div>
                    </div>
                    <div>
                        <header>Points</header>
                        <div>
                            <input id='points' type='range' min='0' max='20' value={this.state.points} onChange={this.updatePoints} />
                        </div>
                        <span>{this.state.points}</span>
                    </div>
                    <div>
                        <header>Rotate speed</header>
                        <div>
                            <input id='rotateSpeed' type='range' min='-1000' max='1000' value={this.state.rotateSpeed} onChange={this.updateSpeed} />
                        </div>
                        <span>{this.state.rotateSpeed}</span>
                    </div>
                </form>
            </div>
        );
    },

    componentDidMount() {
        // Initialize kaleidoscope object on the newly created canvas.
        this.kaleidoscope = new Kaleidoscope('kaleidoscope', root.offsetWidth, root.offsetHeight, this.state.fullscreen, this.state.points, this.state.image, this.state.rotateSpeed);

        // Set up the window resize event to update the canvas.
        window.onresize = this.updateSize;
    }
});

ReactDOM.render(
    <ControlForm fullscreen='false' initialImage='./rainbow.png' initialPoints='3' initialSpeed='100' />, document.getElementById('control-form'));
