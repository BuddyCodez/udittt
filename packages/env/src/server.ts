// Lazy getters — values are read at access time, not at module init.
// This is required for Cloudflare Workers where process.env bindings
// are only available after the Worker initializes, not at module parse time.
export const env = {
  get CORS_ORIGIN() {
    return process.env.CORS_ORIGIN ?? "https://udittt.dev";
  },
  get NODE_ENV() {
    return (process.env.NODE_ENV ?? "production") as
      | "development"
      | "production"
      | "test";
  },
  get DISCORD_WEBHOOK_URL() {
    return process.env.DISCORD_WEBHOOK_URL ?? "";
  },
  get SPOTIFY_CLIENT_ID() {
    return process.env.SPOTIFY_CLIENT_ID ?? "";
  },
  get SPOTIFY_CLIENT_SECRET() {
    return process.env.SPOTIFY_CLIENT_SECRET ?? "";
  },
  get SPOTIFY_REFRESH_TOKEN() {
    return process.env.SPOTIFY_REFRESH_TOKEN ?? "";
  },
};

export type Context = typeof env;
