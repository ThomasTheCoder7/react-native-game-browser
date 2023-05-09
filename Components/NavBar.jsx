import { Text, View, TouchableNativeFeedback, Keyboard } from "react-native";
import { styled } from "nativewind";
import { TabView, Tab } from "@rneui/base";
import HomeView from "./HomeView";
import SearchView from "./SearchView";
import Profile from "./ProfileView";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
const StyledView = styled(View);
const myTheme = {
  colors: {
    primary: "#ffffff",
    background: "#181920",
    card: "transparent",
    text: "#ffffff",
    border: "transparent",
    notification: "transparent",
  },
};

export default function NavBar(props) {
  const active = "#5468ff";
  const inactive = "#606166";
  const [colors, setColors] = useState([active, inactive, inactive]);
  const [index, setIndex] = useState(0);
  const setActive = (index) => {
    let arr = [inactive, inactive, inactive];
    arr[index] = active;
    setColors(arr);
  };

  return (
    <>
      <StyledView className="w-full h-full absolute bg-transparent">
        <TabView
  
          value={index}
          onChange={(e) => {
            setActive(e);
            setIndex(e);
          }}
          disableSwipe
          animationConfig={{ duration: 150, bounciness: false }}
          style={{ backgroundColor: "transparent" }}
        >
          <TabView.Item
            
            style={{ backgroundColor: "transparent", width: "100%" }}
          >
            {index == 0 ? ( 
              <NavigationContainer theme={myTheme}>
                <View className="h-[100%]">
                  <HomeView
                    Data={props.Data}
                    setLoading={props.setLoading}
                    loading={props.loading}
                  />
                </View>
              </NavigationContainer>
            ) : (
              <></>
            )}
          </TabView.Item>
          <TabView.Item
            style={{
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            {index == 1 ? ( 
              <NavigationContainer theme={myTheme}>
                <View className="h-[100%]">
                  <SearchView/>
                </View>
              </NavigationContainer>
            ) : (
              <></>
            )}
          </TabView.Item>
          <TabView.Item
            style={{
              backgroundColor: "#181920",
              width: "100%",
              paddingHorizontal: "5%",
            }}
          >
            
              <NavigationContainer theme={myTheme}>
                <Profile setLoading={props.setLoading} />
              </NavigationContainer>
            
          </TabView.Item>
        </TabView>
      </StyledView>

      <StyledView
        className="absolute bottom-0 flex flex-row items-end bg-[#252733]
       justify-between px-5 rounded-t-2xl w-full h-1/12 pb-1"
      >
        <Tab
          value={index}
          onChange={(e) => {
            if (e == index) {
              return;
            }
            setIndex(e);
            setActive(e);
            Keyboard.dismiss();
          }}
          disableIndicator
        >
          <Tab.Item
            value={0}
            icon={{ name: "home", type: "antdesign", color: colors[0] }}
            containerStyle={{ overflow: "hidden" }}
            touchSoundDisabled
            background={TouchableNativeFeedback.Ripple("transparent", false)}
            variant="primary"
          />
          <Tab.Item
            value={1}
            icon={{ name: "search1", type: "antdesign", color: colors[1] }}
            background={TouchableNativeFeedback.Ripple("transparent", false)}
            touchSoundDisabled
            variant="primary"
          />
          <Tab.Item
            value={2}
            icon={{ name: "user", type: "antdesign", color: colors[2] }}
            background={TouchableNativeFeedback.Ripple("transparent", false)}
            touchSoundDisabled
            variant="primary"
          />
        </Tab>
      </StyledView>
    </>
  );
}
