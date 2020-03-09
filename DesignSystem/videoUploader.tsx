import React, { PureComponent } from 'react';
import { VideoPlayerClass } from '@styles/basicProfile.styles';

let ZiggeoRecorder: any;

interface Props {
  onChange: (videoToken: string) => void;
}

interface State {
  recorderLoaded: boolean;
}

export class VideoUploader extends PureComponent<Props> {
  state: State = {
    recorderLoaded: false
  };

  recorderRecording = () => {
    // tslint:disable-next-line: no-console
    // console.log("Recorder onRecording", embedding);
  };

  recorderUploading = () => {
    // tslint:disable-next-line: no-console
    // console.log("Recorder uploading", embedding);
  };

  onUploaded = () => {
    // tslint:disable-next-line: no-console
    // console.log("Recorder onUploaded", embedding);
  };

  onProcessed = (embedding: any) => {
    // tslint:disable-next-line: no-console
    this.props.onChange(embedding.video_data.token);
  };

  componentDidMount() {
    ZiggeoRecorder = require('react-ziggeo').ZiggeoRecorder;
    this.setState({ recorderLoaded: true });
  }

  render() {
    if (!this.state.recorderLoaded) {
      return <>Loading ... </>;
    }
    return (
      <div>
        <ZiggeoRecorder
          apiKey='a8fa1bc7a16f78828cd6ab2e87b17'
          height={480}
          width='100%'
          webrtc
          theme={'minimalist'}
          picksnapshots={false}
          allowcustomupload={false}
          allowredo={false}
          webrtc_streaming
          webrtc_streaming_if_necessary
          webrtc_on_mobile
          onRecording={this.recorderRecording}
          onUploading={this.recorderUploading}
          onUploaded={this.onUploaded}
          onProcessed={this.onProcessed}
          className={VideoPlayerClass}
        />
      </div>
    );
  }
}
