import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { quizzes } from '@/data/quizData';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const quiz = quizzes.find(q => q.id === id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quiz?.questions.length || 0).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const progressValue = useSharedValue(0);
  const questionAnimValue = useSharedValue(0);
  
  useEffect(() => {
    progressValue.value = withTiming(currentQuestionIndex / (quiz?.questions.length || 1));
    questionAnimValue.value = 0;
    setTimeout(() => {
      questionAnimValue.value = withTiming(1, { duration: 500 });
    }, 100);
  }, [currentQuestionIndex, quiz?.questions.length]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });
  
  const questionAnimStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      questionAnimValue.value,
      [0, 1],
      [20, 0],
      Extrapolate.CLAMP
    );
    
    const opacity = questionAnimValue.value;
    
    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  
  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz not found</Text>
      </View>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerIndex);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    setIsAnswerSubmitted(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return {
      score: Math.round((correctAnswers / quiz.questions.length) * 100),
      correctAnswers,
      totalQuestions: quiz.questions.length,
    };
  };
  
  if (quizCompleted) {
    const { score, correctAnswers, totalQuestions } = calculateScore();
    
    return (
      <View style={styles.container}>
        <ParticleBackground />
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.dark.text} size={24} />
        </TouchableOpacity>
        
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          
          <View style={styles.scoreCard}>
            <LinearGradient
              colors={[Colors.dark.primary + '30', Colors.dark.secondary + '30']}
              style={StyleSheet.absoluteFill}
            />
            
            <Text style={styles.scoreTitle}>Your Score</Text>
            <Text style={styles.scoreValue}>{score}%</Text>
            
            <View style={styles.scoreSummary}>
              <Text style={styles.scoreSummaryText}>
                You got <Text style={styles.scoreSummaryHighlight}>{correctAnswers}</Text> out 
                of <Text style={styles.scoreSummaryHighlight}>{totalQuestions}</Text> questions correct
              </Text>
            </View>
          </View>
          
          {score >= 80 ? (
            <View style={styles.feedbackCard}>
              <CheckCircle color={Colors.dark.success} size={24} style={styles.feedbackIcon} />
              <Text style={styles.feedbackTitle}>Great job!</Text>
              <Text style={styles.feedbackText}>
                You have a good understanding of this topic. Keep it up!
              </Text>
            </View>
          ) : score >= 50 ? (
            <View style={styles.feedbackCard}>
              <AlertCircle color={Colors.dark.warning} size={24} style={styles.feedbackIcon} />
              <Text style={styles.feedbackTitle}>Good effort!</Text>
              <Text style={styles.feedbackText}>
                You're making progress, but there's room for improvement.
              </Text>
            </View>
          ) : (
            <View style={styles.feedbackCard}>
              <XCircle color={Colors.dark.error} size={24} style={styles.feedbackIcon} />
              <Text style={styles.feedbackTitle}>Keep practicing!</Text>
              <Text style={styles.feedbackText}>
                This topic needs more of your attention. Review the material and try again.
              </Text>
            </View>
          )}
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.outlineButton]}
              onPress={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
                setUserAnswers(Array(quiz.questions.length).fill(null));
                setQuizCompleted(false);
              }}
            >
              <Text style={styles.outlineButtonText}>Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/quizzes')}
            >
              <Text style={styles.buttonText}>Back to Quizzes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ParticleBackground />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ChevronLeft color={Colors.dark.text} size={24} />
      </TouchableOpacity>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
      </View>
      
      <Animated.View style={[styles.questionContainer, questionAnimStyle]}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        
        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswer === index && styles.selectedAnswerButton,
                isAnswerSubmitted && index === currentQuestion.correctAnswer && styles.correctAnswerButton,
                isAnswerSubmitted && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer && styles.wrongAnswerButton,
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={isAnswerSubmitted}
            >
              <Text 
                style={[
                  styles.answerText,
                  selectedAnswer === index && styles.selectedAnswerText,
                  isAnswerSubmitted && index === currentQuestion.correctAnswer && styles.correctAnswerText,
                  isAnswerSubmitted && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer && styles.wrongAnswerText,
                ]}
              >
                {answer}
              </Text>
              
              {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                <CheckCircle color={Colors.dark.success} size={20} />
              )}
              
              {isAnswerSubmitted && selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer && (
                <XCircle color={Colors.dark.error} size={20} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      
      {isAnswerSubmitted && currentQuestion.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        {!isAnswerSubmitted ? (
          <TouchableOpacity
            style={[styles.button, selectedAnswer === null && styles.disabledButton]}
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.buttonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleNextQuestion}
          >
            <Text style={styles.buttonText}>
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: Layout.spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 60,
    paddingTop: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.dark.card,
    borderRadius: 4,
    marginBottom: Layout.spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.7,
  },
  questionContainer: {
    paddingHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.xl,
  },
  questionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xl,
  },
  answersContainer: {
    marginBottom: Layout.spacing.xl,
  },
  answerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedAnswerButton: {
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.primary + '20',
  },
  correctAnswerButton: {
    borderColor: Colors.dark.success,
    backgroundColor: Colors.dark.success + '20',
  },
  wrongAnswerButton: {
    borderColor: Colors.dark.error,
    backgroundColor: Colors.dark.error + '20',
  },
  answerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.dark.text,
    flex: 1,
  },
  selectedAnswerText: {
    color: Colors.dark.primary,
  },
  correctAnswerText: {
    color: Colors.dark.success,
  },
  wrongAnswerText: {
    color: Colors.dark.error,
  },
  explanationContainer: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.dark.card + '80',
    borderRadius: Layout.borderRadius.md,
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  explanationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.sm,
  },
  explanationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.9,
    lineHeight: 20,
  },
  buttonContainer: {
    padding: Layout.spacing.lg,
    marginTop: 'auto',
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.dark.primary + '50',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.background,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
    padding: Layout.spacing.lg,
    textAlign: 'center',
    marginTop: 60,
  },
  resultsContainer: {
    paddingTop: 100,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
    alignItems: 'center',
  },
  quizTitle: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 24,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  scoreCard: {
    width: '100%',
    padding: Layout.spacing.xl,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
    overflow: 'hidden',
  },
  scoreTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.md,
  },
  scoreValue: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 48,
    color: Colors.dark.primary,
    marginBottom: Layout.spacing.md,
  },
  scoreSummary: {
    marginTop: Layout.spacing.sm,
  },
  scoreSummaryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: 'center',
  },
  scoreSummaryHighlight: {
    fontFamily: 'Inter-Bold',
    color: Colors.dark.primary,
  },
  feedbackCard: {
    width: '100%',
    padding: Layout.spacing.lg,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.xl,
    alignItems: 'center',
  },
  feedbackIcon: {
    marginBottom: Layout.spacing.md,
  },
  feedbackTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.sm,
  },
  feedbackText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.dark.primary,
    marginRight: Layout.spacing.md,
  },
  outlineButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.dark.primary,
  },
});