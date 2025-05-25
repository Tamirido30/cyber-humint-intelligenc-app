import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  withDelay 
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const NUM_PARTICLES = 15;

type ParticleProps = {
  delay: number;
  x: number;
  y: number;
  size: number;
  duration: number;
};

function Particle({ delay, x, y, size, duration }: ParticleProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  useEffect(() => {
    opacity.value = withDelay(
      delay, 
      withRepeat(
        withTiming(0.3, { duration: duration / 2 }, () => {
          return withTiming(0, { duration: duration / 2 });
        }),
        -1,
        false
      )
    );
    
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-20, { 
          duration: duration, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        }),
        -1,
        true
      )
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });
  
  return (
    <Animated.View 
      style={[
        styles.particle, 
        { 
          left: x, 
          top: y, 
          width: size, 
          height: size, 
          borderRadius: size / 2 
        },
        animatedStyle
      ]} 
    />
  );
}

export default function ParticleBackground() {
  const particles = Array.from({ length: NUM_PARTICLES }).map((_, index) => {
    const size = Math.random() * 4 + 1;
    return {
      id: index,
      x: Math.random() * Layout.window.width,
      y: Math.random() * Layout.window.height,
      size,
      delay: Math.random() * 2000,
      duration: Math.random() * 3000 + 2000,
    };
  });
  
  return (
    <View style={styles.container}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          duration={particle.duration}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: Colors.dark.primary,
  },
});