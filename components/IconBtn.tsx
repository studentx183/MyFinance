import { COLORS } from "@/app/styles/colors";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import Animated, {
    ZoomIn,
    ZoomOut,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const IconBtn: React.FC<{
  icon: React.ComponentType<any>;
  type?: "button" | "submit" | "reset";
  size?: number;
  bgColor?: string;
  iconSize?: number | string;
  iconColor?: string;
  loading?: boolean;
  onPress?: () => void;
}> = ({
  icon: IconComponent,
  size,
  bgColor,
  iconSize,
  iconColor,
  loading,
  type,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withSpring(0.6);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  const handleHoverIn = () => {
    scale.value = withSpring(1.05);
    opacity.value = withSpring(0.8);
  };

  const handleHoverOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      disabled={loading}
    >
      <Animated.View
        style={[
          {
            ...styles.container,
            backgroundColor: bgColor || COLORS.primary,
            width: size || 32,
            height: size || 32,
          },
          animatedStyle,
        ]}
      >
        {loading ? (
          <Animated.View entering={ZoomIn} exiting={ZoomOut}>
            <ActivityIndicator size="small" color={iconColor || COLORS.white} />
          </Animated.View>
        ) : (
          <IconComponent
            entering={ZoomIn}
            exiting={ZoomOut}
            size={iconSize || 24}
            color={iconColor || COLORS.white}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    display: "flex",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconBtn;
