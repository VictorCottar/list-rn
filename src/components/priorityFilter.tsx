import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface PriorityFilterProps {
  selectedPriority: string | null;
  onSelectPriority: (priority: string | null) => void;
}

export const PriorityFilter = ({ selectedPriority, onSelectPriority }: PriorityFilterProps) => {
  const priorities = ['alta', 'média', 'baixa'];

  return (
    <View className="flex-row justify-center items-center space-x-2 w-full py-2 mt-2">
      <TouchableOpacity
        className={`px-4 py-2 rounded-sm border-r-4 border-b-4 border-l-2 border-t-2`}
        onPress={() => onSelectPriority(null)}
      >
        <Text>
          todas
        </Text>
      </TouchableOpacity>
      {priorities.map((priority) => (
        <TouchableOpacity
          key={priority}
          className={`px-4 py-2 rounded-sm border-r-4 border-b-4 border-l-2 border-t-2`}
          onPress={() => onSelectPriority(priority)}
        >
          <Text>
            {priority}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
