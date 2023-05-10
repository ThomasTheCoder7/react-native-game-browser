import { View, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { memo } from "react";
import Title from "../Title";
const StyledInput = styled(Input);
const StyledButton = styled(Button);
const inputContainerStyle = "flex flex-col items-start justify-start w-full";
const inputStyle =
  "text-white pb-5 bg-gray-400 rounded-md bg-[#303443] px-5 py-5 mb-1";
const errStyle = "text-rose-500 font-semibold px-4 text-lg mb-3";
export default memo(({navigation}) => {
  return (
    <>
      <Title text="Log in">
        Sign up <Entypo name="login" size={28} color="#5468ff" />
      </Title>
      <View className="h-full flex flex-col justify-center items-center pb-[50%] pt-10">
        <View className={inputContainerStyle}>
          <Text className={errStyle}>invalid Username</Text>

          <StyledInput
            placeholder="Username"
            className={inputStyle}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
          />
        </View>
        <View className={inputContainerStyle}>
          <Text className={errStyle}>invalid Email address</Text>
          <StyledInput
            placeholder="Email"
            className={inputStyle}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
          />
        </View>
        <View className={inputContainerStyle}>
          <Text className={errStyle}>Passwords don't match</Text>
          <View className='flex flex-col w-full'>
            <StyledInput
              placeholder="Password"
              secureTextEntry
              className={inputStyle + 'mb-0'}
              inputContainerStyle={{ borderBottomColor: "transparent", marginBottom:-10 }}
            />
            <StyledInput
              placeholder="Repeat Password"
              secureTextEntry
              className={inputStyle}
              inputContainerStyle={{ borderBottomColor: "transparent" }}
            />
          </View>
        </View>

        <StyledButton
          className="text-center"
          buttonStyle={{
            borderRadius: 6,
            backgroundColor: "#8F43EE",
            width: "100%",
          }}
          titleStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 20,

          }}
          containerStyle={{
            width:'60%'
          }}
            title={"Sign up"}
        />
        <View className="pt-5 flex justify-center items-center w-full gap-4">
          <Text className="text-gray-400">Already have an account ?</Text>
          <Text
            className="text-blue-500 text-center w-20 font-bold"
            onPress={() => {navigation.goBack()}}
          >
            Log in
          </Text>
        </View>
      </View>
    </>
  );
});
