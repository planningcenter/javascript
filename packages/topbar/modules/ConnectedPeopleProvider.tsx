import * as React from "react";
import pcoUrl from "./pco-url";
import getJSON from "./getJSON";

class ConnectedPeopleProvider extends React.Component<
  {
    env: string;
    render: (
      connectedPeople: object[],
      callback: any
    ) => React.ReactElement<any>;
  },
  {
    connectedPeople: object[];
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      connectedPeople: []
    };
  }

  fetchConnectedPeople() {
    getJSON(
      `${pcoUrl(this.props.env)("api")}/people/v2/me/connected_people`,
      res => {
        const connectedPeople = res.data;

        return this.setState(
          {
            connectedPeople
          },
          () =>
            window.localStorage.setItem(
              "Topbar:ConnectedPeople",
              JSON.stringify(connectedPeople)
            )
        );
      }
    );
  }

  componentDidMount() {
    const connectedPeople = JSON.parse(
      window.localStorage.getItem("Topbar:ConnectedPeople")
    );

    if (connectedPeople) return this.setState({ connectedPeople });

    return this.fetchConnectedPeople();
  }

  render() {
    return this.props.render(
      this.state.connectedPeople || [],
      this.fetchConnectedPeople.bind(this)
    );
  }
}

export default ConnectedPeopleProvider;
