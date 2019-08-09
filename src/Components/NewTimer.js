import React, { Component, Fragment } from 'react';

export default class NewTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.keys = { ESC: 27, ENTER: 13 };
    this.input = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isAdding && this.props.isAdding) {
      const node = this.input.current;
      node.focus();
      node.select();
    }
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleAddNewTimer = () => {
    if (this.state.name) {
      this.props.addTimer(this.state.name);
    }
  };

  handleCancel = () => {
    this.props.cancelNewTimer();
  };

  handleKeyDown = e => {
    if (e.which === this.keys.ESC) {
      this.handleCancel();
    } else if (e.which === this.keys.ENTER) {
      this.handleAddNewTimer();
    }
  };

  render() {
    return (
      <Fragment>
        {this.props.isAdding ? (
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2">
            <div className="rounded overflow-hidden mb-4 shadow-sm bg-light">
              <div className="d-flex align-items-start flex-column justify-content-between p-3">
                <div className="d-flex w-100">
                  <input
                    ref={this.input}
                    type="text"
                    className="form-control form-control-sm mb-1"
                    placeholder="Timer name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />
                </div>

                <div className="d-flex align-items-baseline mt-1">
                  <button
                    type="button"
                    className="btn btn-success btn-sm text-left mr-2"
                    onClick={this.handleAddNewTimer}
                  >
                    + Add
                  </button>
                  <span className="text-secondary btn-cancel cursor" onClick={this.handleCancel}>
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2">
            <div className="row no-gutters">
              <div className="col d-flex flex-column position-static">
                <button
                  type="button"
                  className="btn btn-secondary btn-block text-left"
                  onClick={() => this.props.handleAddTimerClick()}
                >
                  + Add another timer
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
