import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Locked(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={38}
      viewBox="0 0 36 38"
      {...props}
    >
      <Path
        data-name="Icon awesome-lock"
        d="M32.143 16.625h-1.929v-5.344C30.214 5.062 24.734 0 18 0S5.786 5.062 5.786 11.281v5.344H3.857A3.72 3.72 0 000 20.188v14.25A3.72 3.72 0 003.857 38h28.286A3.72 3.72 0 0036 34.438v-14.25a3.72 3.72 0 00-3.857-3.563zm-8.357 0H12.214v-5.344A5.584 5.584 0 0118 5.938a5.584 5.584 0 015.786 5.344z"
        fill="#ff4773"
      />
    </Svg>
  );
}

export default Locked;
