import * as React from "react";

export class WindowSize extends React.Component {
  constructor() {
    super();
    this.state = { width: 0 };

    this.setWidth = this.setWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.setWidth);
    this.setWidth();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setWidth);
  }

  setWidth() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    return this.props.render(this.state);
  }
}
WindowSize.propTypes = {
  render: PropTypes.func.isRequired
};

WindowSize.defaultProps = {
  render: () => <div>Left side!</div>
};
