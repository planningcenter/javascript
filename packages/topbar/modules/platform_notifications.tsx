import * as React from "react";
import * as request from "superagent";
import { PointBreak } from "./DisplaySwitch";
import pcURL from "./pco-url";
import XIcon from "./XIcon";

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

interface ProviderProps {
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
    return request
      .post(
        `${pcURL(this.props.env)(
          "api"
        )}/people/v2/me/platform_notifications/${id}/dismiss`
      )
      .withCredentials()
      .end(() => {
        return this.setState(({ notifications }) => {
          const newNotifications = notifications;
          if (notifications[id]) delete newNotifications[id];

          return { notifications: newNotifications };
        });
      });
  }

  render() {
    return this.props.render(
      { notifications: this.props.formatter(this.state.notifications) },
      { dismissNotification: this.dismissNotification.bind(this) }
    );
  }
}

interface Props {
  notifications: any[];
  colors: any; // TODO
  renderItem?: (object, number) => any;
  onDismiss: (any) => any;
}

export class Bar extends React.Component<Props, {}> {
  render() {
    return Boolean(this.props.notifications.length > 0) ? (
      <PointBreak
        render={breakpoint => (
          <div
            className="__Topbar_PlatformNotifications_link"
            style={{
              color: "white",
              backgroundColor: "#282828"
            }}
          >
            <style>{`
            .__Topbar_PlatformNotifications_link { color: white }
            .__Topbar_PlatformNotifications_link a { color: ${
              this.props.colors.base0
            } }
            .__Topbar_PlatformNotifications_link a:hover { color: ${
              this.props.colors.base1
            } }
            .__Topbar_PlatformNotifications_link a:active { color: ${
              this.props.colors.base2
            } }
          `}</style>
            {this.props.notifications.map(
              this.props.renderItem
                ? this.props.renderItem
                : (notification, i) => (
                    <div
                      key={notification.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 16,
                        paddingLeft:
                          ["xs", "sm"].indexOf(breakpoint) !== -1 ? 16 : 24,
                        paddingBottom: 16,
                        paddingRight: 10,
                        // marginTop: i > 0 ? 16 : 0,
                        ...(i && { borderTop: "1px solid rgba(0,0,0,.35)" })
                      }}
                    >
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
                          WebkitAppearance: "none"
                        }}
                        onClick={() => this.props.onDismiss(notification.id)}
                      >
                        <XIcon fill="white" style={{ width: 20, height: 20 }} />
                      </button>
                    </div>
                  )
            )}
          </div>
        )}
      />
    ) : null;
  }
}
