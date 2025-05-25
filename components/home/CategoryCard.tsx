import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import React from 'react';

type CategoryCardProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function CategoryCard({ title, icon, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[Colors.dark.card, Colors.dark.background]}
        style={styles.gradient}
      />
      
      <LinearGradient
        colors={[Colors.dark.primary + '20', 'transparent']}
        style={styles.glow}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <LinearGradient
        colors={['transparent', Colors.dark.primary + '10']}
        style={styles.border}
      />
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Quiz</Text>
      
      <LinearGradient
        colors={[Colors.dark.primary + '20', 'transparent']}
        style={styles.iconBackground}
      />
      
      <Text style={styles.iconContainer}>
        {icon}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 140,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '30%',
    opacity: 0.5,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.text,
    zIndex: 1,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.primary,
    marginTop: 2,
    zIndex: 1,
  },
  iconBackground: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    right: Layout.spacing.md,
    bottom: Layout.spacing.md,
    zIndex: 1,
  },
});