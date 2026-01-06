import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const favoriteEvents = [
  {
    id: 1,
    title: 'ADICTO: Berlin Festival',
    date: '24.02.2022 - 26.02.2022',
    price: '€30 - €100',
    location: 'Berlin, Germany',
    type: 'Workshop',
    category: 'Bachata',
    color: '#333',
    isFavorite: true,
  },
  {
    id: 2,
    title: 'Berlin Sensual Nights',
    date: '29.02.2022 | 21:00 - 04:00',
    price: '€30 - €100',
    location: 'Berlin, Germany',
    type: 'Party',
    category: 'Bachata',
    color: '#2f3542',
    isFavorite: true,
  },
];

export default function FavouritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
        <Text style={styles.subtitle}>Events you've saved for later</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favoriteEvents.length > 0 ? (
          favoriteEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={[styles.eventImage, { backgroundColor: event.color }]}>
                <Text style={styles.eventImageText}>
                  {event.title.split(' ')[0]}
                </Text>
              </View>
              
              <View style={styles.eventInfo}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Text style={styles.favoriteIconFilled}>♥</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventPrice}>{event.price}</Text>
                
                <View style={styles.eventTags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{event.type}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{event.category}</Text>
                  </View>
                </View>
                
                <Text style={styles.eventLocation}>{event.location}</Text>
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
    paddingHorizontal: '20@s',
    paddingTop: '20@vs',
    paddingBottom: '15@vs',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: '28@s',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5@vs',
  },
  subtitle: {
    fontSize: '16@s',
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: '15@s',
    paddingTop: '20@vs',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: '12@s',
    marginBottom: '15@vs',
    padding: '15@s',
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: '2@vs',
    },
    shadowOpacity: 0.1,
    shadowRadius: '4@s',
    elevation: 3,
  },
  eventImage: {
    width: '60@s',
    height: '60@s',
    borderRadius: '8@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '12@s',
  },
  eventImageText: {
    color: '#fff',
    fontSize: '12@s',
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
    marginBottom: '5@vs',
  },
  eventTitle: {
    fontSize: '16@s',
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: '10@s',
  },
  favoriteButton: {
    padding: '5@s',
  },
  favoriteIconFilled: {
    fontSize: '18@s',
    color: '#ff4757',
  },
  eventDate: {
    fontSize: '12@s',
    color: '#666',
    marginBottom: '2@vs',
  },
  eventPrice: {
    fontSize: '12@s',
    color: '#666',
    marginBottom: '8@vs',
  },
  eventTags: {
    flexDirection: 'row',
    marginBottom: '8@vs',
    gap: '8@s',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: '8@s',
    paddingVertical: '4@vs',
    borderRadius: '12@s',
  },
  tagText: {
    fontSize: '10@s',
    color: '#666',
    fontWeight: '500',
  },
  eventLocation: {
    fontSize: '12@s',
    color: '#999',
  },
  shareButton: {
    padding: '8@s',
    marginLeft: '10@s',
  },
  shareIcon: {
    fontSize: '16@s',
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '100@vs',
  },
  emptyIcon: {
    fontSize: '60@s',
    color: '#ddd',
    marginBottom: '20@vs',
  },
  emptyTitle: {
    fontSize: '20@s',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10@vs',
  },
  emptySubtitle: {
    fontSize: '16@s',
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: '40@s',
    lineHeight: '22@vs',
  },
});