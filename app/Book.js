import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, Image } from 'react-native';

const { width } = Dimensions.get('window');

const Field = ({ name, value }) => <Text style={styles.field}>{`${name}: ${value}`}</Text>;

export default class Book extends React.Component {
  static navigationOptions = (props) => {
    const { title } = props.navigation.state.params.book;
    return ({
      title: title
    })
  }
  render() {
    const { image, author, title, description, rating } = this.props.navigation.state.params.book;
    return (
      <ScrollView style={styles.container}>
        {
          image && (
            <Image
              resizeMode='contain'
              source={{ uri: image }}
              style={styles.image}
            />
          )
        }
        { author && <Field name='Author' value={author} />}
        { title && <Field name='Title' value={title} />}
        { description && <Field name='Description' value={description} />}
        { rating && <Field name='Rating' value={rating} />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 200,
    width,
    marginBottom: 20,
  },
  field: {
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
  }
})
