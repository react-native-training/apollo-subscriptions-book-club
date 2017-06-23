import React from 'react';
import { Image, StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';

import { compose, gql, graphql } from 'react-apollo';

const Button = ({ onPress, children}) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableHighlight>
)

const Input = ({ onChangeText, title, value }) => (
  <View style={styles.inputContainer}>
    <TextInput autoCorrect={false} placeholder={title} value={value} onChangeText={text => onChangeText(text)} style={styles.input} />
  </View>
)

const initialState = {
  book: {
    title: null,
    author: null,
    description: null,
    rating: null,
    image: null,
  }
}

class AddBook extends React.Component {
  state = initialState

  updateBook = (key, value) => {
    this.setState({
      book: {
        ...this.state.book,
        [key]: value,
      }
    })
  }

  addBook = () => {
    const { image, title, author, description, rating } = this.state.book;
    this.props.addBookMutation({
      variables: {
        image, title, author, description, rating: parseInt(rating)
      }
    })
    .then(res => {
      console.log('res:', res)
      this.setState(initialState)
    })
    .catch(err => {
      console.log('err:', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={{ alignSelf: 'center', maxHeight: 35, width: 200 }}
          source={require('./assets/bookitlogo.png')}
        />
        <Input value={this.state.book.title} title='Title' onChangeText={(text) => this.updateBook('title', text)} />
        <Input value={this.state.book.author} title='Author' onChangeText={(text) => this.updateBook('author', text)} />
        <Input value={this.state.book.description} title='Description' onChangeText={(text) => this.updateBook('description', text)} />
        <Input value={this.state.book.rating} title='Rating' onChangeText={(text) => this.updateBook('rating', text)} />
        <Input value={this.state.book.image} title='Image' onChangeText={(text) => this.updateBook('image', text)} />
        <Button style={styles.button} onPress={this.addBook}>
          Add Book
        </Button>
      </View>
    );
  }
}

const addBookMutation = gql`
  mutation createBook($title: String!, $author: String, $description: String, $rating: Int, $image: String) {
    createBook(title: $title, author: $author, description: $description, rating: $rating, image: $image) {
      createdAt
    }
  }
`


export default compose(
  graphql(addBookMutation, {
    name : 'addBookMutation',
  })
)(AddBook)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 30,
    justifyContent: 'center'
  },
  button: {
    marginTop: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f50057'
  },
  buttonText: {
    color: 'white',
  },
  title: {
    color: '#c9c9c9'
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    padding: 10,
    backgroundColor: '#efefef',
    height: 50,
  }
})
