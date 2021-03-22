import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { screenContainer } from "../../Helper/styles";
import { routes, insuranceLabels } from "../../Helper/strings";
import { colors } from "../../Helper/colors";
import SzizleText22 from "../../Components/Texts/SzizleText22";
import { szizleFonts } from "../../Helper/fonts";
import { radius } from "../../Helper/radius";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
  Continue,
  LetUsKnowWhichPolicyYouHave,
  showToast,
} from "../../Helper/constants";
import { textSizes } from "../../Helper/textSizes";
import { styles } from "./styles";
import InsuranceItemSelectIcon from "../../../assets/InsuranceIcons/InsuranceItemSelectIcon";
import SzizleText14 from "../../Components/Texts/SzizleText14";
import { connect } from "react-redux";
import { addPoliciesRequest, policyTypesRequest } from "./Redux/actions";
import { BASE_URL } from "../../Redux/Urls";
import ScreenLoader from "../../Components/Loaders/ScreenLoader";
import Image from "../../Components/Image";

const { MainFunctionalNavigation } = routes;
const { largeRadius } = radius;
const { size18 } = textSizes;
const { fullMargin, halfMargin, doubleMargin } = margins;
const { NunitoBold } = szizleFonts;
const {
  policyItemStyle,
  policyRowItemStyle,
  policyItemLabelStyle,
  policyItemSelectedStyle,
  policyRowItemSelectedStyle,
} = styles;
const { white, black, primary10, primary } = colors;
const CheckList = ({
  navigation,
  dispatch,
  access_token,
  types,
  isLoading,
  addPolicyLoading,
}) => {
  const { dispatch: navigationDispatcher, navigate } = navigation;
  const { replace } = StackActions;
  const [itemSelectArray, setItemSelectArray] = useState({
    value: [],
    footerList: [],
  });

  useEffect(() => {
    const payload = {
      access_token,
      onSuccess: (data) => {
        let footerList = data.splice(data.length - 2, 2);
        setItemSelectArray({ value: [...data], footerList });
      },
    };
    dispatch(policyTypesRequest(payload));
  }, []);

  const onContinue = () => {
    if (addPolicyLoading) return;

    let totalArray = [...itemSelectArray.value, ...itemSelectArray.footerList];

    let array = totalArray.filter((item, index) => {
      const { isSelected } = item;
      return isSelected;
    });
    if (array.length === 0) {
      showToast("select at least 1 policy");
      return;
    }

    const payload = {
      policy_type: array.map((item) => item.id),
      access_token,
      onSuccess: () => {
        navigationDispatcher(replace(MainFunctionalNavigation));
      },
    };
    dispatch(addPoliciesRequest(payload));
  };

  const PolicyItem = (title, icon, index) => {
    let { isSelected } = itemSelectArray.value[index];
    const _onPolicyItemSelect = () => {
      let array = itemSelectArray.value;
      array[index].isSelected = !isSelected;
      setItemSelectArray({ ...itemSelectArray, value: [...array] });
    };

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={{ flex: 1 }}
        onPress={_onPolicyItemSelect}
      >
        <View style={isSelected ? policyItemSelectedStyle : policyItemStyle}>
          <Image
            featured_image={icon}
            style={{ width: 70, height: 45 }}
            indicatorSize="small"
          />
          <SzizleText14 title={title} style={policyItemLabelStyle} />
          <View style={{ position: "absolute", right: 5, top: 5 }}>
            {isSelected && <InsuranceItemSelectIcon width="40" height="40" />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const PolicyFooterItem = (title, icon, index) => {
    let { isSelected } = itemSelectArray.footerList[index];
    const _onPolicyItemSelect = () => {
      let array = itemSelectArray.footerList;
      array[index].isSelected = !isSelected;
      setItemSelectArray({ ...itemSelectArray, footerList: [...array] });
    };

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={{ flex: 1 }}
        onPress={_onPolicyItemSelect}
      >
        <View
          style={isSelected ? policyRowItemSelectedStyle : policyRowItemStyle}
        >
          <Image
            featured_image={icon}
            style={{ width: 70, height: 45 }}
            indicatorSize="small"
          />
          <SzizleText14 title={title} style={policyItemLabelStyle} />
          <View style={{ position: "absolute", right: 5, top: 5 }}>
            {isSelected && <InsuranceItemSelectIcon width="40" height="40" />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => {
    const { icon, title } = item;

    return PolicyItem(title, icon, index);
  };
  const renderFooterItem = ({ item, index }) => {
    const { icon, title } = item;

    return PolicyFooterItem(title, icon, index);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      {isLoading && <ScreenLoader />}
      <View
        style={{
          flex: 1,
          backgroundColor: white,
          paddingTop: doubleMargin,
          paddingBottom: fullMargin,
        }}
      >
        <SzizleText22
          title={LetUsKnowWhichPolicyYouHave}
          style={{
            fontFamily: NunitoBold,
            paddingHorizontal: doubleMargin,
          }}
        />
        <ScrollView>
          <FlatList
            style={{ marginTop: fullMargin }}
            contentContainerStyle={{ paddingHorizontal: doubleMargin }}
            data={itemSelectArray.value}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <FlatList
            contentContainerStyle={{ paddingHorizontal: doubleMargin }}
            data={itemSelectArray.footerList}
            numColumns={1}
            renderItem={renderFooterItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>

        <View style={{ marginTop: fullMargin }}>
          <SzizleButton
            isLoading={addPolicyLoading}
            title={Continue}
            buttonWidth="60%"
            onPress={onContinue}
          />
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = ({
  tutorialReducer: {
    policyTypes: { isLoading, types },
    addPolicies: { isLoading: addPolicyLoading },
  },
  authReducer: {
    authData: { access_token, user },
  },
}) => ({ isLoading, access_token, user, types, addPolicyLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
