import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {HelloWave} from "@/components/HelloWave";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from './ThemedView';

interface CardProps {
  title: string;
  date: string;
  description: string;
  isRead?: boolean;
}

const Card = (props: CardProps) => {
  return (
    <ThemedView style={[styles.container/*, {backgroundColor: 'black'}*/]}>
      <ThemedView style={[styles.titleRow/*, {backgroundColor: 'black'}*/]}>
        {props.isRead ? null : (
          <ThemedView style={[styles.iconContainer/*, {backgroundColor: 'black'}*/]}>
            <HelloWave/>
          </ThemedView>
        )}
        <ThemedText type='default' style={props.isRead ? null : {marginRight: 20}}>
          {props.title}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.dateRow/*, {backgroundColor: 'black'}*/]}>
        <ThemedText style={styles.dateText}>{props.date}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.descriptionRow/*, {backgroundColor: 'black'}*/]}>
        <ThemedText>{props.description}</ThemedText>
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
