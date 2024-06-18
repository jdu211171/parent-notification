import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {HelloWave} from "@/components/HelloWave";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from './ThemedView';
import {Link} from "expo-router";

interface Message {
  title: string;
  date?: string;
  description: string;
  viewed_at?: string;
}

const Card = ({ message }: { message: Message }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleRow}>
        {message.viewed_at !== '' ? null : (
          <ThemedView style={styles.iconContainer}>
            <HelloWave/>
          </ThemedView>
        )}
        <ThemedText type='default' style={message.viewed_at ? null : {marginRight: 20}}>
          {message.title}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.dateRow}>
        <ThemedText style={styles.dateText}>{message.date || '21 Oct 2017'}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.descriptionRow}>
        <ThemedText>{message.description}</ThemedText>
      </ThemedView>
      <TouchableOpacity style={styles.readMoreButton}>
        <ThemedText style={styles.readMoreText}>
          Continue reading
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flex: 1,
  },
  readMoreButton: {
    marginTop: 5,
  },
  readMoreText: {
    color: '#059669',
    fontWeight: '600',
  },
});

export default Card;
