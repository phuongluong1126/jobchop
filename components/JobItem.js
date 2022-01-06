import React from "react";
import { Image, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { SetSavedJobs } from "../actions/job";

function JobItem({ item, index }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        width: 180,
        paddingVertical: SIZES.padding*0.4,
        paddingHorizontal: SIZES.padding,
        marginLeft: index == 0 ? SIZES.padding : 0,
        marginRight: SIZES.radius,
        marginBottom:10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
      }}
      onPress={() => navigation.navigate("DetailJobScreen", { job: item })}
    >
      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            source={{ uri: item.Logo }}
            resizeMode="cover"
            style={{
              marginTop: 5,
              width: 25,
              height: 25,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: SIZES.padding * 0.5 }}>
          <Text numberOfLines={1} style={{ ...FONTS.h3 }}>
            {item["Job Title"]}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.gray, ...FONTS.body4 }}
          >
            {item["Company Name"]}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 0,
        }}
      >
        <View style={{ marginTop: SIZES.radius }}>
          <Text style={{ ...FONTS.h3, color: COLORS.primary}}>
            {item.Salary}
          </Text>
          <Text>{`${item.Time} ago`}</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Icon
            name={item.saved ? "bookmark" : "bookmark-border"}
            size={26}
            color={COLORS.primary}
            style={{ zIndex: 1000 }}
            // onPress={() => dispatch(SetSavedJobs(item))}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default JobItem;
