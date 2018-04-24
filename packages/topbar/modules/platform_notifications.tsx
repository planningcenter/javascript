import * as React from "react";
import * as request from "superagent";
import { PointBreak } from "./DisplaySwitch";
import pcURL from "./pco-url";
import { XIcon } from "./XIcon";

const entries = function(obj) {
  var ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i); // preallocate the Array
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

  return resArray;
};

function formatter(notifications) {
  return entries(notifications).map(entry => ({
    id: entry[0],
    data: entry[1]
  }));
}

export interface ProviderProps {
  env: string;
  formatter?: any;
  render: (notifications: any, callback: any) => React.ReactElement<any>;
  initialNotifications: object;
}

export class Provider extends React.Component<
  ProviderProps,
  {
    notifications: object[];
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      notifications: props.initialNotifications
    };
  }

  public static defaultProps: Partial<ProviderProps> = {
    formatter: formatter
  };

  dismissNotification(id) {
    this.setState(({ notifications }) => {
      const newNotifications = notifications;
      if (notifications[id]) delete newNotifications[id];

      return { notifications: newNotifications };
    });

    return request
      .post(
        `${pcURL(this.props.env)(
          "api"
        )}/people/v2/me/platform_notifications/${id}/dismiss`
      )
      .withCredentials()
      .end(() => {
        return;
      });
  }

  render() {
    return this.props.render(
      { notifications: this.props.formatter(this.state.notifications) },
      { dismissNotification: this.dismissNotification.bind(this) }
    );
  }
}

export interface Props {
  notifications: any[];
  colors: any; // TODO
  renderItem?: (object, number) => any;
  onDismiss: (any) => any;
}

export class Notification extends React.Component<{ style?: object }, {}> {
  render() {
    const { style, ...platformProps } = this.props;

    return (
      <PointBreak
        render={breakpoint => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: ["xs", "sm"].indexOf(breakpoint) !== -1 ? 16 : 24,
              paddingBottom: 16,
              paddingRight: 18,
              borderTop: "1px solid rgba(0,0,0,.35)",
              ...style
            }}
            {...platformProps}
          />
        )}
      />
    );
  }
}

export class Style extends React.Component<
  {
    style?: object;
    className?: string;
    colors: any;
  },
  {}
> {
  render() {
    const { children, className, colors, style, ...platformProps } = this.props;

    return (
      <div
        className={["__Topbar_PlatformNotifications_link"].join(" ").trim()}
        style={{
          color: "white",
          backgroundColor: "#282828",
          ...style
        }}
        {...platformProps}
      >
        <style>{`
            .__Topbar_PlatformNotifications_link { color: white }
            .__Topbar_PlatformNotifications_link a { color: ${colors.base0} }
            .__Topbar_PlatformNotifications_link a:hover { color: ${
              colors.base1
            } }
            .__Topbar_PlatformNotifications_link a:active { color: ${
              colors.base2
            } }
          `}</style>
        {children}
      </div>
    );
  }
}

// TODO: Rename to Map
// This had too many things packed into it given the
// first version of the feature.
// At the next breaking release, I'd like to name it
// more appropriately. Then remove `Style` root.
export class Bar extends React.Component<Props, {}> {
  render() {
    return Boolean(this.props.notifications.length > 0) ? (
      <Style colors={this.props.colors}>
        {this.props.notifications.map(
          this.props.renderItem
            ? this.props.renderItem
            : notification => (
                <Notification key={notification.id}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: notification.data.html
                    }}
                  />

                  <button
                    type="button"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      WebkitAppearance: "none",
                      // larger click target without increasing box
                      padding: 8,
                      margin: -8
                    }}
                    onClick={() => this.props.onDismiss(notification.id)}
                  >
                    <XIcon fill="white" style={{ width: 20, height: 20 }} />
                  </button>
                </Notification>
              )
        )}
      </Style>
    ) : null;
  }
}
