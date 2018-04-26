export { AppsProvider } from "./modules/apps_provider";
export { ConnectedPeopleProvider } from "./modules/connected_people_provider";

export { DisplaySwitch } from "./modules/display_switch";

export {
  Topbar as NotSmallTopbar,
  Route as NotSmallRoute
} from "./modules/not_small_topbar";

export {
  Topbar as SmallTopbar,
  Route as SmallRoute
} from "./modules/small_topbar";

/* TODO: experiment. which of these APIs is better for developers? */
export {
  default as PlatformAnnouncements,
  default as PlatformNotifications
} from "./modules/platform_announcements";

export {
  StyleProvider as PlatformAnnouncementsStyleProvider,
  StyledAnnouncement as StyledPlatformAnnouncement
} from "./modules/platform_announcements";

export {
  Bell as BellSymbol,
  X as XSymbol,
  Spyglass as SpyglassSymbol
} from "./modules/symbols";
