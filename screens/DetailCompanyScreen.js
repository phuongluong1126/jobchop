import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { HeaderBar, Heading, JobItem, MatchScore } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlatGrid } from "react-native-super-grid";
import { companies } from "../constants/dummy";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getRelatedJobs } from "../api";
import Icon from "react-native-vector-icons/MaterialIcons";
const Tab = createMaterialTopTabNavigator();

const listSkills = ["HTML5", "CSS", "Java", "PHP"];

export default function DetailCompanyScreen({ route, navigation }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const jobData = useSelector((state) => state.job.listJobs);
  useEffect(() => {
    const { company } = route.params;
    console.log("COMPANY", company.key_skill);

    setSelectedCompany(company);
  }, []);
  let listJobs = [];
  if (selectedCompany)
    listJobs = jobData.filter(
      (item) => item["Company Name"] == selectedCompany.company
    );
  console.log("listJobs", listJobs.length);
  //   useEffect(() => {
  //     if (selectedJob) {
  //       getRelatedJobs(selectedJob["Job Title"]).then((data) => {
  //         let relatedList = [];
  //         data.forEach((item) => {
  //           const job = listJobs.find((element) => element.Id === item.id);
  //           // console.log('job',job);
  //           relatedList.push(job);
  //         });
  //         setRelatedJobs(relatedList.slice(0, 15));
  //       });
  //     }
  //   }, [selectedJob]);

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
          marginRight: 10,
          paddingHorizontal: 5,
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

  //   const RelatedJobs = () => (
  //     <FlatGrid
  //       itemDimension={130}
  //       data={relatedJobs}
  //       style={styles.gridView}
  //       spacing={10}
  //       renderItem={({ item }) => (
  //         <JobItem item={item} index={item.id} key={`RelatedJobs${item.id}`} />
  //       )}
  //     />
  //   );

  return selectedCompany ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray1,
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <HeaderBar right={true} />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image
            source={{ uri: selectedCompany.logo }}
            resizeMode="cover"
            style={{
              alignSelf: "center",
              width: 80,
              height: 80,
            }}
          />
        </View>
        <Text
          style={{
            ...FONTS.h2,
            alignSelf: "center",
            paddingTop: 15,
            color: COLORS.blackgray,
          }}
        >
          {selectedCompany.company.toUpperCase()}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            alignSelf: "center",
            paddingHorizontal: 20,
            textAlign: "center",
            color: COLORS.gray,
          }}
        >
          {selectedCompany.slogan}
        </Text>
        <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}>
          <FlatList
            contentContainerStyle={{
              marginTop: SIZES.base,
              alignSelf: "center",
            }}
            data={selectedCompany.key_skill}
            renderItem={renderSkill}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginTop: 15,
          }}
        >
          <Icon name="place" size={21} color={COLORS.secondary} />
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: "center",
              paddingHorizontal: 5,
              marginRight: 10,
              color: COLORS.blackgray,
            }}
          >
            Địa chỉ: {selectedCompany.address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Icon name="event" size={20} color={COLORS.secondary} />
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: "center",
              paddingHorizontal: 5,
              color: COLORS.blackgray,
            }}
          >
            Lịch làm việc: {selectedCompany.calender}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Icon name="settings" size={20} color={COLORS.secondary} />
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: "center",
              paddingHorizontal: 5,
              color: COLORS.blackgray,
            }}
          >
            Loại hình: {selectedCompany.typeCompany}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Icon name="mood" size={20} color={COLORS.secondary} />
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: "center",
              paddingHorizontal: 5,
              color: COLORS.blackgray,
            }}
          >
            OT: {selectedCompany.ot}
          </Text>
        </View>
        {selectedCompany["why_you_work_here"].length > 1 && (
          <View>
            <Text
              style={{
                color: COLORS.primary,
                ...FONTS.h2,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Điểm nổi bật
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              {selectedCompany["why_you_work_here"].map(
                (item, index) =>
                  item.length > 1 && (
                    <Text
                      key={index}
                      style={{
                        ...FONTS.body3,
                        alignSelf: "center",
                        paddingHorizontal: 20,
                        color: COLORS.blackgray,
                        textAlign: "justify",
                        width: "100%",
                      }}
                    >
                      - {item}
                    </Text>
                  )
              )}
            </View>
          </View>
        )}

        {/* Giới thiệu */}
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h2,
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          Giới thiệu
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {selectedCompany.overview.map(
            (item, index) =>
              item.length > 1 && (
                <Text
                  key={index}
                  style={{
                    ...FONTS.body3,
                    alignSelf: "center",
                    paddingHorizontal: 20,
                    color: COLORS.blackgray,
                    textAlign: "justify",
                    width: "100%",
                  }}
                >
                  - {item}
                </Text>
              )
          )}
        </View>

        {/* Mô tả */}
        {selectedCompany.description.length > 1 && (
          <View>
            <Text
              style={{
                color: COLORS.primary,
                ...FONTS.h2,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Chi tiết
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              {selectedCompany.description.map(
                (item, index) =>
                  item.length > 1 && (
                    <Text
                      key={index}
                      style={{
                        ...FONTS.body3,
                        alignSelf: "center",
                        paddingHorizontal: 20,
                        color: COLORS.blackgray,
                        textAlign: "justify",
                        width: "100%",
                      }}
                    >
                      - {item}
                    </Text>
                  )
              )}
            </View>
          </View>
        )}
     <Text style={{
          marginLeft: SIZES.padding,
          color: COLORS.primary,
          ...FONTS.h2,
          marginTop: 20,
          marginBottom:10
        }}
      >
       Công việc đang tuyển
      </Text>
        {listJobs.length > 0 && <FlatList
          style={{marginBottom:20}}
          data={listJobs}
          renderItem={({ item }) => (
            <JobItem item={item} index={item.id} key={`FoundJobs${item.Id}`} />
          )}
          keyExtractor={(item) => `FoundJobs${item.Id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        ></FlatList>}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Text>Loading</Text>
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
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
    marginTop: 10,
    marginBottom: 65,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    width: 200,
  },
});
