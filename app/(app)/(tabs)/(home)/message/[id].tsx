import {useLocalSearchParams} from 'expo-router';
import {StyleSheet} from 'react-native';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useSQLiteContext} from "expo-sqlite";
import React, {useEffect, useState} from "react";

interface Message {
  content: string;
  date: string;
  group_name: string;
  id: number;
  image: string;
  priority: string;
  read_status: number;
  read_time: string | null;
  sent_status: number;
  sent_time: string | null;
  student_id: number;
  title: string;
}

export default function DetailsScreen() {
  const {id} = useLocalSearchParams();
  const db = useSQLiteContext();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      const result = await db.getFirstAsync('SELECT * FROM message WHERE id = ?', [Number(id)]);
      setMessage(result as Message);
    };

    fetchMessage()
        .then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    console.log(message);
  }, [message]);

  if (loading && !message) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleRow}>
          <ThemedText type='default'>
            {message?.title}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.dateRow}>
          <ThemedText style={styles.dateText}>{message?.date}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.descriptionRow}>
          <ThemedText>{message?.content}</ThemedText>
        </ThemedView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  iconContainer: {
    padding: 5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '300',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  readMoreButton: {
    marginTop: 5,
  },
  readMoreText: {
    color: '#059669',
    fontWeight: '600',
  },
});
