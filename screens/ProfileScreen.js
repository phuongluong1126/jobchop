import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS, events, FONTS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Heading, JobItem } from "../components";
import { useNavigation } from "@react-navigation/native";

const ava = require("../assets/images/ava.png");
const banner = require("../assets/images/banner.png");
const listSkills = ["ReactJs", "HTML", "CSS", "NodeJs"];
const listSkills2 = ["Dart", "JavaScript", "Python", "Mongo"];
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

export default function ProfileScreen({}) {
  const navigation = useNavigation();
  const user = useSelector((state) => state.job.infoUser);
  console.log('USER',user);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const renderEvent = ({ item, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.motorola.com")}
      >
        <View
          style={{
            ...styles.card,
            marginLeft: index == 0 ? SIZES.padding : 0,
          }}
        >
          <View style={{ ...styles.cardOverLay }} />
          <View style={styles.priceTag}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {item.isOpen ? "Open" : "Closed"}
            </Text>
          </View>
          <Image source={item.image} style={styles.cardImage} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              // padding: 10,
            }}
          >
            <View>
              <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                {item.name}
              </Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                {item.host}
              </Text>
            </View>
            <Icon name="bookmark-border" size={26} color={COLORS.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderSkill = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.secondary,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          marginHorizontal: 5,
          // paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            color: COLORS.blackgray,
            padding: 4,
            paddingRight: 10,
            paddingLeft: 10,
            ...FONTS.body3,
          }}
        >
          {item}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            paddingRight: 20,
            position: "absolute",
            top: 0,
            right: 10,
            flexDirection: "column",
            alignItems: "center",
          }}
          onPress={()=> navigation.navigate('UpdateProfile')}
        >
          <Icon name="edit" size={27} color={COLORS.primary} />
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              fontSize: 20,
            }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
        <Image style={styles.userImg} source={ava} />
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            marginTop: 10,
            padding: 4,
            fontSize: 23,
          }}
        >
          Hello
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Icon name="place" size={24} color={COLORS.primary} />
          <Text
            style={{
              ...FONTS.body3,
              fontSize: 18,
              alignSelf: "center",
              paddingHorizontal: 5,
              color: COLORS.blackgray,
            }}
          >
            {user.location ? user.location : 'Vị trí ?'}
          </Text>
        </View>
        <Text style={{ ...FONTS.h2, color: COLORS.blackgray }}>
         {user.cate?user.cate :'Chuyên ngành?'} - {user.exper?user.exper :'Kinh nghiệm?'}
        </Text>

        <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          {user.skill && <FlatList
            contentContainerStyle={{
              marginTop: SIZES.base,
              alignSelf: "center",
            }}
            data={user.skill}
            renderItem={renderSkill}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          ></FlatList>}
        </View>
        <View style={{ marginTop: 20 }}></View>
        <Heading name="Sự kiện theo dõi" link="Profile" />
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.base }}
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // paddingRight: 20,
    marginTop: 20,
  },
  userImg: {
    height: 160,
    width: 160,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  categoryItemWrapper: {
    width: 100,
    height: 100,
    margin: 10,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  categoryItemImage: {
    width: 40,
    height: 40,
    marginTop: 5,
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: COLORS.primary,
    // marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: "center",
    fontSize: 14,
  },
  categorySelectWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    width: 70,
    height: 24,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: "center",
  },
  card: {
    height: 220,
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
    // padding: 20,
    width: "100%",
  },
});
