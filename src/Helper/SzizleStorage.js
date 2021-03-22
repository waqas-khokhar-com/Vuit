import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN, CURRENT_USER, IS_ALREADY_LOGIN } from "./constants";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }
};
export const removeLoginSession = async () => {
  try {
    const keys = [IS_ALREADY_LOGIN];
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
    console.log(e);
  }
};
