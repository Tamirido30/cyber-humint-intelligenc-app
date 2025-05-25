import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Settings, Medal, BookOpen, BarChart, Shield, ChevronRight } from 'lucide-react-native';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const userStats = {
    completedQuizzes: 27,
    totalScore: 1850,
    averageScore: 85,
    rank: 'Cybersecurity Expert',
    badges: 12,
  };
  
  const recentQuizzes = [
    { id: '1', title: 'Network Security Basics', score: 90, date: '2 days ago' },
    { id: '2', title: 'Social Engineering Tactics', score: 80, date: '1 week ago' },
    { id: '3', title: 'Password Security', score: 95, date: '2 weeks ago' },
  ];
  
  const achievements = [
    { id: '1', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: <Medal color={Colors.dark.primary} size={24} /> },
    { id: '2', title: 'Quiz Master', description: 'Complete 25 quizzes', icon: <BookOpen color={Colors.dark.primary} size={24} />, unlocked: true },
    { id: '3', title: 'Expert Defender', description: 'Score above 90% on 10 quizzes', icon: <Shield color={Colors.dark.primary} size={24} /> },
  ];
  
  return (
    <View style={styles.container}>
      <ParticleBackground />
      
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color={Colors.dark.text} size={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <LinearGradient
            colors={[Colors.dark.primary + '20', Colors.dark.secondary + '20']}
            style={styles.profileCardGradient}
          />
          
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileRank}>{userStats.rank}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.completedQuizzes}</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.totalScore}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.badges}</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          
          <View style={styles.performanceCard}>
            <View style={styles.performanceItem}>
              <BarChart color={Colors.dark.accent} size={20} style={styles.performanceIcon} />
              <View>
                <Text style={styles.performanceLabel}>Average Score</Text>
                <Text style={styles.performanceValue}>{userStats.averageScore}%</Text>
              </View>
            </View>
            
            <View style={styles.performanceItem}>
              <Medal color={Colors.dark.accent} size={20} style={styles.performanceIcon} />
              <View>
                <Text style={styles.performanceLabel}>Best Category</Text>
                <Text style={styles.performanceValue}>Network Security</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Quizzes</Text>
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight color={Colors.dark.primary} size={16} />
            </TouchableOpacity>
          </View>
          
          {recentQuizzes.map(quiz => (
            <View key={quiz.id} style={styles.quizItem}>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.quizDate}>{quiz.date}</Text>
              </View>
              
              <View style={styles.quizScoreContainer}>
                <Text style={styles.quizScore}>{quiz.score}%</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          {achievements.map(achievement => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementItem,
                achievement.unlocked && styles.achievementUnlocked
              ]}
            >
              <View style={styles.achievementIconContainer}>
                {achievement.icon}
              </View>
              
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
              
              {achievement.unlocked && (
                <View style={styles.achievementBadge}>
                  <Text style={styles.achievementBadgeText}>Unlocked</Text>
                </View>
              )}
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 32,
    color: Colors.dark.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: 100,
  },
  profileCard: {
    alignItems: 'center',
    padding: Layout.spacing.lg,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.lg,
    overflow: 'hidden',
  },
  profileCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.dark.primary,
    marginBottom: Layout.spacing.md,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  profileRank: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.primary,
    marginBottom: Layout.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.dark.border,
  },
  statValue: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 20,
    color: Colors.dark.text,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.primary,
    marginRight: 4,
  },
  performanceCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  performanceIcon: {
    marginRight: Layout.spacing.md,
  },
  performanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  performanceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  quizItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  quizDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  quizScoreContainer: {
    backgroundColor: Colors.dark.primary + '20',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.sm,
  },
  quizScore: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 14,
    color: Colors.dark.primary,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    opacity: 0.6,
  },
  achievementUnlocked: {
    opacity: 1,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
  },
  achievementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  achievementBadge: {
    backgroundColor: Colors.dark.primary + '30',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  achievementBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.dark.primary,
  },
});