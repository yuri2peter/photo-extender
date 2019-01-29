import React, { Component } from 'react';
import styles from './index.module.sass';

class Extender extends Component {
  state = {
    url: '',
    width: 960,
    height: 540,
  };
  onFileSelected = (proxy) => {
    const url = URL.createObjectURL(proxy.target.files[0]);
    this.setState({ url });
  };

  onSetWidth = (proxy) => {
    this.setState({ width: parseInt(proxy.target.value, 10) });
  };
  onSetHeight = (proxy) => {
    this.setState({ height: parseInt(proxy.target.value, 10) });
  };

  render() {
    const { url, width, height } = this.state;
    return (
      <React.Fragment>
        <div className={styles.block}>
          <span>width </span>
          <input defaultValue={960} onChange={this.onSetWidth} />
        </div>
        <div className={styles.block}>
          <span>height </span>
          <input defaultValue={540} onChange={this.onSetHeight} />
        </div>
        <div className={styles.block}>
          <span>image </span>
          <input type="file" onChange={this.onFileSelected} />
        </div>
        <div
          className={styles.box}
          style={{
            width: width,
            height: height,
          }}
        >
          <img
            src={url}
            alt=""
            className={styles.img}
          />
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
        </div >
      </React.Fragment >
    );
  }
}

export default Extender;
