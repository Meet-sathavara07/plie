// components/ui/cards/EventCard.tsx
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    dateTime: string;
    price: string;
    location: string;
    tags: string[];
    // Optional: for dynamic vertical labels
    dayLabel?: string;
    typeLabel?: string;
    venueLabel?: string;
  };
  onPress: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
  onShare: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  onFavorite,
  isFavorite,
  onShare,
}) => {
  const {
    title,
    dateTime,
    price,
    location,
    tags,
    dayLabel = 'SATURDAY',
    typeLabel = 'NIGHT',
    venueLabel = 'HAVANA',
  } = event;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.card}>
        {/* Left Vertical Labels */}
        <View style={styles.verticalStrip}>
          <Text style={styles.stripText}>{dayLabel}</Text>
          <Text style={styles.stripText}>{typeLabel}</Text>
          <Text style={styles.stripText}>{venueLabel}</Text>
        </View>

        {/* Middle Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.dateTime}>{dateTime}</Text>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right Icons */}
        <View style={styles.iconsColumn}>
          <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
            <Icon name="share-social-outline" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="download-outline" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onFavorite} style={styles.iconBtn}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#ff4757' : '#666'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: '16@s',
    marginVertical: '10@vs',
    height: '150@vs',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
  verticalStrip: {
    backgroundColor: '#f5f5f5',
    width: '80@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: '10@vs',
  },
  stripText: {
    fontSize: '11@s',
    fontWeight: '800',
    color: '#444',
    letterSpacing: 1.8,
    textAlign: 'center',
    lineHeight: '16@vs',
  },
  content: {
    flex: 1,
    paddingHorizontal: '16@s',
    paddingVertical: '14@vs',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '17@s',
    fontWeight: 'bold',
    color: '#222',
    lineHeight: '22@s',
  },
  dateTime: {
    fontSize: '14@s',
    color: '#00c853',
    fontWeight: '600',
    marginVertical: '4@vs',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '19@s',
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: '13@s',
    color: '#777',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8@s',
    marginTop: '8@vs',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: '12@s',
    paddingVertical: '6@vs',
    borderRadius: 20,
  },
  tagText: {
    fontSize: '11@s',
    color: '#555',
    fontWeight: '600',
  },
  iconsColumn: {
    justifyContent: 'space-between',
    paddingVertical: '16@vs',
    paddingHorizontal: '10@s',
  },
  iconBtn: {
    padding: '6@s',
  },
});

export default EventCard;