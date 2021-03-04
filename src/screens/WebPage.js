import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebPage extends Component {
	render() {	
  	const link = this.props.route.params.link[1].url;
  	return (
    	<WebView source={{ uri: link }} style={{ flex: 1 }} startInLoadingState />
  		)
	}
}