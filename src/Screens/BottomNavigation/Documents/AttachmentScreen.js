import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import { Attachments } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import PdfDownload from "../../../Components/PdfDownload";
import PdfPrint from "../../../Components/PdfPrint";
import PdfZoomIn from "../../../Components/PdfZoomIn";
import PdfZoomOut from "../../../Components/PdfZoomOut";
import Pdf from "react-native-pdf";
import SzizleText16 from "../../../Components/Texts/SzizleText16";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableRipple } from "react-native-paper";

const { replace } = StackActions;
const {} = routes;
const { primary, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const pdfScaleLimit = 0.1;

const AttachmentScreen = ({ navigation }) => {
  const { navigate, goBack } = navigation;

  const [pdf, setPdf] = useState({
    pdfScale: 1.0,
    pdfPage: 1,
    pdfPageCount: "0 of 0",
    numberOfPages: 0,
  });

  const { pdfScale, pdfPage, pdfPageCount, numberOfPages } = pdf;
  const { pdfStyle } = styles;
  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={Attachments}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={screenContainer}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PdfZoomIn
            width="24"
            height="24"
            onPress={() =>
              setPdf({ ...pdf, pdfScale: pdfScale + pdfScaleLimit })
            }
          />
          <PdfZoomOut
            width="24"
            height="24"
            onPress={() =>
              pdfScale !== 0 &&
              setPdf({ ...pdf, pdfScale: pdfScale - pdfScaleLimit })
            }
          />
          <PdfDownload width="24" height="24" onPress={() => {}} />
          <PdfPrint width="24" height="24" onPress={() => {}} />
        </View>

        <View style={{ flex: 1 }}>
          <SzizleText16
            title={pdfPageCount}
            style={{ textAlign: "center", marginVertical: fullMargin }}
          />
          <Pdf
            scale={pdfScale}
            source={source}
            horizontal={true}
            page={pdfPage}
            fitWidth={true}
            enablePaging={true}
            onLoadComplete={(numberOfPages, filePath) => {
              setPdf({
                ...pdf,
                numberOfPages,
                pdfPageCount: `1 of ${numberOfPages}`,
              });
            }}
            onPageChanged={(page, numberOfPages) => {
              setPdf({
                ...pdf,
                pdfPage: page,
                pdfPageCount: `${page} of ${numberOfPages}`,
              });
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {}}
            style={pdfStyle}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: doubleMargin,
            }}
          >
            <TouchableRipple
              style={{ paddingHorizontal: fullMargin }}
              onPress={() =>
                pdfPage !== 1 && setPdf({ ...pdf, pdfPage: pdfPage - 1 })
              }
            >
              <FontAwesome name="caret-left" color={primary} size={80} />
            </TouchableRipple>
            <TouchableRipple
              style={{ paddingHorizontal: fullMargin }}
              onPress={() =>
                pdfPage !== numberOfPages &&
                setPdf({ ...pdf, pdfPage: pdfPage + 1 })
              }
            >
              <FontAwesome name="caret-right" color={primary} size={80} />
            </TouchableRipple>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pdfStyle: {
    flex: 1,
  },
});
export default AttachmentScreen;
