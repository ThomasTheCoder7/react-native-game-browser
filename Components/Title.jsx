import { View, Text } from "react-native";
import { memo } from "react";
export default  memo(({children}) => {
  return (
    <>
      <Text className="text-center font-bold text-2xl  text-white py-4 w-full">
        {children}
      </Text>
    </>
  );
})