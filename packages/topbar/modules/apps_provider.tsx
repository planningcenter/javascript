import * as React from "react";
import pcoUrl from "./pco_url";
import getJSON from "./get_json";

export class AppsProvider extends React.Component<
  {
    env: string;
    render: (apps: object[], callback: any) => React.ReactElement<any>;
  },
  {
    apps: object[];
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      apps: [],
    };
  }

  fetchApps() {
    getJSON(`${pcoUrl(this.props.env)("api")}/people/v2/me/apps`, (res) => {
      const apps = res.data;

      return this.setState({ apps }, () =>
        window.localStorage.setItem("Topbar:Apps", JSON.stringify(apps)),
      );
    });
  }

  clearAppsCache() {
    window.localStorage.removeItem("Topbar:Apps");
  }

  componentDidMount() {
    const apps = JSON.parse(window.localStorage.getItem("Topbar:Apps"));

    if (apps) return this.setState({ apps });

    return this.fetchApps();
  }

  render() {
    return this.props.render(this.state.apps || [], {
      fetchApps: this.fetchApps.bind(this),
      clearAppsCache: this.clearAppsCache.bind(this),
    });
  }
}
