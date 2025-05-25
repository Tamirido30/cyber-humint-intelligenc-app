import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { ChevronRight, HelpCircle } from 'lucide-react-native';

type QuizCardProps = {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  imageUrl: string;
  onPress: () => void;
};

export default function QuizCard({
  title,
  description,
  difficulty,
  questions,
  imageUrl,
  onPress,
}: QuizCardProps) {
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
      />
      
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
          
          <View style={styles.badgesContainer}>
            <View 
              style={[
                styles.difficultyBadge, 
                { backgroundColor: getDifficultyColor() + '20' }
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
        </View>
        
        <View style={styles.arrowContainer}>
          <LinearGradient
            colors={[Colors.dark.primary + '30', Colors.dark.secondary + '30']}
            style={styles.arrowBackground}
          />
          <ChevronRight color={Colors.dark.primary} size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  textContent: {
    flex: 1,
    padding: Layout.spacing.md,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.7,
    marginBottom: Layout.spacing.sm,
  },
  badgesContainer: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
    marginRight: Layout.spacing.sm,
  },
  difficultyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  questionsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionsIcon: {
    marginRight: 4,
  },
  questionsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  arrowContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});