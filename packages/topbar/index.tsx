/* providers */
import AppsProvider from "./modules/AppsProvider";
import ConnectedPeopleProvider from "./modules/ConnectedPeopleProvider";

/* display components */
import DisplaySwitch from "./modules/DisplaySwitch";
import NotSmallTopbar from "./modules/NotSmallTopbar";
import NotSmallRoute from "./modules/NotSmallRoute";
import SmallTopbar from "./modules/SmallTopbar";
import SmallRoute from "./modules/SmallRoute";
import {
  Bar as PlatformNotificationsBar,
  Provider as PlatformNotificationsProvider
} from "./modules/platform_notifications";

/* icons */
import BellIcon from "./modules/BellIcon";
import XIcon from "./modules/XIcon";
import SpyglassIcon from "./modules/SpyglassIcon";

export {
  AppsProvider,
  BellIcon,
  ConnectedPeopleProvider,
  DisplaySwitch,
  NotSmallTopbar,
  NotSmallRoute,
  SmallTopbar,
  SmallRoute,
  SpyglassIcon,
  XIcon,
  PlatformNotificationsBar,
  PlatformNotificationsProvider
};
