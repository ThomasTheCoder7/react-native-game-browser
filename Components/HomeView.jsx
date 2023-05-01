import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Detail from "./Detail";
import Title from "./Title";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "./Card";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef, useState, memo, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./Loading";
const config = {
  animation: "spring",
  config: {
    stiffness: 10000,
    damping: 500,
    mass: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const MyGoBackBtn = (props) => {
  return (
    <>
      <Pressable
        className="px-5 justify-center"
        onPress={() => {
          props.setVisible(true);
          props.navigation.pop();
        }}
      >
        <Ionicons name="arrow-back" size={26} color="#ffffff" />
      </Pressable>
    </>
  );
};

const HomeStack = createStackNavigator();
export default (props) => {
  const [data, setData] = useState({});
  const [headerVisibility, setHeaderVisibility] = useState()
  const [visible, setVisible] = useState(true);
  const scrollOffset = useRef(0);
  const flashListRef = useRef();

  const CardList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    function renderItem({ item, index }) {
      return (
        <Card
          url={item.url}
          title={item.title}
          navigation={navigation}
          setVisible={setVisible}
          setData={setData}
        />
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return (
      <>
        <View
          style={{
            backgroundColor: "#181920",
            borderWidth: 0,
            width: Dimensions.get("screen").width,
            height: "100%",
            flexGrow: 0,
          }}
        >
          <FlashList
  
            ref={(ref) => (flashListRef.current = ref)}
            data={props.Data}
            renderItem={renderItem}
            estimatedItemSize={props.Data.length}
            onScroll={(e) => {
              scrollOffset.current = e.nativeEvent.contentOffset.y;
            }}
            onLoad={() => {
              setLoading(false);
              setTimeout(() => {
                flashListRef.current.scrollToOffset({
                  offset: scrollOffset.current,
                });
              }, 100);
            }}
          />
          <Loading loading={loading} />
        </View>
      </>
    );
  };
  return (
    <>
      <HomeStack.Navigator
       
        initialRouteName="home"
        screenOptions={{
          detachPreviousScreen: false,
          transitionSpec: { close: config, open: config },
          headerMode:'float'
        }}
      >
        <HomeStack.Screen
          name="home"
          component={CardList}
          options={{
            title: (
              <Title>
                Trending <FontAwesome5 name="fire" size={28} color="#f54545" />
              </Title>
            ),

            headerStyle: { backgroundColor: "#181920" },
            headerTitleAlign: "center",
            transitionSpec: { open: config, close: config },
            presentation: "modal",
          }}
        />
        <HomeStack.Screen
          name="detail"

          options={({ navigation }) => ({
            title: <Title>{data.title}</Title>,
            headerStyle: { backgroundColor: "#181920"},
            headerMode:'float',
            headerTitleAlign: "center",
            headerShown:headerVisibility,
            transitionSpec: { open: config, close: config },
            headerLeft: () => (
              <MyGoBackBtn
                navigation={navigation}
                setVisible={setVisible}
                flashListRef={flashListRef}
              /> 
            ),
          })}
        >
          {props => <Detail {...props} setHeaderVisibility={setHeaderVisibility} headerVisibility={headerVisibility}/>}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    </>
  );
};
