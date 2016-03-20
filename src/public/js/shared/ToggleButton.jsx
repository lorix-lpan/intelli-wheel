import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';

const socket = io();

const fontStyle = {
  fontSize: '1.5em',
};

class ToggleButton extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this._setState = this._setState.bind(this);
    this._toggleEvent = this._toggleEvent.bind(this);
  }

  componentDidMount() {
    socket.on(this.props.listenEvent, this._setState);
  }

  _setState(state) {
    this.setState({ toggleState: state });
  }

  // Toggle event
  _toggleEvent() {
    socket.emit(this.props.emitEvent, true);
  }

  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-10 col-md-6">
          <button style={fontStyle} className="button" onClick={this._toggleEvent}>{this.props.btnName}</button>
          <p style={fontStyle}>
            {this.props.stateName}: { this.state.toggleState ? this.props.type[0] : this.props.type[1] }
          </p>
        </div>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  emitEvent: PropTypes.string.isRequired,
  listenEvent: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
  type: PropTypes.arrayOf(PropTypes.string),
};

export default ToggleButton;
