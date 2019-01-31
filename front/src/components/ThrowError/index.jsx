import React, {Component} from 'react';

class ThrowError extends Component {
  componentDidMount() {
    throw new Error()
  }

  render() {
    return null;
  }
}

export default ThrowError;
