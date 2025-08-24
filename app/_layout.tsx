import toastConfig from "@/configs/toast-config";
import { TransactionProvider } from "@/contexts/TransactionContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast
        config={toastConfig}
        position="top"
        topOffset={100}
        visibilityTime={3000}
      />
    </TransactionProvider>
  );
}
