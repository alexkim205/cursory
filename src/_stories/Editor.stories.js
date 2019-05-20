import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { CustomEditor } from "../components";
import { loadFonts } from "../_helpers";

loadFonts();

storiesOf("Components|Editor", module)
  .add("with toolbar", () => <CustomEditor />)
  .add("without toolbar", () => <CustomEditor withToolbar={false} />);
