import { icons } from "@/constants/icons";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { styled } from "nativewind";
import React, { useCallback, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const categories = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

const categoryColors: Record<string, string> = {
  Entertainment: "#f5c542",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#b8e8d0",
  Productivity: "#d8d8f0",
  Cloud: "#c0e2f7",
  Music: "#fbd5e5",
  Other: "#dfe3f1",
};

type Frequency = "Monthly" | "Yearly";

export interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (subscription: Subscription) => void;
}

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [category, setCategory] = useState<string>(categories[0]);
  const [touched, setTouched] = useState(false);

  const priceValue = useMemo(() => Number(price), [price]);
  const nameValid = name.trim().length > 0;
  const priceValid = !Number.isNaN(priceValue) && priceValue > 0;
  const canSubmit = nameValid && priceValid;

  const reset = useCallback(() => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory(categories[0]);
    setTouched(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setTouched(true);
    if (!canSubmit) {
      return;
    }

    const startDate = dayjs();
    const renewalDate =
      frequency === "Monthly"
        ? startDate.add(1, "month")
        : startDate.add(1, "year");

    const newSubscription: Subscription = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      icon: icons.wallet,
      name: name.trim(),
      price: priceValue,
      currency: "USD",
      billing: frequency,
      renewalDate: renewalDate.toISOString(),
      startDate: startDate.toISOString(),
      status: "active",
      category,
      color: categoryColors[category] ?? "#f0f0f0",
    };

    onCreate(newSubscription);
    reset();
    onClose();
  }, [
    canSubmit,
    category,
    frequency,
    name,
    onClose,
    onCreate,
    priceValue,
    reset,
  ]);

  const errorMessage = useMemo(() => {
    if (!touched) return "";
    if (!nameValid) return "Name is required.";
    if (!priceValid) return "Price must be a positive number.";
    return "";
  }, [nameValid, priceValid, touched]);

  const SafeView = styled(KeyboardAvoidingView);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <Pressable
          style={{ flex: 1 }}
          className="modal-overlay"
          onPress={onClose}
        />
        <SafeView
          className="modal-container"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="modal-header">
            <Text className="modal-title">New Subscription</Text>
            <Pressable
              onPress={() => {
                reset();
                onClose();
              }}
              className="modal-close"
            >
              <Text className="modal-close-text">✕</Text>
            </Pressable>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="modal-body">
              <View className="auth-field">
                <Text className="auth-label">Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Netflix"
                  className={clsx(
                    "auth-input",
                    !nameValid && touched && "auth-input-error",
                  )}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Price</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  className={clsx(
                    "auth-input",
                    !priceValid && touched && "auth-input-error",
                  )}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Frequency</Text>
                <View className="picker-row">
                  {(["Monthly", "Yearly"] as Frequency[]).map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => setFrequency(option)}
                      className={clsx(
                        "picker-option",
                        frequency === option && "picker-option-active",
                      )}
                    >
                      <Text
                        className={clsx(
                          "picker-option-text",
                          frequency === option && "picker-option-text-active",
                        )}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {categories.map((c) => (
                    <Pressable
                      key={c}
                      onPress={() => setCategory(c)}
                      className={clsx(
                        "category-chip",
                        category === c && "category-chip-active",
                      )}
                    >
                      <Text
                        className={clsx(
                          "category-chip-text",
                          category === c && "category-chip-text-active",
                        )}
                      >
                        {c}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {errorMessage ? (
                <Text className="auth-error">{errorMessage}</Text>
              ) : null}

              <Pressable
                onPress={handleSubmit}
                disabled={!canSubmit}
                className={clsx(
                  "auth-button",
                  !canSubmit && "auth-button-disabled",
                )}
              >
                <Text className="auth-button-text">Create</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </SafeView>
      </View>
    </Modal>
  );
}
