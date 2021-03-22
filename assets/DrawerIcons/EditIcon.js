import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  const { color } = props;
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
      <G
        data-name="Icon feather-edit"
        fill="none"
        stroke={color ? color : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path
          data-name="Path 238"
          d="M12.409 4.182H3.535A2.535 2.535 0 001 6.717v17.748A2.535 2.535 0 003.535 27h17.748a2.535 2.535 0 002.535-2.535v-8.874"
        />
        <Path
          data-name="Path 239"
          d="M21.568 1.932a3.182 3.182 0 014.5 4.5l-14.25 14.25-6 1.5 1.5-6z"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
