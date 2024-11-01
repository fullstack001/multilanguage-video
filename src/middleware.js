import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames, excluding /assets and /api
    matcher: ["/", "/(en|es|fr|de|zh|ja|uk|ar|pt|it)/:path*"],
};
