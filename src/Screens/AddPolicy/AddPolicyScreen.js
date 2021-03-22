import React, { useEffect } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { colors } from "../../Helper/colors";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import DocumentScanner from "@woonivers/react-native-document-scanner";
import CamScanIcon from "../../../assets/CamScanIcon";
import GalleryIcon from "../../../assets/GalleryIcon";
import CaptureIcon from "../../../assets/CaptureIcon";
import UploadIcon from "../../../assets/UploadIcon";
import CloseIcon from "../../../assets/CloseIcon";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
import SzizleText16 from "../../Components/Texts/SzizleText16";
import DocumentPicker from "react-native-document-picker";
import { routes } from "../../Helper/strings";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { uploadDocument } from "./Redux/actions";
import SzizleText24 from "../../Components/Texts/SzizleText24";
import { documentLoaderMessage } from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import LottieView from "lottie-react-native";

const { fullMargin, doubleMargin, halfMargin } = margins;
const { regularRadius } = radius;
const { primary, white, gray40 } = colors;
const { ImagePreview } = routes;
const { NunitoBold } = szizleFonts;
const AddPolicyScreen = ({
  navigation,
  dispatch,
  access_token,
  route,
  isLoading,
}) => {
  const { cameraPreviewStyle, insideContainer } = styles;
  const { dispatch: navigationDispatcher, navigate, goBack } = navigation;

  const { replace } = StackActions;
  let cameraRef = React.createRef();
  useEffect(() => {}, []);

  const _onGalleryClick = async () => {
    try {
      const pdf = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const {
        params: { id },
      } = route;

      console.log("pdf document", pdf);

      const formData = new FormData();

      formData.append("id", id);
      formData.append("policy_document", pdf);

      const payload = {
        access_token,
        formData,
        onSuccess: () => {
          goBack();
        },
      };

      console.log(payload);

      dispatch(uploadDocument(payload));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const takePicture = () => {
    if (cameraRef) {
      cameraRef.capture();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="light-content" />
      <SzizleAppBar
        title="Upload or Scan Policy"
        backButtonColor={white}
        onBackPress={goBack}
        style={{
          width: "100%",
          backgroundColor: primary,
          position: "absolute",
          zIndex: 999,
          borderBottomRightRadius: regularRadius,
          borderBottomLeftRadius: regularRadius,
        }}
      />
      {isLoading && (
        <View
          style={{
            flex: 1,
            marginTop: heightPercentageToDP(22.99),
            alignItems: "center",
            marginHorizontal: widthPercentageToDP(9.66),
          }}
        >
          <SzizleText24
            title={documentLoaderMessage}
            style={{
              fontFamily: NunitoBold,
              color: primary,
              textAlign: "center",
            }}
          />

          <LottieView
            source={require("../../../assets/LottieResources/loading.json")}
            autoPlay={true}
            style={{
              width: 137,
              height: 137,
              marginTop: heightPercentageToDP(3),
            }}
            loop={true}
          />
          <SzizleText24
            title={"Loading..."}
            style={{
              fontFamily: NunitoBold,
              color: gray40,
              marginTop: fullMargin,
            }}
          />
        </View>
      )}
      {!isLoading && (
        <View style={{ flex: 1 }}>
          <DocumentScanner
            ref={(ref) => (cameraRef = ref)}
            style={cameraPreviewStyle}
            saveInAppDocument={false}
            onPictureTaken={(data) => {
              navigate(ImagePreview, { image: data.croppedImage });
            }}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={false}
            brightness={0.3}
            saturation={1}
            contrast={1.1}
            manualOnly={true}
            quality={1}
            onRectangleDetect={({ stableCounter, lastDetectionType }) => {}}
            detectionCountBeforeCapture={5}
            detectionRefreshRateInMS={50}
            onPermissionsDenied={() => console.log("Permissions Denied")}
          />
          <View
            style={{
              alignSelf: "flex-end",
              position: "absolute",
              top: heightPercentageToDP(15),
              right: widthPercentageToDP(9.66),
            }}
          >
            <CloseIcon
              width={widthPercentageToDP(5.79)}
              height={widthPercentageToDP(5.79)}
              onPress={() => {}}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              position: "absolute",
              width: widthPercentageToDP(80.19),
              height: "100%",
            }}
          >
            <CamScanIcon
              width={widthPercentageToDP(80.19)}
              height={heightPercentageToDP(48.66)}
            />
            <SzizleText16
              title="Scan the policy to upload"
              style={{ marginTop: fullMargin, color: white }}
            />
            <View style={insideContainer}>
              <UploadIcon width="40" height="40" onPress={() => {}} />
              <CaptureIcon width="60" height="60" onPress={takePicture} />
              <GalleryIcon width="40" height="40" onPress={_onGalleryClick} />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraPreviewStyle: {
    flex: 1,
  },
  insideContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: heightPercentageToDP(2.23),
  },
});
const mapStateToProps = ({
  authReducer: {
    authData: { access_token },
  },
  policyReducer: {
    uploadDocument: { isLoading },
  },
}) => ({ access_token, isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPolicyScreen);
