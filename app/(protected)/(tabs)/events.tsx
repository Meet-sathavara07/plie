import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
                import Icon from 'react-native-vector-icons/Ionicons'; // Add this import

const API_BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

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

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteEvents, setFavoriteEvents] = useState<number[]>([]);

  useEffect(() => {
    fetchEvents();
    // loadFavorites();
  }, []);

  const fetchEvents = async () => {
  try {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock data matching the exact old API structure
    const mockResponse = {
      success: true,
      message: "",
      data: {
        events: [
          {
            event_id: 216,
            event_name: "Mondays Social Outdoor",
            description: "Dear lovely dance family🥰💃🏽🕺\r\n\r\nWeekly outdoor social dancing in the park!\r\nBachata, Salsa & Kizomba vibes 🌳",
            event_profile_img: "https://via.placeholder.com/300/ff4757/ffffff?text=BACHATA", // Placeholder since real image gone
            event_price_from: 0,
            event_price_to: 0,
            readable_from_date: "Every Monday",
            readable_to_date: "",
            isFavorite: 0,
            city: "Berlin",
            country: "Germany",
            keywords: ["Social", "Bachata", "Outdoor"],
            danceStyles: [
              { ds_id: 1, ds_name: "Bachata" },
              { ds_id: 3, ds_name: "Kizomba" },
              { ds_id: 2, ds_name: "Salsa" }
            ],
            event_date_id: 1
          },
          {
            event_id: 217,
            event_name: "Berlin Bachata Congress",
            description: "International festival with workshops, shows and parties!",
            event_profile_img: "https://via.placeholder.com/300/ff4757/ffffff?text=FESTIVAL",
            event_price_from: 89,
            event_price_to: 149,
            readable_from_date: "15.03.2026",
            readable_to_date: "17.03.2026",
            isFavorite: 0,
            city: "Berlin",
            country: "Germany",
            keywords: ["Congress", "Workshops", "Party"],
            danceStyles: [
              { ds_id: 1, ds_name: "Bachata" }
            ],
            event_date_id: 2
          },
          {
            event_id: 218,
            event_name: "Salsa Night at Club Havana",
            description: "Hot salsa night with live band and DJ!",
            event_profile_img: "https://via.placeholder.com/300/c44569/ffffff?text=SALSA",
            event_price_from: 10,
            event_price_to: 15,
            readable_from_date: "25.01.2026",
            readable_to_date: "",
            isFavorite: 0,
            city: "Madrid",
            country: "Spain",
            keywords: ["Party", "Live Music"],
            danceStyles: [
              { ds_id: 2, ds_name: "Salsa" }
            ],
            event_date_id: 3
          }
        ],
        total: 3
      }
    };

    if (mockResponse.success) {
      const eventsData = mockResponse.data.events || [];
      setEvents(eventsData);
      console.log('Mock events loaded:', eventsData.length);
    }
  } catch (error: any) {
    setError('Failed to load events');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  // const loadFavorites = async () => {
  //   try {
  //     const favorites = await AsyncStorage.getItem('favoriteEvents');
  //     if (favorites) {
  //       const favoriteIds = JSON.parse(favorites).map((event: Event) => event.event_id);
  //       setFavoriteEvents(favoriteIds);
  //     }
  //   } catch (error) {
  //     console.error('Error loading favorites:', error);
  //   }
  // };

  const toggleFavorite = async (event: Event) => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteEvents');
      let favoritesList: Event[] = favorites ? JSON.parse(favorites) : [];
      
      const existingIndex = favoritesList.findIndex(fav => fav.event_id === event.event_id);
      
      if (existingIndex === -1) {
        favoritesList.push(event);
        setFavoriteEvents([...favoriteEvents, event.event_id]);
      } else {
        favoritesList.splice(existingIndex, 1);
        setFavoriteEvents(favoriteEvents.filter(id => id !== event.event_id));
      }
      
      await AsyncStorage.setItem('favoriteEvents', JSON.stringify(favoritesList));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const transformEventForCard = (event: Event) => {
    return {
      id: event.event_id,
      title: event.event_name,
      image: event.event_profile_img,
      date_time: event.readable_from_date,
      price: event.event_price_from === 0 && event.event_price_to === 0 
        ? 'Free' 
        : `€${event.event_price_from}${event.event_price_to > event.event_price_from ? ` - €${event.event_price_to}` : ''}`,
      location: `${event.city}, ${event.country}`,
      tags: [
        ...event.danceStyles.slice(0, 2).map(style => style.ds_name),
        ...event.keywords.slice(0, 1)
      ]
    };
  };

  const handleEventPress = (event: Event) => {
    console.log('Event pressed:', event.event_name);
    // TODO: Navigate to event details
  };

  const handleShare = async (event: Event) => {
    try {
      await Share.share({
        message: `Check out this dance event: ${event.event_name} in ${event.city}, ${event.country}`,
        title: event.event_name,
      });
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  const isFavorite = (eventId: number) => {
    return favoriteEvents.includes(eventId);
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

  if (isLoading && events.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff4757" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && events.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading events</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchEvents}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.mainheader}>
              <Text style={styles.greeting}>Hello Renzo!</Text>
              <Text style={styles.mainsubtitle}>Are you ready to dance?</Text>
            </View>
            
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchEvents}
            colors={['#00D09C']}
            tintColor="#00D09C"
          />
        }
      >
        {events.map((event) => (
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
                  onPress={() => toggleFavorite(event)}
                >

<TouchableOpacity
  style={styles.favoriteButton}
  onPress={() => toggleFavorite(event)}
>
  <Icon
    name={isFavorite(event.event_id) ? 'heart' : 'heart-outline'}
    size={24}
    color={isFavorite(event.event_id) ? '#ff4757' : '#999'}
  />
</TouchableOpacity>
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
    mainheader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mainsubtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00D09C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  favoriteIcon: {
    fontSize: 18,
    color: '#999',
  },
  favoriteIconFilled: {
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
});