import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { leaderboardData } from '@/data/leaderboardData';
import { Medal } from 'lucide-react-native';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function LeaderboardScreen() {
  const [timeFilter, setTimeFilter] = useState('weekly'); // 'daily', 'weekly', 'monthly', 'allTime'
  
  const renderLeaderboardItem = ({ item, index }) => {
    const getPositionStyle = () => {
      if (index === 0) return styles.firstPlace;
      if (index === 1) return styles.secondPlace;
      if (index === 2) return styles.thirdPlace;
      return styles.otherPlace;
    };
    
    const getMedalIcon = () => {
      if (index === 0) return <Medal color="#FFD700" size={24} />;
      if (index === 1) return <Medal color="#C0C0C0" size={24} />;
      if (index === 2) return <Medal color="#CD7F32" size={24} />;
      return null;
    };
    
    return (
      <View style={[styles.leaderboardItem, index < 3 && styles.topThreeItem]}>
        <View style={[styles.position, getPositionStyle()]}>
          {index < 3 ? (
            getMedalIcon()
          ) : (
            <Text style={styles.positionText}>{index + 1}</Text>
          )}
        </View>
        
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar}
        />
        
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.userStats}>{item.completedQuizzes} quizzes • {item.averageScore}% avg</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{item.score}</Text>
          <Text style={styles.scoreLabel}>points</Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <ParticleBackground />
      
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top cybersecurity experts</Text>
      </View>
      
      <View style={styles.timeFilterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'daily' && styles.activeFilter]}
          onPress={() => setTimeFilter('daily')}
        >
          <Text 
            style={[styles.filterText, timeFilter === 'daily' && styles.activeFilterText]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'weekly' && styles.activeFilter]}
          onPress={() => setTimeFilter('weekly')}
        >
          <Text 
            style={[styles.filterText, timeFilter === 'weekly' && styles.activeFilterText]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'monthly' && styles.activeFilter]}
          onPress={() => setTimeFilter('monthly')}
        >
          <Text 
            style={[styles.filterText, timeFilter === 'monthly' && styles.activeFilterText]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'allTime' && styles.activeFilter]}
          onPress={() => setTimeFilter('allTime')}
        >
          <Text 
            style={[styles.filterText, timeFilter === 'allTime' && styles.activeFilterText]}
          >
            All Time
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={renderLeaderboardItem}
        contentContainerStyle={styles.leaderboardList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 32,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text,
    opacity: 0.8,
  },
  timeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Layout.spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilter: {
    borderBottomColor: Colors.dark.primary,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  activeFilterText: {
    color: Colors.dark.primary,
    opacity: 1,
  },
  leaderboardList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: 100,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  topThreeItem: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
  },
  position: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  firstPlace: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  secondPlace: {
    backgroundColor: 'rgba(192, 192, 192, 0.2)',
  },
  thirdPlace: {
    backgroundColor: 'rgba(205, 127, 50, 0.2)',
  },
  otherPlace: {
    backgroundColor: Colors.dark.background,
  },
  positionText: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  userStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 18,
    color: Colors.dark.primary,
  },
  scoreLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.7,
  },
});