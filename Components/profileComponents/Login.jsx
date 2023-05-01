import { View, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { memo } from "react";

import Title from "../Title";
import Signup from "./Signup";
import { useEffect } from "react";
const StyledInput = styled(Input);
const StyledButton = styled(Button);
const inputContainerStyle = "flex flex-col items-start justify-start w-full";
const errStyle = "text-rose-500 font-semibold px-4 text-lg mb-3";
const inputStyle =
  "text-white pb-5 bg-gray-400 rounded-md bg-[#303443] px-5 py-5";
export default memo(({ navigation }) => {
  

  return (
    <View className='bg-transparent border-0' style={{borderColor:'red'}}>
      <Title text="Log in">
        Log in <Entypo name="login" size={28} color="#5468ff" />
      </Title>
      <View className="h-full flex flex-col justify-center items-center pb-[50%]">
        <View className={inputContainerStyle}>
          <Text className={errStyle}>invalid Username or Password</Text>

          <StyledInput
            placeholder="Username"
            className={inputStyle}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
          />
        </View>
        <View className={inputContainerStyle}>
          <StyledInput
            placeholder="Password"
            secureTextEntry
            className={inputStyle}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
          />
        </View>

        <StyledButton
          className="text-center"
          buttonStyle={{
            borderRadius: 6,
            backgroundColor: "#8F43EE",
            width: "65%",
          }}
          titleStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
          title={"Login"}
        />
        <View className="pt-5 flex justify-center items-center w-full gap-4">
          <Text className="text-gray-400">Don't have an account ?</Text>
          <Text
            className="text-blue-500 text-center w-20 font-bold"
            onPress={() => {navigation.navigate('Signup')}}
          >
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
}
)
