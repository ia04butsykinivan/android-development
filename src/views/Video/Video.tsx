import React from 'react';
import {View} from 'react-native-ui-lib';
import VideoPlayer from 'react-native-video-controls';

function Video() {
  return (
    <View padding-16 flex>
      <VideoPlayer
        source={require('../../../assets/video/bavovna.mp4')}
        style={{flex: 1}}
        disableBack
      />
    </View>
  );
}

export default Video;
