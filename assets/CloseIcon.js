import * as React from "react";
import { TouchableRipple } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import { colors } from "../src/Helper/colors";
const { primary, white } = colors;
function CloseIcon(props) {
  const { height, width, color } = props;
  return (
    <TouchableRipple {...props} rippleColor={color ? color : primary}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 20"
        {...props}
      >
        <Path
          fill={color ? color : primary}
          d="M20 2l-2-2-8 8-8-8-2 2 8 8-8 8 2 2 8-8 8 8 2-2-8-8z"
        />
      </Svg>
    </TouchableRipple>
  );
}

export default CloseIcon;
