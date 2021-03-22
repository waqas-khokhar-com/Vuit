import * as React from "react";
import Svg, { G, Rect, Path, Text, TSpan } from "react-native-svg";

function ScanOrUploadDocument(props) {
  const { width, height } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={374}
      height={558}
      viewBox="0 0 374 558"
      {...props}
    >
      <G data-name="Group 622">
        <G data-name="Group 621">
          <Rect
            data-name="Rectangle 117"
            width={374}
            height={558}
            rx={20}
            fill="rgba(39,48,61,0.1)"
          />
        </G>
        <G data-name="Group 620">
          <G fill="rgba(39,48,61,0.8)">
            <Path
              data-name="Path 508"
              d="M160.775 50.89h-38.16A43.622 43.622 0 0079 94.505v38.16a9.083 9.083 0 1018.166 0V93.85c0-5.908 2.788-12.138 7.6-17 4.865-4.929 11.16-7.791 17.2-7.791h38.809a9.083 9.083 0 000-18.166z"
            />
            <Path
              data-name="Path 509"
              d="M253.031 50.89h-38.806a9.083 9.083 0 000 18.166h38.815c6.037 0 12.332 2.852 17.2 7.791 4.8 4.865 7.6 11.1 7.6 17v38.819a9.083 9.083 0 1018.166 0V93.85a43.021 43.021 0 00-42.975-42.968z"
            />
            <Path
              data-name="Path 510"
              d="M160.775 275.702H121.96c-6.037 0-12.332-2.852-17.2-7.791-4.8-4.865-7.6-11.1-7.6-17v-38.809a9.083 9.083 0 10-18.166 0v38.815a43.021 43.021 0 0042.969 42.969h38.812a9.083 9.083 0 100-18.166z"
            />
            <Path
              data-name="Path 511"
              d="M286.917 203.01a9.112 9.112 0 00-9.083 9.083v38.815c0 5.908-2.788 12.138-7.6 17-4.865 4.929-11.16 7.791-17.2 7.791h-38.809a9.083 9.083 0 100 18.166h38.16A43.663 43.663 0 00296 250.254v-38.152a9.112 9.112 0 00-9.083-9.083z"
            />
          </G>
          <Text
            data-name="Scan the document to upload"
            transform="translate(79 180)"
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
          <Text
            data-name="Choose from Gallery to upload an existing image"
            transform="translate(72 478)"
            fill="#121212"
            fontSize={16}
            fontFamily="Nunito-Bold, Nunito"
            fontWeight={700}
            opacity={0.6}
          >
            <TSpan x={-112.296} y={16}>
              {"Choose from Gallery to upload "}
            </TSpan>
            <TSpan x={-64.616} y={38}>
              {"an existing image"}
            </TSpan>
          </Text>
          <Text
            data-name="Please click on the button below to scan your policies"
            transform="translate(25 317)"
            fill="#121212"
            fontSize={16}
            fontFamily="Nunito-Bold, Nunito"
            fontWeight={700}
            opacity={0.6}
          >
            <TSpan x={14.62} y={16}>
              {"Please click on the button below to scan "}
            </TSpan>
            <TSpan x={116.356} y={38}>
              {"your policies"}
            </TSpan>
          </Text>
          <G fill="none" stroke="#121212" strokeWidth={2.25}>
            <Path
              data-name="Path 512"
              d="M282.789 402.749h25.262a3.784 3.784 0 013.789 3.775v20.155a3.784 3.784 0 01-3.789 3.778h-25.262a3.784 3.784 0 01-3.789-3.778v-20.155a3.784 3.784 0 013.789-3.775z"
              strokeLinejoin="round"
            />
            <Path
              data-name="Path 513"
              d="M304.265 410.314a2.533 2.533 0 11-2.533-2.533 2.533 2.533 0 012.533 2.533z"
              strokeMiterlimit={10}
            />
            <Path
              data-name="Path 514"
              d="M299.261 422.894l-7.176-7.162a2.533 2.533 0 00-3.473-.1L279 424.177"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              data-name="Path 515"
              d="M292.845 430.458l9.761-9.761a2.533 2.533 0 013.412-.159l5.822 4.855"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
          <G
            data-name="Group 387"
            fill="none"
            strokeMiterlimit={10}
            strokeWidth={2.25}
          >
            <Path
              data-name="Path 517"
              d="M204.433 415.104a17.788 17.788 0 11-17.787-17.788 17.788 17.788 0 0117.787 17.788z"
              stroke="#ff4773"
            />
            <Path
              data-name="Path 518"
              d="M216.292 415.104a29.646 29.646 0 11-29.646-29.646 29.646 29.646 0 0129.646 29.646z"
              stroke="#000"
            />
          </G>
          <Path
            data-name="Icon awesome-arrow-down"
            d="M270.537 448.216l-.231-2.195a1.681 1.681 0 011.5-1.853l19.22-2.024a1.681 1.681 0 011.852 1.5l2.02 19.225a1.681 1.681 0 01-1.5 1.852l-2.196.231a1.689 1.689 0 01-1.857-1.54l-.94-11.664-12.717 15.703a1.683 1.683 0 01-2.374.25l-1.748-1.415a1.683 1.683 0 01-.25-2.374l12.717-15.704-11.606 1.505a1.677 1.677 0 01-1.892-1.497zM237.553 400.293l.039 2.207a1.681 1.681 0 01-1.657 1.715l-19.322.342a1.681 1.681 0 01-1.715-1.656l-.336-19.328a1.681 1.681 0 011.656-1.714l2.207-.039a1.689 1.689 0 011.716 1.696l-.08 11.702 14.037-14.536a1.683 1.683 0 012.386-.042l1.619 1.563a1.683 1.683 0 01.042 2.387l-14.037 14.535 11.692-.487a1.677 1.677 0 011.754 1.655z"
            fill="#ff4773"
          />
        </G>
      </G>
    </Svg>
  );
}

export default ScanOrUploadDocument;
