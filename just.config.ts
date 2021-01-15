import { task, series, jestTask, tscTask, eslintTask } from "just-scripts";
import {
  startStorybookTask,
  buildStorybookTask,
} from "./scripts/tasks/storybook";

task("build:tsc", tscTask());
task("build", series("build:tsc"));

task("test", jestTask());
task("start", startStorybookTask());
task("build:storybook", buildStorybookTask());
task("lint", eslintTask());
