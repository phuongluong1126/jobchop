import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function HeaderBar({ right, filter }) {
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: SIZES.base, flexDirection: "row", alignItems:"center" }}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="arrow-left"
            size={30}
            color={COLORS.primary}
            // onPress={() => navigation.navigate(link)}
          />
          {/* <Image
            source={icons.back_arrow}
            resizeMode="contain"
            style={{ width: 25, height: 25, tintColor: COLORS.gray }}
          /> */}
        </TouchableOpacity>
      </View>

      {right && (
        <View style={{ flex: 1, alignItems: "flex-end", marginRight:10 }}>
          <TouchableOpacity>
            <Icon name="bookmark-border" size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      )}
      {filter && (<Text style={{...FONTS.body3, marginRight:16, color: COLORS.secondary}}>
        Bộ lọc
      </Text>)}
    </View>
  );
}
