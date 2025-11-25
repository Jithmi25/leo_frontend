import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';

interface PollOption {
  text: string;
  votes: number;
  voters: string[];
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

interface PollCardProps {
  polls: Poll[];
}

export default function PollCard({ polls }: PollCardProps) {
  const [expandedPoll, setExpandedPoll] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const togglePoll = (pollId: string) => {
    setExpandedPoll(expandedPoll === pollId ? null : pollId);
  };

  const selectOption = (pollId: string, optionIndex: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [pollId]: optionIndex,
    });
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((sum, option) => sum + option.votes, 0);
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ongoing Polls</Text>
      <View style={styles.divider} />

      <ScrollView scrollEnabled={false}>
        {polls.map((poll, index) => {
          const isExpanded = expandedPoll === poll.id;
          const totalVotes = getTotalVotes(poll);
          const selectedOption = selectedOptions[poll.id];

          return (
            <View key={poll.id}>
              <TouchableOpacity
                onPress={() => togglePoll(poll.id)}
                style={styles.pollHeader}
              >
                <Text style={styles.question}>{poll.question}</Text>
                {isExpanded ? (
                  <ChevronDown size={20} color="#999999" />
                ) : (
                  <ChevronRight size={20} color="#999999" />
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  <Text style={styles.selectLabel}>Select One</Text>
                  <View style={styles.optionsContainer}>
                    {poll.options.map((option, optionIndex) => {
                      const percentage = getPercentage(option.votes, totalVotes);
                      const isSelected = selectedOption === optionIndex;

                      return (
                        <View key={optionIndex}>
                          <TouchableOpacity
                            onPress={() => selectOption(poll.id, optionIndex)}
                            style={styles.optionWrapper}
                          >
                            <View style={styles.radioAndText}>
                              <View
                                style={[
                                  styles.radioButton,
                                  isSelected && styles.radioButtonSelected,
                                ]}
                              >
                                {isSelected && (
                                  <View style={styles.radioButtonDot} />
                                )}
                              </View>
                              <Text style={styles.optionText}>{option.text}</Text>
                            </View>
                            <View style={styles.votersAvatars}>
                              {option.voters.slice(0, 3).map((_, vIndex) => (
                                <View
                                  key={vIndex}
                                  style={[
                                    styles.voterAvatar,
                                    { marginLeft: vIndex > 0 ? -8 : 0 },
                                  ]}
                                >
                                  <Text style={styles.voterText}>👤</Text>
                                </View>
                              ))}
                            </View>
                          </TouchableOpacity>
                          <View style={styles.progressBarContainer}>
                            <View
                              style={[
                                styles.progressBar,
                                { width: `${percentage}%` },
                              ]}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

              {index < polls.length - 1 && <View style={styles.pollDivider} />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    padding: 24,
    marginVertical: 16,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginBottom: 16,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 20,
    flex: 1,
    marginRight: 12,
  },
  expandedContent: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  selectLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 16,
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#0052CC',
  },
  radioButtonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#001A4D',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  votersAvatars: {
    flexDirection: 'row',
  },
  voterAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  voterText: {
    fontSize: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#001A4D',
    borderRadius: 4,
  },
  pollDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
});
