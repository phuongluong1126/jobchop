import React, { useRef, useEffect } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Animated,
  Linking,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Chart, CompanyItem, Heading } from "../components";
import { COLORS, events, FONTS, icons, SIZES } from "../constants";
import JobScreen from "./JobScreen";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import { companies, scholars } from "../constants/dummy";
import { SetCompanies, SetJobs } from "../actions/job";
import { getAllCompanies, getAllJobs } from "../api";
import { useDispatch, useSelector } from "react-redux";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;
const banner = require("../assets/images/banner.png");

export default function ExploreScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  let companies = useSelector((state) => state.job.listCompanies);
  companies = companies.slice(0, 10);
  // console.log('COMPANY', companies[0]);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getAllJobs()
  //     .then((data) => {
  //       console.log("number of jobs", data.length);
  //       dispatch(SetJobs(data));
  //     })
  //     .catch((err) => console.log(err));
  //   getAllCompanies().then((data) => {
  //     const listUnique = [...new Set(data.map((item) => item.company))];
  //     console.log("listUnique", listUnique.length);
  //     let listCompanies = [];
  //     listUnique.forEach((item) => {
  //       let tempCom = data.find((com) => com.company === item);
  //       const listJobs = data.filter((com) => com.company === item);
  //       tempCom.listJobs = listJobs;
  //       // console.log('list job length', tempCom.listJobs.length);
  //       listCompanies.push(tempCom);
  //     });
  //     console.log("number of company", listCompanies.length);
  //     dispatch(SetCompanies(listCompanies));
  //   });
  // }, []);

  const renderCompanies = ({ item, index }) => (
    <CompanyItem item={item} index={{ index }} />
  );
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
          style={{ ...styles.card, marginLeft: index == 0 ? SIZES.padding : 0 }}
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
              padding: 10,
            }}
          >
            <View>
              <Text style={{ color: COLORS.primary, ...FONTS.h3, width:185}}  numberOfLines = {1}>
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
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryItemWrapper,
        {
          backgroundColor: COLORS.white,
          marginLeft: item.id == 1 ? 20 : 0,
        },
      ]}
    >
      <Image source={item.icon} style={styles.categoryItemImage} />
      <Text style={styles.categoryItemTitle}>{item.name}</Text>
      <View
        style={[
          styles.categorySelectWrapper,
          {
            backgroundColor: COLORS.primary,
          },
        ]}
      >
        <Text style={{ color: COLORS.white }}>{item.numberOfJob} jobs</Text>
      </View>
    </TouchableOpacity>
  );
  const DATA = [
    { id: 1, name: "Front End", icon: icons.IT, numberOfJob: 400 },
    { id: 2, name: "Back End", icon: icons.design, numberOfJob: 201 },
    { id: 3, name: "FullStack", icon: icons.sale, numberOfJob: 202 },
    { id: 4, name: "Testing", icon: icons.content, numberOfJob: 203 },
    { id: 5, name: "Client Support", icon: icons.admin, numberOfJob: 120 },
    { id: 6, name: "Finance", icon: icons.finance, numberOfJob: 125 },
  ];
  return (
    <ScrollView style={{ backgroundColor: COLORS.background}}>
      <View style={{ flex: 1, paddingBottom: 155 }}>
        <ImageBackground
          source={banner}
          resizeMode="cover"
          style={{ flex: 1, alignItems: "flex-start" }}
        >
          <View style={{ alignItems: "flex-start" }}>
            {/* <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Your expected salary
            </Text> */}
            <Text
              style={{
                margin: SIZES.padding,
                marginLeft: 20,
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Job Chop xin chào!
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 50,
            }}
          >
            <View style={{ position: "absolute", top: 45 }}>
              <Heading name="Lĩnh vực hot" link="Profile" />
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              ></FlatList>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Company */}
      <Heading name="Nhà tuyển dụng hot" link="Profile" />
      <FlatList
        contentContainerStyle={{
          marginTop: SIZES.base,
          marginLeft: 10,
          paddingLeft: 10,
        }}
        data={companies}
        renderItem={renderCompanies}
        keyExtractor={(item) => `${item.ids}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList>

      {/* Event */}
      <Heading name="Sự kiện" link="Profile" />
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.base }}
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList>

      {/* Scholar */}
      <Heading name="Học bổng" link="Profile" />
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.base, marginBottom:50 }}
        data={scholars}
        renderItem={renderEvent}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList>

      {/* Book
      <Heading name="Book" link="Profile" />
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.base }}
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList> */}
    </ScrollView>
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
    padding: 20,
    width: "100%",
  },
});
{
  /* <JobScreen navigation={navigation} />
      <Chart/> */
}
