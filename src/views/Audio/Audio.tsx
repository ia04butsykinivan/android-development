import React from 'react';
import {View, Button} from 'react-native-ui-lib';
import Sound from 'react-native-sound';

function Audio() {
  const sound = new Sound(require('../../../assets/sounds/gopak.mp3'));

  return (
    <View padding-16>
      <Button label="Click me" onPress={handlePlayPause} />
    </View>
  );

  function handlePlayPause() {
    if (!sound) {
      return;
    }

    if (sound.isPlaying()) {
      sound.pause();
      return;
    }

    sound.play();
  }
}

export default Audio;
