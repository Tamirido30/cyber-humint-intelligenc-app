import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { HelpCircle } from 'lucide-react-native';

type FeaturedQuizCardProps = {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  imageUrl: string;
  onPress: () => void;
};

export default function FeaturedQuizCard({
  title,
  description,
  difficulty,
  questions,
  imageUrl,
  onPress,
}: FeaturedQuizCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy':
        return Colors.dark.success;
      case 'Medium':
        return Colors.dark.warning;
      case 'Hard':
        return Colors.dark.error;
      default:
        return Colors.dark.primary;
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View 
            style={[
              styles.difficultyBadge, 
              { backgroundColor: getDifficultyColor() + '30' }
            ]}
          >
            <Text 
              style={[
                styles.difficultyText,
                { color: getDifficultyColor() }
              ]}
            >
              {difficulty}
            </Text>
          </View>
          
          <View style={styles.questionsBadge}>
            <HelpCircle color={Colors.dark.text} size={12} style={styles.questionsIcon} />
            <Text style={styles.questionsText}>{questions} Questions</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 180,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.lg,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  difficultyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  questionsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  questionsIcon: {
    marginRight: 4,
  },
  questionsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.8,
  },
});