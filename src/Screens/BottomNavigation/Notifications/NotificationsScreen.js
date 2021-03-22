import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { screenContainer } from "../../../Helper/styles";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import { Notifications } from "../../../Helper/constants";
import SzizleRoundedButton from "../../../Components/Buttons/SzizleRoundedButton";
import { textSizes } from "../../../Helper/textSizes";
import { Alerts, NewsUpdates } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import NotificationItem from "../../../Components/ListItems/NotificationItem";
import { connect } from "react-redux";
import {
  newsDeleteRequest,
  newsReadRequest,
  notificationsRequest,
} from "./Redux/actions";
import { SwipeListView } from "react-native-swipe-list-view";

const { LoginScreen, AddPolicyScreen, AlertWebViewScreen } = routes;
const { primary, white, lightGray10 } = colors;
const { size16 } = textSizes;
const { fullMargin, doubleMargin, halfMargin } = margins;
const NotificationsScreen = ({
  navigation,
  dispatch,
  user,
  access_token,
  alerts: alertsData,
  news_and_updates_unread_count,
  notifications,
  news_and_updates,
  alerts_unread_count,
  deleteLoading,
}) => {
  const { topButtonsContainer } = styles;
  const { dispatch: navigationDispatcher, toggleDrawer, navigate } = navigation;
  const [focusedTab, setFocusedTab] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    notification: { document, alerts },
  } = user;
  useEffect(() => {
    getLatestData();
  }, []);
  useEffect(() => {}, [alerts]);

  const _handleRefresh = () => {
    getLatestData();
  };
  console.log("user", user.notification);

  const getLatestData = () => {
    setIsRefreshing(true);

    const payload = {
      access_token,
      user,
      onSuccess: () => {
        setIsRefreshing(false);
      },
      onError: () => {
        setIsRefreshing(false);
      },
    };
    dispatch(notificationsRequest(payload));
  };

  const notificationRead = (id, is_read, url) => {
    if (is_read === 1) {
      navigate(AlertWebViewScreen, { url });
      return;
    }
    const payload = {
      access_token,
      id,
      notifications,
      user,
      onSuccess: () => {
        navigate(AlertWebViewScreen, { url });
      },
    };
    dispatch(newsReadRequest(payload));
  };
  const onDeleteNotification = (id) => {
    console.log("deleteLoading", deleteLoading);
    if (deleteLoading) return;
    setIsRefreshing(true);

    const payload = {
      access_token,
      id,
      notifications,
      user,
      onSuccess: () => {
        setIsRefreshing(false);
      },
    };
    dispatch(newsDeleteRequest(payload));
  };

  const renderItem = ({ item, index }) => {
    const { title, isSelected, id, is_read, url } = item;

    return (
      <NotificationItem
        item={item}
        onItemPress={() => url && notificationRead(id, is_read, url)}
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const {
      item: { id },
    } = data;
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => onDeleteNotification(id)}
        >
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SzizleDrawerAppBar
        title={Notifications}
        navigation
        toggleDrawer={toggleDrawer}
        onRightAction={() => navigate(AddPolicyScreen)}
      />
      <View
        style={[screenContainer, { paddingHorizontal: 0, paddingVertical: 0 }]}
      >
        <View style={topButtonsContainer}>
          <View style={{ marginEnd: halfMargin }}>
            <SzizleRoundedButton
              backgroundColor={focusedTab === 1 ? primary : white}
              buttonWidth="100%"
              labelSize={size16}
              title={`${Alerts}${
                alerts_unread_count !== 0 && alerts_unread_count !== undefined
                  ? " (" + alerts_unread_count + ")"
                  : ""
              }`}
              onPress={() => setFocusedTab(1)}
            />
          </View>
          <View style={{ marginStart: halfMargin }}>
            <SzizleRoundedButton
              backgroundColor={focusedTab === 2 ? primary : white}
              buttonWidth="100%"
              labelSize={size16}
              title={`${NewsUpdates}${
                news_and_updates_unread_count !== 0 &&
                news_and_updates_unread_count !== undefined
                  ? " (" + news_and_updates_unread_count + ")"
                  : ""
              }`}
              onPress={() => setFocusedTab(2)}
            />
          </View>
        </View>
        {focusedTab === 2 && (
          <View style={{ flex: 1 }}>
            <SwipeListView
              contentContainerStyle={{ padding: fullMargin }}
              data={news_and_updates}
              refreshing={isRefreshing}
              onRefresh={_handleRefresh}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    backgroundColor: lightGray10,
                    height: 0.5,
                  }}
                />
              )}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-75}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          </View>
        )}
        {focusedTab === 1 && (
          <View style={{ flex: 1 }}>
            <SwipeListView
              contentContainerStyle={{ padding: fullMargin }}
              data={alertsData}
              refreshing={isRefreshing}
              onRefresh={_handleRefresh}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    backgroundColor: lightGray10,
                    height: 0.5,
                  }}
                />
              )}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-75}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />

            {/* <FlatList
              contentContainerStyle={{ padding: fullMargin }}
              data={alertsData}
              refreshing={isRefreshing}
              onRefresh={_handleRefresh}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    backgroundColor: lightGray10,
                    height: 0.5,
                  }}
                />
              )}
            /> */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backTextWhite: {
    color: "#FFF",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  topButtonsContainer: {
    flexDirection: "row",
    marginHorizontal: fullMargin,
    justifyContent: "center",
    marginTop: doubleMargin,
  },
});
const mapStateToProps = ({
  authReducer: {
    authData: { access_token, user },
  },
  notificationReducer: {
    notification: {
      notifications: {
        alerts,
        news_and_updates_unread_count,
        news_and_updates,
        alerts_unread_count,
      },
      notifications,
    },
    notificationDelete: { isLoading: deleteLoading },
  },
}) => ({
  access_token,
  user,
  alerts,
  notifications,
  news_and_updates_unread_count,
  news_and_updates,
  alerts_unread_count,
  deleteLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
