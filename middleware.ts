import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|vi|zh|hi|ar|ru|bn|id|th|tr|ph|br|fa)/:path*"],
};
