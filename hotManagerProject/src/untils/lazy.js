import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.load(props); // 调用下面load
    this.state = {
      Com: null
    };
  }

  load(props) {
    // this.props.load()就是调用indexrou.jsx传过来的函数
    props.load().then(Com => {
      console.log(Com.default); // 得到的就是传过来的函数
      this.setState({
        Com: Com.default ? Com.default : null
      });
    });
  }

  render() {
    if (!this.state.Com) {
      return null;
    }
    return this.props.children(this.state.Com);
  }
}
