import React, { PureComponent } from 'react';

let ZiggeoPlayer: any;

interface Props {
  videoToken: string;
  height?: number;
  width?: number;
}

interface State {
  recorderLoaded: boolean;
}

export class VideoPlayer extends PureComponent<Props, State> {
  state: State = {
    recorderLoaded: false
  };

  componentDidMount() {
    ZiggeoPlayer = require('react-ziggeo').ZiggeoPlayer;
    this.setState({ recorderLoaded: true });
  }

  render() {
    const { height, width } = this.props;
    if (!this.state.recorderLoaded) {
      return <>Loading ... </>;
    }
    return (
      <div>
        <ZiggeoPlayer
          apiKey='a8fa1bc7a16f78828cd6ab2e87b17'
          video={this.props.videoToken}
          height={height || 480}
          width={width || 640}
          webrtc
          theme={'minimalist'}
          picksnapshots={false}
          allowcustomupload={false}
          allowredo={false}
          webrtc_streaming
          webrtc_streaming_if_necessary
          webrtc_on_mobile
        />
      </div>
    );
  }
}
