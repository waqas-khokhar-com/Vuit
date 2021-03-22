import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { View, SafeAreaView, StyleSheet, FlatList, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import { screenContainer } from "../../../Helper/styles";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import SzizleRoundedButton from "../../../Components/Buttons/SzizleRoundedButton";
import { colors } from "../../../Helper/colors";
import SzizleText16 from "../../../Components/Texts/SzizleText16";
import {
  Renewal,
  Insurer,
  Type,
  NeedHelpUploadingPolicies,
  Home,
  AddPolicy,
  Continue,
} from "../../../Helper/constants";
import { textSizes } from "../../../Helper/textSizes";
import { margins } from "../../../Helper/margins";
import PolicyItem from "../../../Components/ListItems/PolicyItem";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { confirmDocumentRequest, homeRequest } from "./Redux/actions";
import BottomSheet, { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import SzizleText24 from "../../../Components/Texts/SzizleText24";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { szizleFonts } from "../../../Helper/fonts";
import TextInput from "../../../Components/TextInput";
import SzizleButton from "../../../Components/Buttons/SzizleButton";
import CloseIcon from "../../../../assets/CloseIcon";
import ConfirmationDialog from "../../../Components/Dialogs/ConfirmationDialog";
import { TouchableRipple } from "react-native-paper";
import SzizleText14 from "../../../Components/Texts/SzizleText14";
import { actionTypes } from "../../../Redux/actionTypes";

const { replace } = StackActions;
const { LoginScreen, PolicyDetailScreen, AddPolicyScreen } = routes;
const { primary, white } = colors;
const { size16 } = textSizes;
const { fullMargin, doubleMargin, halfMargin } = margins;

const HomeScreen = ({
  navigation,
  dispatch,
  isLoading,
  policies,
  access_token,
  policy,
  policy_data,
  confirmDocumentLoading,
}) => {
  const { topButtonsContainer, iconSize } = styles;
  const { NunitoBold } = szizleFonts;
  const { dispatch: navigationDispatcher, toggleDrawer, navigate } = navigation;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [0, "25%", "75%"]);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const [focusedTab, setFocusedTab] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    getLatestData();
  }, []);
  useEffect(() => {
    console.log("upload document response", policy);
    bottomSheetRef.current?.snapTo(2);
  }, [policy]);

  const getLatestData = () => {
    setIsRefreshing(true);
    const payload = {
      access_token,
      onSuccess: () => {
        setIsRefreshing(false);
      },
    };
    dispatch(homeRequest(payload));
  };

  const _handleRefresh = () => {
    getLatestData();
  };

  const renderItem = ({ item }) => {
    const { id } = item;

    return (
      <PolicyItem
        item={item}
        onItemPress={() => navigate(PolicyDetailScreen)}
        onAddPolicy={() => _onAddPolicy(id)}
      />
    );
  };
  const renderBottomSheetItem = ({ item }) => {
    const { id, name, value } = item;

    return (
      <View style={{ marginVertical: halfMargin }}>
        <TextInput
          returnKeyType="next"
          fontSize={15}
          title={name}
          value={value}
          onChangeText={(text) => {}}
        />
      </View>
    );
  };

  const _onAddPolicy = (id) => {
    navigate(AddPolicyScreen, { id });
  };

  const onConfirmDocument = () => {
    setConfirmDialog(false);
    const { id } = policy;
    const payload = {
      access_token,
      data: {
        policy_id: id,
        data: policy_data.map((item) => {
          const { id, value } = item;
          return {
            id,
            value,
          };
        }),
      },
      onSuccess: () => {
        bottomSheetRef.current?.close();
        getLatestData();
      },
    };
    dispatch(confirmDocumentRequest(payload));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SzizleDrawerAppBar
        title={Home}
        navigation
        rightActionTitle={AddPolicy}
        toggleDrawer={toggleDrawer}
        // onRightAction={_onAddPolicy}
      />
      <View
        style={[screenContainer, { paddingHorizontal: 0, paddingVertical: 0 }]}
      >
        <View style={topButtonsContainer}>
          <View style={{ flex: 1 }}>
            <SzizleRoundedButton
              backgroundColor={focusedTab === 1 ? primary : white}
              buttonWidth="90%"
              labelSize={size16}
              title={Type}
              onPress={() => setFocusedTab(1)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SzizleRoundedButton
              backgroundColor={focusedTab === 2 ? primary : white}
              buttonWidth="90%"
              labelSize={size16}
              title={Insurer}
              onPress={() => setFocusedTab(2)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SzizleRoundedButton
              backgroundColor={focusedTab === 3 ? primary : white}
              buttonWidth="90%"
              labelSize={size16}
              title={Renewal}
              onPress={() => setFocusedTab(3)}
            />
          </View>
        </View>
        <View style={{ alignSelf: "center", marginTop: fullMargin }}>
          <SzizleText16
            title={NeedHelpUploadingPolicies}
            style={{ textDecorationLine: "underline", color: primary }}
          />
        </View>
        <FlatList
          contentContainerStyle={{
            paddingVertical: fullMargin,
            paddingHorizontal: doubleMargin,
          }}
          data={policies}
          refreshing={isRefreshing}
          onRefresh={_handleRefresh}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={policy ? 2 : 0}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}
      >
        <View
          style={{
            flex: 1,
            padding: widthPercentageToDP(6),
          }}
        >
          <View style={{ alignItems: "flex-end", marginBottom: fullMargin }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setConfirmDialog(true);
              }}
            >
              <TouchableRipple onPress={() => {}}>
                <SzizleText14
                  title="Close"
                  style={{ fontFamily: NunitoBold, color: primary }}
                />
              </TouchableRipple>
            </TouchableWithoutFeedback>
          </View>
          <SzizleText24
            title="Please confirm the following is accurate"
            style={{ fontFamily: NunitoBold }}
          />
          <FlatList
            style={{ marginTop: doubleMargin, marginBottom: fullMargin }}
            data={policy_data}
            showsVerticalScrollIndicator={false}
            renderItem={renderBottomSheetItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableWithoutFeedback style={{}} onPress={onConfirmDocument}>
            <SzizleButton
              isLoading={confirmDocumentLoading}
              title={Continue}
              onPress={() => {}}
            />
          </TouchableWithoutFeedback>
        </View>
        <ConfirmationDialog
          title="Discard alert!"
          message="Are you sure discard changes?"
          visible={confirmDialog}
          onOk={() => {
            setConfirmDialog(false);
            bottomSheetRef.current?.close();
            dispatch({
              type: actionTypes.UPLOAD_DOCUMENT_SUCCESS,
            });
          }}
          okLabel={"Yes"}
          onCancel={() => {
            setConfirmDialog(false);
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: fullMargin,
    marginTop: doubleMargin,
  },
  iconSize: RFValue(45),
});
const mapStateToProps = ({
  authReducer: {
    authData: { access_token },
  },
  homeReducer: {
    home: { isLoading, policies },
    confirmDocument: { isLoading: confirmDocumentLoading },
  },
  policyReducer: {
    uploadDocument: { policy, policy_data },
  },
}) => ({
  access_token,
  isLoading,
  policies,
  policy,
  policy_data,
  confirmDocumentLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
