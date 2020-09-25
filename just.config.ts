import { task, tscTask, jestTask, eslintTask } from "just-scripts";
import {
  startStorybookTask,
  buildStorybookTask,
} from "./scripts/tasks/storybook";

task("build", tscTask());
task("test", jestTask());
task("start", startStorybookTask());
task("build:storybook", buildStorybookTask());
task("lint", eslintTask());
