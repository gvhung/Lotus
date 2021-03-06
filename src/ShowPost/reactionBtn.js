import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';

export default class ReactionButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        imgSource: PropTypes.number.isRequired,
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableHighlight onPress={this.props.onPress}>
                    <Image source={this.props.imgSource} style={{height: 26, width: 26}}/>
                </TouchableHighlight>
                <Text style={styles.counter}>{this.props.counterText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counter: {
        marginTop: 4,
        marginRight: 6,
        marginLeft: 4
    }
});
