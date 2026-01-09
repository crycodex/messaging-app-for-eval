import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Icon } from "../Icon/Icon";

export interface ActionSheetOption {
  label: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  options: ActionSheetOption[];
  title?: string;
}

export function ActionSheet({
  visible,
  onClose,
  options,
  title,
}: ActionSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {title && <Text style={styles.title}>{title}</Text>}

              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    option.disabled && styles.optionDisabled,
                  ]}
                  onPress={() => {
                    if (!option.disabled) {
                      option.onPress();
                      onClose();
                    }
                  }}
                  disabled={option.disabled}
                >
                  <Icon
                    name={option.icon}
                    size={24}
                    color={option.disabled ? "#999" : "#007AFF"}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      option.disabled && styles.optionTextDisabled,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#333",
  },
  optionTextDisabled: {
    color: "#999",
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
});
