import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
  },
  menu: {
    width: 'auto',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
    padding: 8,
    position: 'absolute',
    top: '100%',
    left: 20,
    marginLeft: -80,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  optionText: {
    color: '#4A5568',
  },
});

const PopupMenu = ({
                     options,
                     selectedValue
                   }: {
  options: Array<{
    icon: string;
    label: string;
    action: () => void;
    lightColor: string;
    darkColor: string;
  }>;
  selectedValue: { icon: string; label: string; action: () => void; lightColor: string; darkColor: string; };
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue || options[0])
  const handleToggleMenu = () => setShowMenu(!showMenu);
  const handleMenuOption = (option: any) => {
    option.action();
    handleSelectOption(option);
  };
  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    setShowMenu(false);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleMenu}>
        <Text>{selectedOption.label}</Text>
      </TouchableOpacity>

      {showMenu && (
        <View style={styles.menu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleMenuOption(option)}>
              <Text style={styles.optionText}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
export default PopupMenu;
