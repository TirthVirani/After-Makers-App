import { TextInput, View } from "react-native";
import styles from "./style";

const CommonInput = ({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  numberOfLines,
  maxLength,
  keyboardType,
  inputMode
}) => {
  return (
    <View>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        keyboardAppearance="dark"
        selectionColor="#FFFFFF"
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        keyboardType={keyboardType}
        inputMode={inputMode}
        // inputMode='numeric'
        // keyboardType='phone-pad'
      />
    </View>
  );
};

export default CommonInput;
