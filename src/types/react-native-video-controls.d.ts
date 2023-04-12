declare module 'react-native-video-controls' {
  import {Component} from 'react';
  import {ViewProps} from 'react-native';

  interface VideoPlayerProps extends ViewProps {
    source: {uri: string} | number;
    paused?: boolean;
    muted?: boolean;
    resizeMode?: 'contain' | 'cover' | 'stretch';
    repeat?: boolean;
    onLoad?: () => void;
    onEnd?: () => void;
    onError?: () => void;
    disableBack;
  }

  export default class VideoPlayer extends Component<VideoPlayerProps> {}
}
