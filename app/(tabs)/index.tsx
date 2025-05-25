import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Target, Database, AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useRouter } from 'expo-router';
import FeaturedQuizCard from '@/components/home/FeaturedQuizCard';
import CategoryCard from '@/components/home/CategoryCard';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <ParticleBackground />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
        style={styles.headerGradient}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>CYBER<Text style={styles.highlight}>HUMINT</Text></Text>
        <Text style={styles.subtitle}>Intelligence Training Platform</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Mission</Text>
          <FeaturedQuizCard 
            title="Social Engineering Operations"
            description="Master the art of human intelligence gathering"
            difficulty="Advanced"
            questions={15}
            imageUrl="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg"
            onPress={() => router.push('/quiz/social-engineering')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intelligence Categories</Text>
          <View style={styles.categoriesGrid}>
            <CategoryCard
              title="OSINT"
              icon={<Database color={Colors.dark.primary} size={24} />}
              onPress={() => router.push('/quizzes')}
            />
            <CategoryCard
              title="HUMINT"
              icon={<Target color={Colors.dark.primary} size={24} />}
              onPress={() => router.push('/quizzes')}
            />
            <CategoryCard
              title="Counter Intel"
              icon={<Shield color={Colors.dark.primary} size={24} />}
              onPress={() => router.push('/quizzes')}
            />
            <CategoryCard
              title="Threat Intel"
              icon={<AlertTriangle color={Colors.dark.primary} size={24} />}
              onPress={() => router.push('/quizzes')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
    zIndex: 2,
  },
  title: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 32,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  highlight: {
    color: Colors.dark.primary,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.md,
    paddingBottom: Layout.spacing.xl,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.primary,
    marginBottom: Layout.spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});