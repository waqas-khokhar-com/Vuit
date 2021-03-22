import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LeftArrow(props) {
  const { width, height } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 9.812 16.794"
      {...props}
    >
      <Path
        data-name="Path 798"
        d="M9.105.707l-7.691 7.69 7.691 7.69"
        fill="none"
        stroke="rgba(112,112,112,0.5)"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default LeftArrow;
