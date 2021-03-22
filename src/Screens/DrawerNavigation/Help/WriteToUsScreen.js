import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import {
  Help,
  WriteToUs,
  IssueType,
  Description,
  Send,
  EnterQuery,
  queryMessage,
  showToast,
} from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import SzizleText24 from "../../../Components/Texts/SzizleText24";
import TextInput from "../../../Components/TextInput";
import SzizleButton from "../../../Components/Buttons/SzizleButton";
import MessageDialog from "../../../Components/Dialogs/MessageDialog";
import { connect } from "react-redux";
import { contactUsRequest } from "./Redux/actions";
import DismissKeyboardView from "../../../Components/DismissKeyboardView";
import { Picker } from "@react-native-picker/picker";
import SzizleText12 from "../../../Components/Texts/SzizleText12";

const { primary, black, white, gray90, lightGray10 } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const WriteToUsScreen = ({
  navigation,
  dispatch,
  isLoading,
  access_token,
  user,
}) => {
  const { screenHeaderStyle } = styles;
  const { navigate, goBack } = navigation;
  const [messageDialog, setMessageDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    issueType: "",
    description: "",
  });
  const { issueType, description } = formValues;

  useEffect(() => {}, []);

  const onSend = () => {
    if (!issueType || !description) {
      showToast("please fill all fields");
      return;
    }

    if (isLoading) return;
    const { id } = user;
    const payload = {
      access_token,
      params: {
        user_id: id,
        issue_type: issueType,
        description,
      },
      onSuccess: () => {
        setMessageDialog(true);
      },
    };
    dispatch(contactUsRequest(payload));
  };
  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={Help}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={[screenContainer]}>
        <SzizleText24 title={WriteToUs} style={screenHeaderStyle} />

        <View>
          <View style={{ marginTop: fullMargin }}>
            <SzizleText12
              title={IssueType}
              style={{ fontFamily: NunitoBold }}
            />

            <Picker
              selectedValue={issueType}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                setFormValues({ ...formValues, issueType: itemValue })
              }
            >
              <Picker.Item label="Application" value="Application" />
              <Picker.Item label="Registration" value="Registration" />
              <Picker.Item label="Login" value="Login" />
              <Picker.Item label="Upload or Scan" value="Upload or Scan" />
              <Picker.Item
                label="Update Information"
                value="Update Information"
              />
              <Picker.Item label="Data" value="Data" />
              <Picker.Item label="Payment" value="Payment" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <View style={{ height: 1, backgroundColor: gray90 }} />
          </View>
          <View
            style={{
              marginTop: fullMargin,
            }}
          >
            <SzizleText12
              title={Description}
              style={{ fontFamily: NunitoBold }}
            />

            <View
              style={{
                borderWidth: 1,
                borderColor: gray90,
                marginTop: halfMargin,
              }}
            >
              <TextInput
                placeholder={EnterQuery}
                value={description}
                onChangeText={(text) =>
                  setFormValues({ ...formValues, description: text })
                }
                paddingHorizontal={halfMargin}
                multiline={true}
                numberOfLines={7}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton
            isLoading={isLoading}
            title={Send}
            onPress={onSend}
            buttonWidth="60%"
          />
          <MessageDialog
            visible={messageDialog}
            message={queryMessage}
            onOk={() => {
              setMessageDialog(false);
              goBack();
            }}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};
const styles = StyleSheet.create({
  screenHeaderStyle: {
    fontFamily: NunitoBold,
    textAlign: "center",
    marginBottom: halfMargin,
  },
});
const mapStateToProps = ({
  authReducer: {
    authData: { access_token, user },
  },
  faqReducer: {
    contactUs: { isLoading },
  },
}) => ({ access_token, isLoading, user });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteToUsScreen);
