import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const profileStats = [
  { label: 'Events Attended', value: '24' },
  { label: 'Favorites', value: '12' },
  { label: 'Following', value: '156' },
];

const menuItems = [
  { icon: '⚙️', title: 'Settings', subtitle: 'Preferences and privacy' },
  { icon: '📅', title: 'My Events', subtitle: 'Events you\'re attending' },
  { icon: '🎫', title: 'Tickets', subtitle: 'Your purchased tickets' },
  { icon: '💳', title: 'Payment Methods', subtitle: 'Manage payment options' },
  { icon: '📞', title: 'Support', subtitle: 'Get help and contact us' },
  { icon: '📋', title: 'Terms & Privacy', subtitle: 'Legal information' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
          </View>
          
          <Text style={styles.userName}>Renzo</Text>
          <Text style={styles.userEmail}>renzo@example.com</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: '30@vs',
    paddingHorizontal: '20@s',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    marginBottom: '15@vs',
  },
  avatar: {
    width: '80@s',
    height: '80@s',
    borderRadius: '40@s',
    backgroundColor: '#ff4757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: '32@s',
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: '24@s',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5@vs',
  },
  userEmail: {
    fontSize: '16@s',
    color: '#666',
    marginBottom: '20@vs',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: '20@s',
    paddingVertical: '10@vs',
    borderRadius: '20@s',
  },
  editButtonText: {
    fontSize: '14@s',
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: '20@vs',
    marginTop: '10@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: '20@s',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5@vs',
  },
  statLabel: {
    fontSize: '12@s',
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: '10@vs',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: '20@s',
    marginRight: '15@s',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: '#333',
    marginBottom: '2@vs',
  },
  menuSubtitle: {
    fontSize: '12@s',
    color: '#666',
  },
  menuArrow: {
    fontSize: '20@s',
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginTop: '10@vs',
    marginHorizontal: '20@s',
    marginBottom: '30@vs',
    paddingVertical: '15@vs',
    borderRadius: '12@s',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  logoutText: {
    fontSize: '16@s',
    fontWeight: '600',
    color: '#ff4757',
  },
});