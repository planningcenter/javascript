/* providers */
export { default as AppsProvider } from "./modules/AppsProvider";
export {
  default as ConnectedPeopleProvider
} from "./modules/ConnectedPeopleProvider";

/* display components */
export { default as DisplaySwitch } from "./modules/DisplaySwitch";
export { NotSmallTopbar } from "./modules/NotSmallTopbar";
export { default as NotSmallRoute } from "./modules/NotSmallRoute";
export { SmallTopbar } from "./modules/SmallTopbar";
export { default as SmallRoute } from "./modules/SmallRoute";

export {
  Bar as PlatformAnnouncementBar,
  Provider as PlatformAnnouncementsProvider,
  Notification as PlatformAnnouncement,
  Style as PlatformAnnouncementsStyle
} from "./modules/platform_notifications";

/* icons */
export { default as BellIcon } from "./modules/BellIcon";
export { default as XIcon } from "./modules/XIcon";
export { default as SpyglassIcon } from "./modules/SpyglassIcon";
