import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events, locations..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Popular Categories</ThemedText>
          <View style={styles.categoriesContainer}>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>Bachata</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>Salsa</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>Kizz</Text>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Recent Searches</ThemedText>
          <Text style={styles.recentSearch}>Berlin Festival</Text>
          <Text style={styles.recentSearch}>Bachata Workshop</Text>
          <Text style={styles.recentSearch}>Summer Events</Text>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: '20@s',
    paddingTop: '20@vs',
    paddingBottom: '15@vs',
  },
  greeting: {
    fontSize: '28@s',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5@vs',
  },
  subtitle: {
    fontSize: '16@s',
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: '20@s',
    marginBottom: '20@vs',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12@s',
    paddingHorizontal: '15@s',
    paddingVertical: '12@vs',
    fontSize: '16@s',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    paddingHorizontal: '20@s',
  },
  sectionContainer: {
    marginBottom: '25@vs',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '10@vs',
    gap: '10@s',
  },
  categoryItem: {
    backgroundColor: '#ff4757',
    paddingHorizontal: '15@s',
    paddingVertical: '8@vs',
    borderRadius: '20@s',
  },
  categoryText: {
    color: '#fff',
    fontSize: '14@s',
    fontWeight: '600',
  },
  recentSearch: {
    fontSize: '16@s',
    color: '#333',
    paddingVertical: '8@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});