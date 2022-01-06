import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
const DATA = [
  {
    id: 1,
    icon: "celebration",
    title: "Job về job về !!",
    content:
      "Công ty VNG đã chấp nhận đơn ứng tuyển của bạn. Hãy liên hệ nhà tuyển dụng",
    time: "12/12/2021",
  },
  {
    id: 2,
    icon: "outlet",
    title: "Ứng tuyển bị từ chối",
    content:
      "Công ty XX đã từ chối đơn ứng tuyển của bạn. Keep calm and smile :)",
    time: "12/12/2021",
  },
  {
    id: 3,
    icon: "mood",
    title: "Cóc cóc! HR tìm bạn nè",
    content:
      "Công ty VNG đã chấp nhận đơn ứng tuyển của bạn. Hãy liên hệ nhà tuyển dụng",
    time: "12/12/2021",
  },
  {
    id: 4,
    icon: "celebration",
    title: "Ứng tuyển thành công",
    content:
      "Công ty VNG đã chấp nhận đơn ứng tuyển của bạn. Hãy liên hệ nhà tuyển dụng",
    time: "12/12/2021",
  },
  {
    id: 5,
    icon: "outlet",
    title: "Ứng tuyển bị từ chối",
    content:
      "Công ty XX đã từ chối đơn ứng tuyển của bạn. Keep calm and smile :)",
    time: "12/12/2021",
  },
  {
    id: 6,
    icon: "celebration",
    title: "Ứng tuyển thành công",
    content:
      "Công ty VNG đã chấp nhận đơn ứng tuyển của bạn. Hãy liên hệ nhà tuyển dụng",
    time: "12/12/2021",
  },
  {
    id: 7,
    icon: "outlet",
    title: "Ứng tuyển bị từ chối",
    content:
      "Công ty XX đã từ chối đơn ứng tuyển của bạn. Keep calm and smile :)",
    time: "12/12/2021",
  },
  {
    id: 8,
    icon: "celebration",
    title: "Ứng tuyển thành công",
    content:
      "Công ty VNG đã chấp nhận đơn ứng tuyển của bạn. Hãy liên hệ nhà tuyển dụng",
    time: "12/12/2021",
  },
];
export default function AlertScreen() {
  const renderAlert = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 20,
      }}
    >
      <View>
        <Icon name={item.icon} size={35} color={COLORS.primary} />
      </View>
      <View style={{ paddingHorizontal: SIZES.padding * 0.4 }}>
        <Text numberOfLines={1} style={{ ...FONTS.h3, fontSize: 18 }}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={{ color: COLORS.black, ...FONTS.body3 }}>
          {item.content}
        </Text>
        <Text style={{ color: COLORS.gray }}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? 15 : 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          margin: 20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.header,
            width: "80%",
            paddingLeft: 40,
          }}
        >
          Thông báo
        </Text>
        <View
          style={{
            alignItems: "center",
            width: "20%",
          }}
        >
          <Icon name="inbox" size={26} color={COLORS.primary} />
          {/* <Text>Tin nhắn</Text> */}
        </View>
      </View>
      <ScrollView>{DATA.map((item) => renderAlert({ item: item }))}</ScrollView>
    </SafeAreaView>
  );
}
