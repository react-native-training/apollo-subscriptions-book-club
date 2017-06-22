import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import { gql, graphql } from 'react-apollo';
import { StackNavigator } from 'react-navigation';
import { ListItem } from 'react-native-elements';

import Book from './Book';

const MyQuery = gql`query {
  allBooks {
    rating
    author
    title
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
          title
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
  state = {
    books: [],
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.allBooks.length) {
      this.setState({
        books: nextProps.data.allBooks
      })
    }
  }
  componentWillMount() {
    // console.log('props:', this.props)
    this.props.data.subscribeToMore({
      document: BOOKS_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}) => {
        console.log('prev:', prev)
        console.log('subscriptionData:', subscriptionData)
        // console.log('subscription:', subscription)
        if (!subscriptionData) {
            return prev;
        }
        const { node } = subscriptionData.data.Book
        this.setState({
          books: [...this.state.books, node]
        })
      }
    })
  }
  render() {
    console.log('data:', this.props.data)
    console.log('state:', this.state)
    const { loading } = this.props.data;
    const { books } = this.state;
    return (
      <View>
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
      </View>
    )
  }
}

// const gqlArgs = {
//   props: props => {
//     return {
//       subscribeToNewComments: params => {
//           return props.allBooks.subscribeToMore({
//               document: BOOKS_SUBSCRIPTION,
//               updateQuery: (prev, {subscriptionData}) => {
//                   if (!subscriptionData.data) {
//                       return prev;
//                   }
//                   const newFeedItem = subscriptionData.data.bookAdded;
//                   return Object.assign({}, prev, {
//                       entry: {
//                           allBooks: [newFeedItem, ...prev.entry.allBooks]
//                       }
//                   });
//               }
//           });
//         }
//     }
//   }
// }

const GQLBooks = graphql(MyQuery)(Books);

const RouteConfig = {
  Books: { screen: GQLBooks },
  Book: { screen: Book },
}

const BooksNav = StackNavigator(RouteConfig);

export default BooksNav;
