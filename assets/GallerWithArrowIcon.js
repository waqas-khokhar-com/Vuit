import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function GallerWithArrowIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52.917 75.031"
      {...props}
    >
      <G data-name="Group 625">
        <G fill="none" stroke="#121212" strokeWidth={2.25}>
          <Path
            data-name="Path 512"
            d="M22.281 1.125h25.262A3.784 3.784 0 0151.332 4.9v20.155a3.784 3.784 0 01-3.789 3.778H22.281a3.784 3.784 0 01-3.789-3.778V4.9a3.784 3.784 0 013.789-3.775z"
            strokeLinejoin="round"
          />
          <Path
            data-name="Path 513"
            d="M43.757 8.69a2.533 2.533 0 11-2.533-2.533 2.533 2.533 0 012.533 2.533z"
            strokeMiterlimit={10}
          />
          <Path
            data-name="Path 514"
            d="M38.753 21.27l-7.176-7.162a2.533 2.533 0 00-3.473-.1l-9.612 8.545"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            data-name="Path 515"
            d="M32.337 28.834l9.761-9.761a2.533 2.533 0 013.412-.159l5.822 4.855"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Path
          data-name="Icon awesome-arrow-down"
          d="M10.029 46.592l-.231-2.195a1.681 1.681 0 011.5-1.853l19.22-2.024a1.681 1.681 0 011.852 1.5l2.02 19.225a1.681 1.681 0 01-1.5 1.852l-2.196.231a1.689 1.689 0 01-1.857-1.54l-.94-11.664L15.18 65.827a1.683 1.683 0 01-2.374.25l-1.748-1.415a1.683 1.683 0 01-.25-2.374l12.717-15.704-11.606 1.505a1.677 1.677 0 01-1.892-1.497z"
          fill="#ff4773"
        />
      </G>
    </Svg>
  );
}

export default GallerWithArrowIcon;
