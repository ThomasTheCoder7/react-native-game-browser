import { Text, View, Pressable } from "react-native";
import { styled } from "nativewind";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "@rneui/base";
import { useState } from "react";

export default () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (

      <View className=" bg-[#303443] rounded rounded-xl">
        <SearchBar
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "transparent",
                      }}
                      inputStyle={{
                           color:'#eaecef'
                      }}
          backgroundColor="transparent"
                      placeholder="Enter the game's name"
                      placeholderTextColor='#eaecef'
                      leftIconContainerStyle={{
                           color:'#eaecef'
                      }}
          onChangeText={updateSearch}
          value={search}
        />

    </View>
  );
};
