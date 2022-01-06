import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, FONTS, SIZES } from "../constants";

export default function Heading({ link, name }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingRight: 10,
      }}
    >
      <Text
        style={{
          marginLeft: SIZES.padding,
          color: COLORS.primary,
          ...FONTS.h2,
        }}
      >
        {name}
      </Text>
      {link && (
        <Feather
          name="chevron-right"
          size={25}
          color={COLORS.primary}
          onPress={() => navigation.navigate(link)}
        />
      )}
    </View>
  );
}
