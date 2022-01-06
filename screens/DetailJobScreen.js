import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { HeaderBar, Heading, JobItem, MatchScore } from "../components";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, FONTS, jobs, SIZES } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlatGrid } from "react-native-super-grid";
import { companies } from "../constants/dummy";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedJobs } from "../api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SetSavedJobs } from "../actions/job";
const Tab = createMaterialTopTabNavigator();
const dummyDescription = [
  "Responsible for the translation of product design wireframes to actual code, including developing and maintaining all the BAEMIN’s external web services, such as brand websites, internal operating web services and API server if needed.",
  "Build and develop web features on given requirements, collaborate effectively with product designers and backend engineers for external web services, operators who use internal operating service and backend engineers which provide API;",
  "Analyze, propose and implement solutions to complex and flexible business features;",
  "Maintain and improve high-quality in-house JavaScript libraries and toolsets following product design guidelines;",
  "Work closely with other junior engineers, involve them in constructive and concise code review with peers, especially junior ones.",
  "2. Other tasks assigned by Line Manager",
];
const listSkills = ["HTML5", "CSS", "Java", "PHP"];
export default function DetailJobScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState(null);
  const listCompanies = useSelector((state) => state.job.listCompanies);
  const listJobs = useSelector((state) => state.job.listJobs);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const company =
    selectedJob && listCompanies
      ? listCompanies.find(
          (item) => item.company === selectedJob["Company Name"]
        )
      : null;
  useEffect(() => {
    const { job } = route.params;
    // console.log('JOB', job);
    setSelectedJob(job);
  }, []);

  useEffect(() => {
    if (selectedJob) {
      getRelatedJobs(selectedJob["Job Title"]).then((data) => {
        let relatedList = [];
        data.forEach((item) => {
          const job = listJobs.find((element) => element.Id === item.id);
          // console.log('job',job);
          relatedList.push(job);
        });
        setRelatedJobs(relatedList.slice(0, 15));
      });
    }
  }, [selectedJob]);
  if (selectedJob) console.log('COME TO DEATIL SCREEN',selectedJob.score);

  const renderSkill = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.secondary,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
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
  const DetailJob = () => {
    return (
      <View>
        <ScrollView style={{ paddingHorizontal: 15 }}>
          {selectedJob.score ? <MatchScore score={selectedJob.score} /> : <MatchScore />}
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
            Mô tả công việc
          </Text>
          {selectedJob["Job Desription"].map((item, index) => (
            <Text
              style={{
                ...FONTS.body3,
                lineHeight: 25,
                paddingBottom: 5,
                textAlign: "justify",
              }}
              key={index}
            >
              - {item}
            </Text>
          ))}
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Yêu cầu</Text>
          {selectedJob.Requirements.map((item, index) => (
            <Text
              style={{
                ...FONTS.body3,
                lineHeight: 25,
                paddingBottom: 5,
                textAlign: "justify",
              }}
              key={index}
            >
              - {item}
            </Text>
          ))}
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Lợi ích</Text>
          {selectedJob.Benefits.map((item, index) => (
            <Text
              style={{
                ...FONTS.body3,
                lineHeight: 25,
                paddingBottom: 5,
                textAlign: "justify",
              }}
              key={index}
            >
              - {item}
            </Text>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => {Linking.openURL(selectedJob.Link)}}>
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Ứng tuyển ngay
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Company = () => {
    return (
      company && (
        <ScrollView style={{ flex: 1 }}>
          {/* <View>
          <Image
            source={{ uri: company.logo }}
            resizeMode="cover"
            style={{
              alignSelf: "center",
              marginTop: 10,
              width: 60,
              height: 60,
            }}
          />
        </View> */}
          <Text
            style={{
              ...FONTS.h2,
              alignSelf: "center",
              paddingTop: 15,
              color: COLORS.blackgray,
            }}
          >
            {company.company.toUpperCase()}
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
            {company.slogan}
          </Text>
          <View style={{ flex: 1, alignItems: "center" }}>
            <FlatList
              contentContainerStyle={{
                marginTop: SIZES.base,
                alignSelf: "center",
              }}
              data={company.key_skill}
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
            Địa chỉ: {company.address}
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
            Lịch làm việc: {company.calender}
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
            Loại hình: {company.typeCompany}
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
            OT: {company.ot}
          </Text>
        </View>
        {company["why_you_work_here"].length > 1 && (
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
              {company["why_you_work_here"].map(
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
          {company.overview.map(
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
        {company.description.length > 1 && (
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
              {company.description.map(
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
        </ScrollView>
      )
    );
  };
  const RelatedJobs = () => {
    return (
      <FlatGrid
        itemDimension={130}
        data={relatedJobs}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <JobItem item={item} index={item.id} key={`RelatedJobs${item.id}`} />
        )}
      />
    );
  };

  return selectedJob ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray1,
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
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

        <View style={{ flex: 1, alignItems: "flex-end", marginRight:10 }}>
          <TouchableOpacity
onPress={() => dispatch(SetSavedJobs(selectedJob))}
          >
            <Icon name={selectedJob.saved ? "bookmark" : "bookmark-border"} size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

    </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
          // marginHorizontal:20,
          paddingHorizontal: 20,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <View>
          <Image
            source={{ uri: selectedJob.Logo }}
            resizeMode="cover"
            style={{
              marginTop: 5,
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View style={{ paddingLeft: SIZES.padding * 0.5 }}>
          <Text
            // numberOfLines={1}
            style={{ ...FONTS.h2, color: COLORS.primary, fontSize: 20 }}
          >
            {selectedJob["Job Title"]}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.black, ...FONTS.body3 }}
          >
            {selectedJob["Company Name"]}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
          {company.country}
        </Text>
        <Text style={{ ...FONTS.body3, color: COLORS.gray }}>
          {company.member} member
        </Text>

        <Text
          style={{ ...FONTS.body3, color: COLORS.gray }}
        >{`${selectedJob.Time} ago`}</Text>
      </View>

      {/* Detail */}
      <Tab.Navigator
        style={{
          marginTop: 5,
          // marginHorizontal: 20,
        }}
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            justifyContent: "center",
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
            width: "28%",
            left: 10,
          },
        }}
      >
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                Thông tin
              </Text>
            ),
          }}
          component={DetailJob}
          name="DetailJob"
        />
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                Công ty
              </Text>
            ),
          }}
          component={Company}
          name="Company"
        />
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                Tương tự
              </Text>
            ),
          }}
          component={RelatedJobs}
          name="RelatedJobs"
        />
      </Tab.Navigator>
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
    alignSelf: "center",
    padding: 10,
    borderRadius: 20,
    margin: 20,
    width: 200,
    position: "absolute",
    bottom: 10,
  },
});
