import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, FONTS, jobs, SIZES } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Heading, JobItem } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import { URL } from "../api";

const Tab = createMaterialTopTabNavigator();

export default function JobScreen({}) {
  console.log("COME TO SERCH SCREEN");
  const dispatch = useDispatch();
  const listJobs = useSelector((state) => state.job.listJobs);
  // console.log('ITEM', listJobs[0]);
  const savedJobs = listJobs.filter((item) => item.saved == true);
  const navigation = useNavigation();
  const user = useSelector((state) => state.job.infoUser);
  const searchFilter = useSelector((state) => state.job.infoUser.location);
  const [recommendListJobs, setRecommendListJobs] = useState([]);
  useEffect(() => {
    // Result jobs
    if (user.skill) {
      let stringSkill = "";
      user.skill.map((item, index) =>
        index > 0
          ? (stringSkill = stringSkill.concat("|", item))
          : (stringSkill = stringSkill.concat(item))
      );
      if (stringSkill.length > 0) {
        const link = `${URL}/search?skill=${stringSkill}`;
        fetch(link)
          .then((res) => res.json())
          .then((data) => {
            const tempListJobs = data.map((item) => {
              const job = listJobs.find((element) => element.Id == item["id"]);
              if (job) {
                job.score = Math.round(item["similar"] * 100);
                // console.log("job.score", job.score);
                return job;
              }
            });
            console.log("tempListJobs with skill", tempListJobs.length);
            if (tempListJobs.length > 0) setRecommendListJobs(tempListJobs);
            else setFoundJobs([]);
          });
      }
    }
    let tempListData = [];
    if (searchFilter && recommendListJobs.length > 0) {
        let location = "";
        switch (searchFilter) {
          case "Hồ Chí Minh":
            location = "Ho Chi Minh";
            break;
          case "Hà Nội":
            location = "Ha Noi";
            break;
          case "Đà Nẵng":
            location = "Da Nang";
            break;
          default:
            break;
        }
      tempListData = recommendListJobs.filter((item) => {
        // console.log('ITEM.PROVINCE', item.Province);
        return item.Province.includes(location);
      });
          console.log("LIST with location", tempListData.length);
    setRecommendListJobs(tempListData);
    }

  }, [listJobs, user]);
  // const recommendListJobs = () => {

  //   return tempListJobs;
  // }

  const RecommendJobs = () => {
    if (recommendListJobs.length > 0)
      return (
        <FlatGrid
          itemDimension={130}
          data={recommendListJobs}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <JobItem
              item={item}
              index={item.id}
              key={`recommendListJobs${item.id}`}
            />
          )}
        />
      );
    else
      return (
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.secondary,
            alignSelf: "center",
            marginTop: 50,
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          Job về Job về ...
        </Text>
      );
  };
  // const AppliedJobs = () => (
  //   <FlatGrid
  //     itemDimension={130}
  //     data={listJobs.slice(5,15)}
  //     style={styles.gridView}
  //     spacing={10}
  //     renderItem={({ item }) => (
  //       <JobItem item={item} index={item.id} key={`AppliedJobs${item.id}`} />
  //     )}
  //   />
  // );
  const SavedJobs = () => {
    if (savedJobs.length > 0)
      return (
        <FlatGrid
          itemDimension={130}
          data={savedJobs}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <JobItem item={item} index={item.id} key={`SavedJobs${item.id}`} />
          )}
        />
      );
    else
      return (
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.secondary,
            alignSelf: "center",
            marginTop: 50,
          }}
        >
          Chưa lưu công việc nào :v
        </Text>
      );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <Text style={{ ...FONTS.body3, marginLeft: 10, color: COLORS.gray }}>
          Tìm kiếm thêm công việc & nhà tuyển dụng
        </Text>

        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Feather name="search" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            justifyContent: "center",
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
            width: "40%",
            left: 15,
          },
        }}
      >
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                Đề xuất
              </Text>
            ),
          }}
          component={RecommendJobs}
          name="RecommendJobs"
        />
        {/* <Tab.Screen
            options={{
              title: () => (
                <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                  Ứng tuyển
                </Text>
              ),
            }}
            component={AppliedJobs}
            name="AppliedJobs"
          /> */}
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Đã Lưu</Text>
            ),
          }}
          component={SavedJobs}
          name="SavedJobs"
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  sortBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {
    margin: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
