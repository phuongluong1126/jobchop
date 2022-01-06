import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.9;
export default function CompanyItem({ item, index, big }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetailCompanyScreen", { company: item })
      }
    >
      <View
        style={{
          ...styles.card,
          width: big ? cardWidth * 1.5 : cardWidth,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              marginTop: 15,
              marginBottom: 0,
              marginRight: 0,
              width: big ? cardWidth : cardWidth * 0.7,
            }}
          >
            <View>
              <Image
                source={{ uri: item.logo }}
                resizeMode="cover"
                style={{
                  marginRight: 0,
                  width: 50,
                  height: 50,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                width: big ? cardWidth : cardWidth * 0.58,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ color: COLORS.black, ...FONTS.h3 }}
              >
                {item.company}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: COLORS.gray, ...FONTS.body4 }}
              >
                {item.country}
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Icon name="bookmark-border" size={26} color={COLORS.primary} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: 10,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primary,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              marginRight: 0,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                padding: 4,
                paddingRight: 10,
                paddingLeft: 10,
                ...FONTS.body3,
              }}
            >
              {item.listJobs.length} jobs
            </Text>
          </View>
          <Text style={{ color: COLORS.primary, marginLeft: 10, ...FONTS.h3 }}>
            {item.typeCompany}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  card: {
    height: 115,
    width: cardWidth,
    elevation: 8,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 150,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 45,
    width: 58,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    height: 150,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
});
