import { View, Text } from "react-native";
import { memo } from "react";
export default  memo(({children}) => {
  let textSize = 'text-2xl'
  if(children.length>17) textSize='text-lg'
  if(children.length>25) textSize='text-sm'
  if(children.length>30) textSize='text-xs'
  return (
    <>
      <Text className={`text-center font-bold ${textSize}  text-white py-4 bg-transparent`}>
        {children}
      </Text>
    </>
  );
})