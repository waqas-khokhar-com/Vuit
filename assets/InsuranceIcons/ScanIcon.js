import * as React from "react";
import Svg, { G, Path, Text, TSpan } from "react-native-svg";

function ScanIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={217}
      height={243.006}
      viewBox="0 0 217 243.006"
      {...props}
    >
      <G data-name="Group 623">
        <G fill="rgba(39,48,61,0.8)">
          <Path
            data-name="Path 508"
            d="M81.775.009h-38.16A43.622 43.622 0 000 43.624v38.16a9.083 9.083 0 1018.166 0V42.969c0-5.908 2.788-12.138 7.6-17 4.865-4.929 11.16-7.791 17.2-7.791h38.809a9.083 9.083 0 000-18.166z"
          />
          <Path
            data-name="Path 509"
            d="M174.031.009h-38.806a9.083 9.083 0 000 18.166h38.815c6.037 0 12.332 2.852 17.2 7.791 4.8 4.865 7.6 11.1 7.6 17v38.819a9.083 9.083 0 1018.166 0V42.969A43.021 43.021 0 00174.031.001z"
          />
          <Path
            data-name="Path 510"
            d="M81.775 224.821H42.96c-6.037 0-12.332-2.852-17.2-7.791-4.8-4.865-7.6-11.1-7.6-17v-38.809a9.083 9.083 0 10-18.166 0v38.815a43.021 43.021 0 0042.969 42.969h38.812a9.083 9.083 0 100-18.166z"
          />
          <Path
            data-name="Path 511"
            d="M207.917 152.129a9.112 9.112 0 00-9.083 9.083v38.815c0 5.908-2.788 12.138-7.6 17-4.865 4.929-11.16 7.791-17.2 7.791h-38.809a9.083 9.083 0 100 18.166h38.16A43.663 43.663 0 00217 199.373v-38.152a9.112 9.112 0 00-9.083-9.083z"
          />
        </G>
        <Text
          data-name="Scan the document to upload"
          transform="translate(0 129.119)"
          fill="#121212"
          fontSize={16}
          fontFamily="Nunito-Bold, Nunito"
          fontWeight={700}
          opacity={0.6}
        >
          <TSpan x={0} y={0}>
            {"Scan the document to upload"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

export default ScanIcon;
