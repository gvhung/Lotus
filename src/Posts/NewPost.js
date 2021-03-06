import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { Actions } from 'react-native-router-flux';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            height: 0,
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('User', (err, user) => {
            user = JSON.parse(user);
            let uid = user.uid;
            firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
                let data = snapshot.val();
                this.setState({
                    posts: data.posts,
                    uid: uid,
                    currentRankRep: data.currentRankRep,
                    rep: data.reputation
                });
            }.bind(this));
        });
    }

    handleText = (text) => {
        this.setState({text});
    }

    handleTitle = (title) => {
        this.setState({title});
    }

    updatePostsNumberAndReputation = () => {
        firebase.database().ref(`Users/${this.state.uid}`).update({
            posts: this.state.posts + 1,
            currentRankRep: this.state.currentRankRep + 2,
            reputation: this.state.rep + 2
        });
    }

    sendPost = () => {
        if (this.state.title === '' || this.state.text === '') {
            Alert.alert('Can\'t post', 'Title or Text content cannot be empty.');
        } else {
            let date = new Date();
            let postId = firebase.database().ref('Posts').push().key;
            firebase.database().ref('Posts/'+postId).update({
                title: this.state.title,
                text: this.state.text,
                id: postId,
                createdAt: date,
                highFives: 0,
                likes: 0,
                thumbsUps: 0
            });
            this.setState({title: '', text: ''});
            ToastAndroid.show('Post created', ToastAndroid.SHORT);
            this.updatePostsNumberAndReputation();
            Actions.pop();
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <TextInput
                    value={this.state.title}
                    placeholder="Title"
                    onChangeText={this.handleTitle}
                    autoCapitalize="sentences"
                    style={[styles.input, {marginBottom: 30}]}
                    underlineColorAndroid="#02C39A"
                />

                <TextInput
                    value={this.state.text}
                    placeholder="Write something here..."
                    onChangeText={this.handleText}
                    autoCapitalize="sentences"
                    multiline={true}
                    maxLength={400}
                    numberOfLines={5}
                    underlineColorAndroid="#02C39A"
                    onChange={(event) => {
                        this.setState({
                            text: event.nativeEvent.text,
                            height: event.nativeEvent.contentSize.height,
                        });
                    }}
                    style={[styles.input, {height: Math.max(58, this.state.height > 200 ? 200 : this.state.height)}]}
                />

                <View style={{alignItems: 'flex-end', marginRight: 4}}>
                    <Text style={{color: 400 - this.state.text.length <= 10 ? 'red' : 'black'}}>
                        {400 - this.state.text.length}
                    </Text>
                </View>

                <View style={{marginTop: 40, alignItems: 'center'}}>
                    <TouchableHighlight
                        onPress={this.sendPost}
                        placeholder="Title" style={styles.sendBtn}
                        underlayColor="#16a085"
                    >
                        <Text style={{color: 'white', fontSize: 22}}>Done</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    sendBtn: {
        backgroundColor: '#02C39A',
        width: 200,
        alignItems: 'center',
        marginTop: 30,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 30
    },
    input: {
        paddingBottom: 6,
        fontSize: 18,
    },
});
