import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 4,
    elevation: 1,
    backgroundColor: '#059669',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  danger: {
    backgroundColor: '#DC2626',
  }
});

export default function Button(props: {
  onPress: any;
  title?: string | undefined;
  type?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'danger';
}) {
  const {onPress, title = 'Save'} = props;

  return (
    <Pressable
      style={[styles.button, props.type === 'danger' ? styles.danger : undefined]}
      onPress={onPress}>
      <ThemedText style={styles.text}>
        {title}
      </ThemedText>
    </Pressable>
  );
}
