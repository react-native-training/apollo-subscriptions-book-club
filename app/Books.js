import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { gql, graphql } from 'react-apollo';
import { StackNavigator } from 'react-navigation';
import { ListItem } from 'react-native-elements';

import Book from './Book';

const MYQUERY = gql`query {
  allBooks {
    rating
    author
    image
    description
    title
  }
}`;

const BOOKS_SUBSCRIPTION = gql`
    subscription {
      Book(filter: {
        mutation_in: [CREATED]
      }) {
        node {
          rating
          author
          image
          description
          title
        }
      }
    }
`;

const Header = () => (
  <Image
    resizeMode='contain'
    source={require('./assets/bookitlogo.png')}
    style={{ maxHeight: 36, width: 140 }}
  />
)

class Books extends React.Component {
  static navigationOptions = {
    headerTitle: <Header />
  }
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: BOOKS_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) {
          return prev;
        }
        const { node } = subscriptionData.data.Book
        return {
          ...prev,
          allBooks: [...prev.allBooks, node],
        }
      }
    })
  }
  render() {
    const { loading } = this.props.data;
    let books = [];
    if (this.props.data.allBooks) {
      books = this.props.data.allBooks
    }
    return (
      <ScrollView>
        { loading && <ActivityIndicator style={{ marginTop: 250 }} />}
        {
          books.map((book, index) => {
            return (
              <ListItem
                key={index}
                title={book.title}
                onPress={() => this.props.navigation.navigate('Book', { book })}
              />
            )
          })
        }
      </ScrollView>
    )
  }
}

const GQLBooks = graphql(MYQUERY)(Books);

const RouteConfig = {
  Books: { screen: GQLBooks },
  Book: { screen: Book },
}

export default StackNavigator(RouteConfig);
