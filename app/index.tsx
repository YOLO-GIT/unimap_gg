import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ✅ Correct usage of href as a string */}
      <Link href="/timetable">
        <Text style={{ color: "blue" }}>Go to Timetable</Text>
      </Link>

      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
