import { Text, View, Pressable, Keyboard } from "react-native";
import * as Haptics from "expo-haptics";
import { SearchBar } from "@rneui/base";
import { useState } from "react";



export default ({ search, setSearch, setData, setFetchLoading, fetchLoading }) => {
  const [text, setText] = useState("");
  const [failed, setFailed] = useState("");

  const updateSearch = (search) => {
    if (text.length <= 0) {
      setFailed("border-2	border-red-500");
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error,
        Haptics.ImpactFeedbackStyle.Heavy
      );
      // Haptics.notificationAsync()
      return;
    }
    setFailed("");
    Keyboard.dismiss();
    setSearch(text);
  };
  return (
    <View className={`bg-[#303443] rounded rounded-xl ${failed}`}>
      <SearchBar
        blurOnSubmit={false}
        returnKeyType="search"
        enablesReturnKeyAutomatically
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
        inputContainerStyle={{
          backgroundColor: "transparent",
        }}
        inputStyle={{
          color: "#eaecef",
        }}
        backgroundColor="transparent"
        placeholder="Enter the game's name"
        placeholderTextColor="#eaecef"
        leftIconContainerStyle={{
          color: "#eaecef",
        }}
        onSubmitEditing={updateSearch}
        onChangeText={(e) => setText(e)}
        value={text}
      />
    </View>
  );
};
