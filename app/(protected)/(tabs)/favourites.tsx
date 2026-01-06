import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';

interface Event {
  event_id: number;
  event_name: string;
  description: string;
  event_profile_img: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  city: string;
  country: string;
  keywords: string[];
  danceStyles: Array<{
    ds_id: number;
    ds_name: string;
  }>;
  event_date_id: number;
  isFavorite: number;
}

export default function FavouritesScreen() {
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteEvents');
      if (favorites) {
        setFavoriteEvents(JSON.parse(favorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const removeFavorite = async (eventId: number) => {
    try {
      const updatedFavorites = favoriteEvents.filter(event => event.event_id !== eventId);
      setFavoriteEvents(updatedFavorites);
      await AsyncStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const getEventColor = (danceStyles: Array<{ds_name: string}>) => {
    const colors: { [key: string]: string } = {
      'Bachata': '#ff4757',
      'Salsa': '#c44569',
      'Kizomba': '#333',
      'default': '#666'
    };
    const primaryStyle = danceStyles[0]?.ds_name || 'default';
    return colors[primaryStyle] || colors.default;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
        <Text style={styles.subtitle}>Events you've saved for later</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favoriteEvents.length > 0 ? (
          favoriteEvents.map((event) => (
            <TouchableOpacity key={`${event.event_id}-${event.event_date_id}`} style={styles.eventCard}>
              <View style={[styles.eventImage, { backgroundColor: getEventColor(event.danceStyles) }]}>
                <Text style={styles.eventImageText}>
                  {event.event_name.split(' ')[0]}
                </Text>
              </View>
              
              <View style={styles.eventInfo}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.event_name}</Text>
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => removeFavorite(event.event_id)}
                  >
                    <Text style={styles.favoriteIconFilled}>♥</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.eventDate}>{event.readable_from_date}</Text>
                <Text style={styles.eventPrice}>
                  {event.event_price_from === 0 && event.event_price_to === 0 
                    ? 'Free' 
                    : `€${event.event_price_from}${event.event_price_to > event.event_price_from ? ` - €${event.event_price_to}` : ''}`
                  }
                </Text>
                
                <View style={styles.eventTags}>
                  {event.danceStyles.slice(0, 2).map((style, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{style.ds_name}</Text>
                    </View>
                  ))}
                  {event.keywords.slice(0, 1).map((keyword, index) => (
                    <View key={`keyword-${index}`} style={styles.tag}>
                      <Text style={styles.tagText}>{keyword}</Text>
                    </View>
                  ))}
                </View>
                
                <Text style={styles.eventLocation}>{event.city}, {event.country}</Text>
              </View>
              
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareIcon}>↗</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitle}>No favourites yet</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring events and tap the heart icon to save your favorites
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventImageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIconFilled: {
    fontSize: 18,
    color: '#ff4757',
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  eventPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  eventTags: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  eventLocation: {
    fontSize: 12,
    color: '#999',
  },
  shareButton: {
    padding: 8,
    marginLeft: 10,
  },
  shareIcon: {
    fontSize: 16,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyIcon: {
    fontSize: 60,
    color: '#ddd',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});