import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function CaptureWithArrowIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 92.463 75.118"
      {...props}
    >
      <G data-name="Group 624">
        <G
          data-name="Group 387"
          fill="none"
          strokeMiterlimit={10}
          strokeWidth={2.25}
        >
          <Path
            data-name="Path 517"
            d="M48.558 44.347a17.788 17.788 0 11-17.787-17.788 17.788 17.788 0 0117.787 17.788z"
            stroke="#ff4773"
          />
          <Path
            data-name="Path 518"
            d="M60.417 44.347a29.646 29.646 0 11-29.646-29.646 29.646 29.646 0 0129.646 29.646z"
            stroke="#000"
          />
        </G>
        <Path
          data-name="Icon awesome-arrow-down"
          d="M81.678 29.536l.039 2.207a1.681 1.681 0 01-1.657 1.715l-19.322.342a1.681 1.681 0 01-1.715-1.656l-.336-19.328a1.681 1.681 0 011.656-1.714l2.207-.039a1.689 1.689 0 011.716 1.696l-.08 11.702L78.223 9.925a1.683 1.683 0 012.386-.042l1.619 1.563a1.683 1.683 0 01.042 2.387L68.233 28.368l11.692-.487a1.677 1.677 0 011.754 1.655z"
          fill="#ff4773"
        />
      </G>
    </Svg>
  );
}

export default CaptureWithArrowIcon;
