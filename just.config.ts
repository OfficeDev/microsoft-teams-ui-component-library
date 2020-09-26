import { task, series, jestTask, tscTask, eslintTask } from "just-scripts";
import cpx from "cpx";
import util from "util";
import {
  startStorybookTask,
  buildStorybookTask,
} from "./scripts/tasks/storybook";

const copy = util.promisify(cpx.copy);

task("build:tsc", tscTask());
task("build:cp", async function () {
  await copy("./src/components/**/*.css", "./lib/components");
  await copy("./src/types/*", "./lib/types");
});

task("build", series("build:cp", "build:tsc"));

task("test", jestTask());
task("start", startStorybookTask());
task("build:storybook", buildStorybookTask());
task("lint", eslintTask());
