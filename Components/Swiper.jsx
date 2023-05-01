import { View, Text, Dimensions, Pressable } from "react-native";
import { Animated } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Loading from "./Loading";
import { Image } from "expo-image";
import { useRef, useState } from "react";
const renderItem = ({ item }) => {
  return (
    <View style={{ width: Dimensions.get("screen").width }}>
      <Image
        style={{ height: "100%", padding: 0, margin: 0 }}
        contentFit="contain"
        source={item.url}
      />
    </View>
  );
};

const Indicator = (props) => {

  let colors = ['#606166','#606166','#606166','#606166']
  colors[props.index-1] = '#5468ff'

  return (
    <View className="absolute bottom-[17%] flex-row gap-3 items-center justify-center">
      <FontAwesome  name="circle" size={13} color={colors[0]} />
      <FontAwesome  name="circle" size={13} color={colors[1]} />
      <FontAwesome  name="circle" size={13} color={colors[2]} />
      <FontAwesome  name="circle" size={13} color={colors[3]} />
    </View>
  );
};

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
        <View className="flex-column items-center justify-between h-[80%] p-0 m-0">
          <FlashList
            pagingEnabled
            horizontal
            ref={(ref) => (flashListRef.current = ref)}
            renderItem={renderItem}
            onScroll={(e) => {
              let offset = e.nativeEvent.contentOffset.x;
              let w = e.nativeEvent.layoutMeasurement.width;
              setIndex(Math.round(offset / w) + 1);
            }}
            data={props.data}
            estimatedItemSize={5}
            onLoad={() => {
              setShowScreenShots(false);
            }}
          />
        </View>
        <Loading loading={showScreenShots} bg="bg-black" />
        <Indicator index={index}/>
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
