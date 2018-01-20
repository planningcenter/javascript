import * as React from "react";

import { slightBackgroundTransition, fontFamily } from "./styles";

class NotSmallRoute extends React.Component<
  {
    active: boolean;
    colors: any;
    style?: object;
    href?: string;
  },
  {
    entered: boolean;
    down: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      entered: false,
      down: false
    };
  }

  render() {
    const { active, colors, style = null, ...nativeProps } = this.props;

    const getBackgroundColor = () => {
      if (this.state.entered && this.state.down) return colors.base2;
      if (this.state.entered || active) return colors.base1;
      return "transparent";
    };

    return (
      <a
        style={{
          lineHeight: "32px",
          marginRight: "4px", // off-grid
          verticalAlign: "middle",
          borderRadius: "9999px",
          paddingLeft: "12px",
          paddingRight: "12px",
          fontSize: "14px",
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          textTransform: "capitalize",
          backgroundColor: getBackgroundColor(),
          ...fontFamily,
          ...slightBackgroundTransition,
          ...style
        }}
        onMouseEnter={() => this.setState({ entered: true })}
        onMouseLeave={() => this.setState({ entered: false })}
        onMouseDown={() => this.setState({ down: true })}
        onMouseUp={() => this.setState({ down: false })}
        {...nativeProps}
      />
    );
  }
}

export default NotSmallRoute;
