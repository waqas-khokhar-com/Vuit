import * as React from "react";
import { TouchableRipple } from "react-native-paper";
import Svg, { G, Path } from "react-native-svg";

function CheckBox(props) {
  const { isCheck, onCheck } = props;
  return (
    <TouchableRipple onPress={onCheck}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={18}
        viewBox="0 0 22 18"
        {...props}
      >
        <G data-name="Group 616">
          <G data-name="Rectangle 101" fill="#fff" stroke="rgba(39,48,61,0.2)">
            <Path stroke="none" d="M0 0h22v18H0z" />
            <Path fill="none" d="M.5.5h21v17H.5z" />
          </G>
          {isCheck === true && (
            <Path
              data-name="Icon ionic-ios-checkmark"
              d="M18.617 4.56L17.38 3.287a.266.266 0 00-.2-.084.255.255 0 00-.2.084l-8.578 8.641-3.121-3.121a.272.272 0 00-.394 0l-1.252 1.252a.28.28 0 000 .4l3.938 3.938a1.245 1.245 0 00.823.4 1.3 1.3 0 00.816-.387h.005l9.4-9.45a.3.3 0 000-.4z"
              fill="#ff4773"
            />
          )}
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default CheckBox;
