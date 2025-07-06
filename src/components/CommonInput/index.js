import { TextInput, View } from "react-native";
import styles from "./style";
import { Colors } from "../../constant/Colors";

const CommonInput = ({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  numberOfLines,
  maxLength,
  keyboardType,
  inputMode,
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
        selectionColor={Colors.tintColor_black}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        keyboardType={keyboardType}
        inputMode={inputMode}
      />
    </View>
  );
};

export default CommonInput;
