import React, {useEffect, useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Separator} from "@/components/atomic/separator";
import Card from "@/components/card";
import {ThemedView} from "@/components/ThemedView";
import {useSQLiteContext} from "expo-sqlite";
import {useSession} from "@/contexts/auth-context";
import NetInfo from '@react-native-community/netinfo';
import {Link} from "expo-router";

interface Message {
  id: number;
  title: string;
  description: string;
  priority: string;
  viewed_at: string;
  group_name: string;
  image: string[];
}

function HomeScreen() {
  const db = useSQLiteContext();
  const token = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const fetchMessagesFromAPI = async () => {
    const response = await fetch('https://e45np4n3jb.execute-api.ap-northeast-1.amazonaws.com/mock/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token.session as string).access_token}`,
      },
      body: JSON.stringify({
        "student_id": 1,
        "last_post_id": 0
      }),
    });
    return await response.json();
  };
  const fetchMessagesFromDB = async () => {
    return await db.getAllAsync('SELECT * FROM message');
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const data = await fetchMessagesFromAPI();
        const statement = await db.prepareAsync(
          'INSERT OR IGNORE INTO message (id, title, date, content, priority, group_name, image, read_status, read_time, sent_status, sent_time, student_id) VALUES ($id, $title, $date, $content, $priority, $group_name, $image, $read_status, $read_time, $sent_status, $sent_time, $student_id)'
        );
        try {
          for (const item of data) {
            await statement.executeAsync({
              $id: item.id,
              $title: item.title,
              $date: item.date || new Date().toISOString().slice(0, 19).replace('T', ' '),
              $content: item.description,
              $priority: item.priority,
              $group_name: item.group_name,
              $image: item.image[0],
              $read_status: 0,
              $read_time: null,
              $sent_status: 0,
              $sent_time: null,
              $student_id: 211171,
            });
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          await statement.finalizeAsync();
        }
        setMessages(data);
      } else {
        const data = await fetchMessagesFromDB();
        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.content,
          priority: item.priority,
          viewed_at: item.read_time,
          group_name: item.group_name,
          image: [item.image]
        }));
        setMessages(formattedData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ThemedView>
          <ScrollView>
            {messages.map((messages, index) => (
              <React.Fragment key={index}>
                {messages.viewed_at ? (
                  <ThemedView style={styles.cardOpacity}>
                    <Card
                      title={messages.title}
                      description={messages.description}
                      date={messages.viewed_at}
                      isRead={true}
                    />
                  </ThemedView>
                ) : (
                  <Card
                    title={messages.title}
                    description={messages.description}
                    date={messages.viewed_at}
                    isRead={false}
                  />
                )}
                <Separator orientation="horizontal"/>
              </React.Fragment>
            ))}
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardOpacity: {
    opacity: 0.4,
  },
});

export default HomeScreen;
