import * as util from "util";
// @ts-ignore
import _rimraf from "rimraf";
import {
  task,
  parallel,
  series,
  jestTask,
  tscTask,
  eslintTask,
} from "just-scripts";
import {
  startStorybookTask,
  buildStorybookTask,
} from "./scripts/tasks/storybook";

const rimraf = util.promisify(_rimraf as any);

task("clean", () => rimraf("lib"));
task(
  "build:tsc",
  parallel(
    tscTask({
      module: "CommonJS",
      outDir: "lib/cjs",
    }),
    tscTask({
      module: "ES2020",
      outDir: "lib/esm",
    })
  )
);
task("build", series("clean", "build:tsc"));

task("test", jestTask());
task("start", startStorybookTask());
task("build:storybook", buildStorybookTask());
task("lint", eslintTask());
