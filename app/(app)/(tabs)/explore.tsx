import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const buttons = ['absence', 'lateness', 'leaving', 'other'];
  const [activeButton, setActiveButton] = useState(buttons[0]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState('');
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ParallaxScrollView
          headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
          headerImage={<Ionicons size={310} name="reader-outline" style={styles.headerImage}/>}>
          <ThemedText style={styles.textCenter}>
            Please submit applications by the 8:30 of that day.
          </ThemedText>
          <View>
            <ThemedText style={styles.textSmall}>
              Reason for application
            </ThemedText>

            <View style={styles.reason}>
              {buttons.map(button => (
                <Pressable
                  key={button}
                  style={activeButton === button ? styles.activeButton : styles.button}
                  onPress={() => setActiveButton(button)}>
                  <ThemedText
                    type='smaller'
                    style={activeButton === button ? styles.activeButtonText : styles.buttonText}>
                    {button}
                  </ThemedText>
                </Pressable>
              ))}
            </View>

          </View>
          <View>
            <ThemedText style={styles.textSmall}>Choose a date</ThemedText>
            <Pressable
              style={styles.datePicker}
              onPress={showDatepicker}>
              <Ionicons name="calendar-outline" size={24} color="grey"/>
              <ThemedText style={styles.textCenter}>
                {date.toLocaleDateString()}
              </ThemedText>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View style={styles.textInputContainer}>
            <ThemedText style={styles.textSmall}>
              Additional message
            </ThemedText>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
              onChangeText={setText}
              value={text}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              console.log('Submit form');
            }}>
            <ThemedText style={styles.submitButtonText}>Submit Form</ThemedText>
          </TouchableOpacity>

        </ParallaxScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textCenter: {
    fontSize: 16,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
    marginBottom: 4,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
  },
  datePicker: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    gap: 20,
  },
  textInputContainer: {
    height: 144,
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },



  reason: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {
    padding: 8,
    flex: 1,
    borderRadius: 4,
  },
  activeButton: {
    padding: 8,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#059669',
  },
  buttonText: {
    textAlign: 'center',
  },
  activeButtonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});
