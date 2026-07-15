import { env } from "@shaferllc/keel/core";

export default {
  repo: "https://github.com/shaferllc/dply-local",
  version: "v0.4.1",
  name: env("APP_NAME", "Keel App"),
  env: env("APP_ENV", "local"),
  debug: env("APP_DEBUG", true),
  url: env("APP_URL", "http://localhost:3000"),
  port: env("APP_PORT", 3000),
};
