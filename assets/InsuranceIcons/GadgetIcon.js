import * as React from "react";
import Svg, { Path } from "react-native-svg";

function GadgetIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.534 40.855"
      {...props}
    >
      <Path
        data-name="Icon awesome-mobile-alt"
        d="M21.7 0H3.83A3.831 3.831 0 000 3.83v33.195a3.831 3.831 0 003.83 3.83H21.7a3.831 3.831 0 003.83-3.83V3.83A3.831 3.831 0 0021.7 0zm-8.933 38.3a2.553 2.553 0 112.553-2.553 2.551 2.551 0 01-2.553 2.553zm8.933-8.616a.96.96 0 01-.958.958H4.788a.96.96 0 01-.958-.958V4.788a.96.96 0 01.958-.958h15.959a.96.96 0 01.958.958z"
        fill="#ff4773"
      />
    </Svg>
  );
}

export default GadgetIcon;
