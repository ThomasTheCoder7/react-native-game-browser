import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Detail from "./Detail";
import Title from "./Title";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "./Card";
import { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

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
          props.navigation.navigate('home');
        }}
      >
        <Ionicons name="arrow-back" size={26} color="#ffffff" />
      </Pressable>
    </>
  );
};

const SearchStack = createStackNavigator();
export default (props) => {
  const [data, setData] = useState({});
  const [headerVisibility, setHeaderVisibility] = useState();
  const [fetchLoading, setFetchLoading] = useState(true);
  const [search, setSearch] = useState("");
  const scrollOffset = useRef(0);
  const flashListRef = useRef();

  const fetchData = async (setData, query) => {
    setFetchLoading(true);
    let Data = [];
    try {
      let response = await fetch(
        `https://game-browser-api.vegetaxxsan.repl.co/games/${query}`
      );
      let myData = await response.json();
      Data = myData.results;
    } catch (e) {
      console.log(e);
    }
    setData(Data);
    setFetchLoading(false);
  };

  useEffect(() => {
    if (search != "") fetchData(setData, search);
  }, [search]);

  const CardList = ({ navigation }) => {
    if (search == "")
      return (
        <>
          {/* <SearchBar search={search} setSearch={setSearch} setData={setData}/> */}
        </>
      );
    if (fetchLoading) return <Loading loading={fetchLoading} />;
    const [loading, setLoading] = useState(true);
    function renderItem({ item, index }) {
      return (
        <Card
          url={item.background_image}
          esrb_rating={item.esrb_rating}
          title={item.name}
          released={item.released}
          rating={item.metacritic}
          platforms={item.parent_platforms}
          genres={item.genres}
          navigation={navigation}
          setData={setData}
        />
      );
    }

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
            data={data}
            renderItem={renderItem}
            estimatedItemSize={data.length}
            onScroll={(e) => {
              scrollOffset.current = e.nativeEvent.contentOffset.y;
            }}
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
                flashListRef.current.scrollToOffset({
                  offset: scrollOffset.current,
                });
              }, 120);
            }}
          />
          <Loading loading={loading} />
        </View>
      </>
    );
  };
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} setData={setData} />
      <Text className="text-white text-xl">Search results for {search}</Text>
      <SearchStack.Navigator
        initialRouteName="home"
        screenOptions={{
          detachPreviousScreen: false,
          transitionSpec: { close: config, open: config },
          headerMode: "float",
        }}
      >
        <SearchStack.Screen
          name="home"
          component={CardList}
          options={{
            headerShown: false,
            transitionSpec: { open: config, close: config },
            presentation: "modal",
          }}
        />
        <SearchStack.Screen
          name="detail"
          options={({ navigation }) => ({
            title: <Title>{data.title}</Title>,
            headerStyle: { backgroundColor: "#181920" },
            headerLeftContainerStyle: { width: "100%" },
            headerMode: "float",
            headerTitleAlign: "center",
            headerShown: headerVisibility,
            transitionSpec: { open: config, close: config },
            headerLeft: () => (
              <MyGoBackBtn
                navigation={navigation}
                flashListRef={flashListRef}
              />
            ),
          })}
        >
          {(props) => (
            <Detail
              {...props}
              setHeaderVisibility={setHeaderVisibility}
              headerVisibility={headerVisibility}
            />
          )}
        </SearchStack.Screen>
      </SearchStack.Navigator>
    </>
  );
};
