import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: {
    timeout: 6_000,
  },
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    browserName: "chromium",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3000",
    reuseExistingServer: false,
    timeout: 120_000,
    url: "http://127.0.0.1:3000",
  },
});
