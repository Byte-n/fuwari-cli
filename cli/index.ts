import type { ExpressiveCodeConfig, LicenseConfig, NavBarConfig, ProfileConfig, SiteConfig } from '../src/types/config';

interface Config {
  astroConfig?: {
    outDir?: string;
    host?: string;
    postsDir?: string;
    base?: string;
  };
  theme?: {
    site: SiteConfig;
    navBar?: NavBarConfig;
    profile?: ProfileConfig;
    license?: LicenseConfig;
    expressive?: ExpressiveCodeConfig;
  }
}

export default (config: Config) => config;
