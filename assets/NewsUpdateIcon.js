import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={26}
      viewBox="0 0 30 26"
      {...props}
    >
      <Path
        data-name="Icon awesome-bullhorn"
        d="M30 12.188a3.222 3.222 0 00-1.667-2.8V1.626A1.659 1.659 0 0026.667 0a1.69 1.69 0 00-1.041.356L21.2 3.811A12.846 12.846 0 0113.333 6.5h-10A3.292 3.292 0 000 9.75v4.875a3.292 3.292 0 003.333 3.25h1.756a12.037 12.037 0 00-.114 1.625 12.6 12.6 0 001.331 5.634A1.64 1.64 0 007.785 26h3.869A1.613 1.613 0 0013 23.432a6.363 6.363 0 01-1.359-3.932 6 6 0 01.23-1.625h1.462a12.844 12.844 0 017.867 2.689l4.429 3.455a1.7 1.7 0 001.041.356 1.648 1.648 0 001.667-1.625v-7.763A3.223 3.223 0 0030 12.188zm-5 7.181l-1.721-1.343a16.238 16.238 0 00-9.945-3.4V9.75a16.238 16.238 0 009.945-3.4L25 5.006z"
        fill="#ff4773"
      />
    </Svg>
  );
}

export default SvgComponent;