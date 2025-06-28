import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const checkUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const data = await AsyncStorage.setItem("userData", jsonValue);
    console.log("asyncstorage set done!");
  } catch (e) {
    console.log("AsyncStorage Set error", e);
  }
};

export const userSlice = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      // console.log("addUser slice::", action.payload);
      checkUser({ ...action.payload });
      return { ...action.payload };
    },
    setUser: (state, action) => {
      // console.log("setUser slice::", action.payload);
      return { ...action.payload };
    }
  }
});

export const { addUser, setUser } = userSlice.actions;
