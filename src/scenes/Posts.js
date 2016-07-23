import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import firebase from '../../firebaseInit';
import PostsList from '../components/postsList';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        firebase.database().ref('posts').on('value', function(data) {
            this.setState({posts: data.val()});
        }.bind(this));
    }

    render() {
        return (
            <View>
                <PostsList posts={this.state.posts} />
            </View>
        )
    }
}
