import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from '../../firebaseInit';
import PostsList from '../components/postsList';
// import Toolbar from '../components/toolbar';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        firebase.database().ref('posts').on('value', function(data) {
            let posts = data.val();
            let sortedPosts = Object.keys(posts).reverse().map((date) => posts[date])
            this.setState({posts: sortedPosts});
        }.bind(this));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <PostsList posts={this.state.posts} />
                </ScrollView>
            </View>
        )
    }
}
