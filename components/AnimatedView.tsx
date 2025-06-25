import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

interface AnimatedViewProps {
  children: React.ReactNode;
  index?: number; // For staggered delay
  style?: ViewStyle;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  index = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    const delay = index * 100; // 100ms stagger delay
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 400 }));
  }, []);

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default AnimatedView;
