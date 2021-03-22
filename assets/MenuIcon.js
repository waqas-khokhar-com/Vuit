import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Icon(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24" {...props}>
      <Path
        data-name="Icon open-menu"
        d="M0 0v3.443h30V0zm0 10.227v3.443h30v-3.443zm0 10.33V24h30v-3.443z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Icon;
