import { TransactionProvider } from "@/contexts/TransactionContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <Stack screenOptions={{headerShown: false}} />
    </TransactionProvider>
  );
}
