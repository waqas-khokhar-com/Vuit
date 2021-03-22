import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import {
  LastName,
  FirstName,
  Edit,
  MyProfile,
  UpdateProfile,
  CreditsEarned,
  UploadYourPhoto,
  Email,
  SaveChanges,
  AddVerify,
  Verified,
  showToast,
} from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import CircledImage from "../../../Components/CircledImage";
import SzizleText13 from "../../../Components/Texts/SzizleText13";
import { szizleFonts } from "../../../Helper/fonts";
import TextInput from "../../../Components/TextInput";
import SzizleButton from "../../../Components/Buttons/SzizleButton";
import SzizleText16 from "../../../Components/Texts/SzizleText16";
import PhoneInput from "react-native-phone-number-input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SzizleText12 from "../../../Components/Texts/SzizleText12";
import { connect } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { updateProfilePic, updateProfileRequest } from "./Redux/actions";
import { TouchableRipple, ActivityIndicator } from "react-native-paper";
import { verifyPhoneRequest } from "../../Auth/Redux/actions";
import { routes } from "../../../Helper/strings";

const { replace } = StackActions;
const {
  primary,
  white,
  gray,
  gray90,
  purple,
  transparent,
  lightGray,
  green,
} = colors;
const { NunitoBold, NunitoSemiBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;
const { PhoneVerificationScreen } = routes;
const MyProfileScreen = ({
  navigation,
  dispatch,
  authData,
  updateIsLoading,
  verifyLoading,
  isProfileLoading,
}) => {
  const { navigate, goBack } = navigation;
  const {
    access_token,
    user: {
      full_name,
      email: emailAddress,
      first_name: firstName,
      last_name: lastName,
      avatar,
      phone: savedPhone,
      no_of_credits,
      region_code,
      country_code,
    },
    user,
  } = authData;
  const [isPhoneVerified, setIsPhoneVerified] = useState(
    savedPhone ? true : false
  );

  const phoneInput = useRef();
  const [editEnabled, setEditEnabled] = useState(false);
  const {
    phoneStyle,
    phoneContainer,
    phoneVerifyContainer,
    emailVerifyContainer,
  } = styles;
  const [form, setForm] = useState({
    first_name: firstName,
    last_name: lastName,
    email: emailAddress,
    phone: savedPhone,
  });

  const { first_name, last_name, email, phone } = form;
  useEffect(() => {
    setIsPhoneVerified(savedPhone ? true : false);
  }, [savedPhone]);

  const onImagePicker = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      mediaType: "photo",
      maxWidth: 200,
      maxHeight: 200,
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const { uri, fileName, type } = response;
        const image = new FormData();
        const photo = {
          name: fileName,
          type,
          uri,
        };
        image.append("image", photo);

        const payload = {
          access_token,
          image,
          onSuccess: () => {},
        };

        console.log(payload);

        dispatch(updateProfilePic(payload));
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const onVerify = () => {
    Keyboard.dismiss();
    if (verifyLoading) return;
    let {
      formattedNumber,
    } = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    const checkValid = phoneInput.current?.isValidNumber(formattedNumber);
    if (!checkValid) {
      showToast("Invalid phone number");
      return;
    }

    const payload = {
      phone: formattedNumber,
      onSuccess: () => {
        navigate(routes.ProfilePhoneVerificationScreen, {
          phone: formattedNumber,
        });
      },
    };
    dispatch(verifyPhoneRequest(payload));
  };

  const onSaveChanges = () => {
    if (updateIsLoading) return;
    const checkValid = phoneInput.current?.isValidNumber(phone);
    if (!isPhoneVerified) {
      showToast("verify phone first before apply changes");
      return;
    }
    if (!checkValid) {
      showToast("Invalid phone number");
      return;
    }
    let {
      formattedNumber,
    } = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    const payload = {
      first_name,
      last_name,
      phone: formattedNumber,
      access_token,
      onSuccess: () => {
        setEditEnabled(false);
      },
    };
    dispatch(updateProfileRequest(payload));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={editEnabled ? UpdateProfile : MyProfile}
        navigation
        onBackPress={goBack}
        rightActionTitle={!editEnabled ? Edit : "Cancel"}
        onRightAction={() => setEditEnabled(!editEnabled)}
      />
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: fullMargin,
          padding: doubleMargin,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <CircledImage
            isLoading={isProfileLoading}
            onPress={onImagePicker}
            image={avatar}
            size={120}
          />
          <SzizleText13
            title={UploadYourPhoto}
            style={{
              color: gray,
              fontFamily: NunitoBold,
              marginTop: halfMargin,
            }}
          />
          <View style={{ flexDirection: "row", marginTop: fullMargin }}>
            <SzizleText16
              title={CreditsEarned}
              style={{ fontFamily: NunitoBold }}
            />
            <SzizleText16
              title={no_of_credits}
              style={{
                color: purple,
                fontFamily: NunitoBold,
                marginStart: halfMargin,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: fullMargin }}>
          <TextInput
            disabled={!editEnabled}
            returnKeyType={"next"}
            title={FirstName}
            value={first_name}
            onChangeText={(text) => setForm({ ...form, first_name: text })}
          />
          {!editEnabled && (
            <View style={{ height: 1, backgroundColor: gray90 }} />
          )}
        </View>
        <View style={{ marginTop: fullMargin }}>
          <TextInput
            disabled={!editEnabled}
            returnKeyType={"next"}
            value={last_name}
            title={LastName}
            onChangeText={(text) => setForm({ ...form, last_name: text })}
          />
          {!editEnabled && (
            <View style={{ height: 1, backgroundColor: gray90 }} />
          )}
        </View>
        <View style={{ marginTop: fullMargin }}>
          <TextInput
            disabled={true}
            returnKeyType={"next"}
            value={email}
            title={Email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <View style={{ height: 1, backgroundColor: gray90 }} />
          <View style={emailVerifyContainer}>
            <MaterialCommunityIcons
              size={30}
              name={"check-circle"}
              color={green}
            />
            <SzizleText12
              title={Verified}
              style={{ color: green, fontFamily: NunitoBold }}
            />
          </View>
        </View>
        <View style={phoneContainer}>
          <PhoneInput
            countryPickerProps={{
              withAlphaFilter: false,
              preferredCountries: ["US", "GB"],
            }}
            ref={phoneInput}
            defaultValue={phone}
            defaultCode={region_code ? region_code : "US"}
            placeholder={" "}
            textInputStyle={{ fontFamily: NunitoSemiBold }}
            codeTextStyle={{ fontFamily: NunitoSemiBold }}
            onChangeText={(text) => {
              // setIsPhoneVerified(
              //   text === savedPhone &&
              //     region_code === phoneInput.current?.getCountryCode()
              // );
              // setForm({ ...form, phone: text });
            }}
            onChangeFormattedText={(text) => {
              // setForm({ ...form, phone: text });

              console.log(`${country_code}${savedPhone}`, `${text}`);
              let number = text.replace("+", "");
              setIsPhoneVerified(
                region_code === phoneInput.current?.getCountryCode() &&
                  `${number}` === `${country_code}${savedPhone}`
              );
            }}
            flagButtonStyle={{ marginTop: fullMargin }}
            containerStyle={[phoneStyle]}
            textContainerStyle={{
              backgroundColor: transparent,
              height: 60,
              paddingTop: 0,
              paddingBottom: 0,
              marginEnd: doubleMargin,
            }}
          />
          <TouchableRipple
            onPress={!isPhoneVerified && onVerify}
            style={phoneVerifyContainer}
          >
            <View>
              {!verifyLoading && (
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    size={30}
                    name={isPhoneVerified ? "check-circle" : "alert-circle"}
                    color={isPhoneVerified ? green : primary}
                  />
                  <SzizleText12
                    title={isPhoneVerified ? Verified : AddVerify}
                    style={{
                      color: isPhoneVerified ? green : primary,
                      fontFamily: NunitoBold,
                    }}
                  />
                </View>
              )}
              {verifyLoading && (
                <ActivityIndicator animating={true} color={primary} />
              )}
            </View>
          </TouchableRipple>
        </View>
        {editEnabled && (
          <View style={{ marginTop: doubleMargin }}>
            <SzizleButton
              isLoading={updateIsLoading}
              title={SaveChanges}
              buttonWidth="70%"
              onPress={onSaveChanges}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  phoneVerifyContainer: {
    position: "absolute",
    right: 0,
    width: "25%",
  },
  emailVerifyContainer: {
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: halfMargin,
    width: "25%",
  },
  phoneContainer: {
    marginTop: fullMargin,
    borderBottomWidth: 1.5,
    borderBottomColor: lightGray,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneStyle: {
    backgroundColor: transparent,
  },
});
const mapStateToProps = ({
  profileReducer: {
    profilePicUpdate: { isLoading: isProfileLoading },
    profileUpdate: { isLoading: updateIsLoading },
  },
  authReducer: {
    authData,
    verifyPhone: { isLoading: verifyLoading, phoneVerificationId },
  },
}) => ({ isProfileLoading, authData, updateIsLoading, verifyLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);
