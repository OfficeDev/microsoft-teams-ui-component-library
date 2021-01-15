import * as util from "util";
import _rimraf from "rimraf";
import { task, series, jestTask, tscTask, eslintTask } from "just-scripts";
import {
  startStorybookTask,
  buildStorybookTask,
} from "./scripts/tasks/storybook";

const rimraf = util.promisify(_rimraf as any);

task("clean", () => rimraf("lib"));
task("build:tsc", tscTask());
task("build", series("clean", "build:tsc"));

task("test", jestTask());
task("start", startStorybookTask());
task("build:storybook", buildStorybookTask());
task("lint", eslintTask());
