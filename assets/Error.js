import * as React from "react";
import Svg, { G, Circle, Text, TSpan } from "react-native-svg";

function Error(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <G data-name="Group 619">
        <G data-name="Group 618">
          <G data-name="Group 617">
            <G data-name="Ellipse 65" fill="#ff4773" stroke="#ff4773">
              <Circle cx={10} cy={10} r={10} stroke="none" />
              <Circle cx={10} cy={10} r={9.5} fill="none" />
            </G>
          </G>
        </G>
        <Text
          data-name="!"
          transform="translate(8 15)"
          fill="#fff"
          fontSize={15}
          fontFamily="Nunito-ExtraBold, Nunito"
          fontWeight={800}
        >
          <TSpan x={0} y={0}>
            {"!"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

export default Error;
