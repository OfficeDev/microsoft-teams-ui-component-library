import {
  ComponentSlotStylesPrepared,
  TreeProps,
} from "@fluentui/react-northstar";

type TreeVars = {
  isCallingRoster: boolean;
};

export const treeStyles: ComponentSlotStylesPrepared<
  Partial<TreeProps>,
  Partial<TreeVars>
> = {
  root: (componentStyleParameters) => {
    const {
      variables: { isCallingRoster },
      theme: {
        siteVariables: {
          colorScheme: { default: colorSchemeDefault },
        },
      },
    } = componentStyleParameters;
    return {
      ...(isCallingRoster && {
        backgroundColor: colorSchemeDefault.background2,
      }),
    };
  },
};
