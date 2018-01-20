import * as React from "react";
import pcoUrl from "./pco-url";
import getJSON from "./getJSON";

class AppsProvider extends React.Component<
  {
    env: string;
    render: (apps: object[], callback: any) => React.ReactElement<any>;
  },
  {
    apps: object[];
  }
> {
  constructor() {
    super();

    this.state = {
      apps: []
    };
  }

  fetchApps() {
    getJSON(`${pcoUrl(this.props.env)("api")}/people/v2/me/apps`, res => {
      const apps = res.data;

      return this.setState({ apps }, () =>
        window.localStorage.setItem("Topbar:Apps", JSON.stringify(apps))
      );
    });
  }

  componentDidMount() {
    const apps = JSON.parse(window.localStorage.getItem("Topbar:Apps"));

    if (apps) return this.setState({ apps });

    return this.fetchApps();
  }

  render() {
    return this.props.render(this.state.apps || [], this.fetchApps.bind(this));
  }
}

export default AppsProvider;
