export const appRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  sell: "/sell",
  watchlist: "/watchlist",
  myListings: "/my-listings",
} as const;

export const protectedRoutePrefixes = [
  appRoutes.sell,
  appRoutes.watchlist,
  appRoutes.myListings,
  appRoutes.profile,
] as const;
