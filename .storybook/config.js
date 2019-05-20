import { configure } from "@storybook/react";

function loadStories() {
  const req = require.context("../src/_stories", true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
