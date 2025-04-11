import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

const timetable = () => {
  const [timetable, setTimetable] = useState([
    {
      day: "Monday",
      classes: [{ time: "08:00 - 09:00", subject: "Math" }],
    },
    {
      day: "Tuesday",
      classes: [],
    },
    {
      day: "Wednesday",
      classes: [],
    },
    {
      day: "Thursday",
      classes: [],
    },
    {
      day: "Friday",
      classes: [],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const openAddModal = (day) => {
    setSelectedDay(day);
    setNewTime("");
    setNewSubject("");
    setModalVisible(true);
  };

  const addClass = () => {
    setTimetable((prev) =>
      prev.map((item) =>
        item.day === selectedDay
          ? {
              ...item,
              classes: [
                ...item.classes,
                { time: newTime, subject: newSubject },
              ],
            }
          : item
      )
    );
    setModalVisible(false);
  };

  const handleDelete = (day, index) => {
    setTimetable((prev) =>
      prev.map((item) =>
        item.day === day
          ? {
              ...item,
              classes: item.classes.filter((_, i) => i !== index),
            }
          : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {timetable.map((dayItem, index) => (
        <View key={index} style={styles.daySection}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayText}>{dayItem.day}</Text>
            <Button title="+ Add" onPress={() => openAddModal(dayItem.day)} />
          </View>
          {dayItem.classes.map((cls, i) => (
            <View key={i} style={styles.classItem}>
              <Text style={styles.time}>{cls.time}</Text>
              <Text style={styles.subject}>{cls.subject}</Text>
              <Button
                title="Delete"
                color="red"
                onPress={() => handleDelete(dayItem.day, i)}
              />
            </View>
          ))}
        </View>
      ))}

      {/* Modal to Add Class */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Add class to {selectedDay}</Text>
            <TextInput
              placeholder="Time (e.g. 10:00 - 11:00)"
              value={newTime}
              onChangeText={setNewTime}
              style={styles.input}
            />
            <TextInput
              placeholder="Subject"
              value={newSubject}
              onChangeText={setNewSubject}
              style={styles.input}
            />
            <Button title="Add" onPress={addClass} />
            <Button
              title="Cancel"
              color="grey"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  daySection: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classItem: {
    padding: 8,
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 6,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
  },
  subject: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 6,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});

export default timetable;
