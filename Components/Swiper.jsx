import { View, Text, Dimensions, Pressable } from "react-native";
import { Animated } from "react-native";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Loading from "./Loading";
import { Image } from "expo-image";
import { useRef, useState } from "react";
const renderItem = ({ item }) => {

  return (
    <View style={{ width: Dimensions.get("screen").width, height:'100%', flexDirection:'column', justifyContent:'center' }}>
      <Image
        style={{ height: 200, padding: 0, margin: 0, maxWidth:Dimensions.get("screen").width }}
        contentFit="cover"
        source={item.url}
      />
    </View>
  );
};

const Indicator = (props) => {
  let active = '#5468ff'
  let inactive = '#606166'
  let circles = []

  for (let i = 0; i < props.data.length; i++){
    if (i == props.index - 1) {
      circles.push(<FontAwesome name="circle" size={13} color={active} key={i}/>)
      continue
    }
    circles.push(<FontAwesome  name="circle" size={13} color={inactive} key={i}/>)
  }

  return (
    <View className="absolute bottom-[17%] flex-row gap-3 items-center justify-center">
      {circles.map((component) => {
        return component
      })}
    </View>
  );
};

{/*
      <FontAwesome  name="circle" size={13} color={colors[0]} />
      <FontAwesome  name="circle" size={13} color={colors[1]} />
      <FontAwesome  name="circle" size={13} color={colors[2]} />
      <FontAwesome  name="circle" size={13} color={colors[3]} />
*/}

const CloseBtn = (props) => {
  return (
    <>
      <Pressable
        className="absolute top-0 right-0 p-5"
        onPress={() => {
          props.setHeaderVisibility(true);
          props.setSwiperVisible(false);
        }}
      >
        <MaterialCommunityIcons name="window-close" size={30} color="white" />
      </Pressable>
    </>
  );
};

const ScreenShotsList = (props) => {
  if (!props.swiperVisible) return;

  const flashListRef = useRef();
  const [showScreenShots, setShowScreenShots] = useState(true);
  const [index, setIndex] = useState(1);
  return (
    <>
      <View className="w-full h-full absolute top-0 bottom-0 left-0 right-0 bg-black opacity-75 flex flex-column"></View>
      <View className="w-full h-[94%] justify-center items-center">
        <View className="flex-column items-center justify-between h-[100%] p-0 m-0">
          <FlashList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={(ref) => (flashListRef.current = ref)}
            renderItem={renderItem}
            onScroll={(e) => {
              let offset = e.nativeEvent.contentOffset.x;
              let w = e.nativeEvent.layoutMeasurement.width;
              setIndex(Math.round(offset / w) + 1);
            }}
            data={props.data}
            estimatedItemSize={6}
            onLoad={() => {
              setShowScreenShots(false);
            }}
          />
        </View>
        <Loading loading={showScreenShots} bg="bg-black" />
        <Indicator index={index} data={props.data} />
        <CloseBtn
          setHeaderVisibility={props.setHeaderVisibility}
          setSwiperVisible={props.setSwiperVisible}
          fadeOut={props.fadeOut}
        />
      </View>
    </>
  );
};

export default ScreenShotsList;
