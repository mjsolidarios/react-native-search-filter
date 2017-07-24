import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter'
import emails from './mails'
const KEYS_TO_FILTERS = ['user.name', 'subject']

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  render() {
    const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <SearchInput onChangeText={(term) => { this.searchUpdated(term) }} />
        <ScrollView>
          {filteredEmails.map(email => {
            return (
              <View key={email.id} style={styles.emailItem}>
                <Text>{email.user.name}</Text>
                <Text style={styles.emailSubject}>{email.subject}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    margin: 10,
    marginTop: 50
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)'
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  }
});
