import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const checkUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const data = await AsyncStorage.setItem("loginData", jsonValue);
    console.log(" login asyncstorage set done!");
  } catch (e) {
    console.log(" login AsyncStorage Set error", e);
  }
};

export const userSlice = createSlice({
  name: "loginData",
  initialState: {},
  reducers: {
    addLoginUser: (state, action) => {
      console.log("addLoginUser slice::", action.payload);
      checkUser({ ...action.payload });
      return { ...action.payload };
    },
    setLoadingUser: (state, action) => {
      // console.log("setUser slice::", action.payload);
      return { ...action.payload };
    },
  },
});

export const { addLoginUser, setLoadingUser } = userSlice.actions;
