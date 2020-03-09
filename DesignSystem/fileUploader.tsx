import React, { PureComponent } from "react";
import axios from "axios";
import { uploaderCont, loaderClass } from "./fileUploader.styles";
import getHash from "@utils/randomHash";
import { Loader, colors } from "pebble-web";
import { resumeUploadCont } from "@styles/signup.styles";

interface Props {
  placeholder: string;
  onChange: ({ url, file }: { url: string; file: File }) => void;
  mimeTypes: string[];
  withUI: boolean;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

interface State {
  name?: string;
  uploadStarted: boolean;
  status: string;
  awsUrl?: string;
  progress: number | string;
  invalidMsg?: string;
  imagePreviewUrl?: string;
  item?: File;
}

const MIMETYPE_MAP: { [key: string]: string } = {
  png: "image/png",
  jpg: "image/jpeg",
  pdf: "application/pdf",
  doc: "application/msword",
  csv: "text/csv",
  docx:
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
};

const getExtn = (filename: string) => {
  if (filename) {
    const splitStr = filename.split(".");
    return splitStr[splitStr.length - 1];
  }
  return "jpeg";
};

export class FileUploader extends PureComponent<Props, State> {
  state: State = {
    uploadStarted: false,
    status: "",
    progress: 0
  };

  static defaultProps = {
    withUI: true
  };

  imageRef: any = undefined;

  // @ts-ignore
  upload(file) {
    this.setState({ uploadStarted: true, status: "", awsUrl: undefined });
    const baseUrl = `/s3-sign?filename=${encodeURIComponent(file.newName)}`;
    return fetch(baseUrl, { method: "get", credentials: "include" })
      .then(data => data.json())
      .then(data => {
        if (data && data.data && data.success === true) {
          const awsUrl = data.data;
          const headers = {
            "Content-Type": file.type
          };
          // @ts-ignore
          const onUploadProgress = progressEvent => {
            this.onUploadProgress(file, progressEvent);
          };
          return axios.put(awsUrl, file, { headers, onUploadProgress }).then(
            () => {
              this.setState({ progress: 100, uploadStarted: false });
              this.onUploadSuccess(file, awsUrl.split("?")[0]);
            },
            err => {
              this.setState({ progress: 100, uploadStarted: false });
              this.onUploadFailure(file, err);
            }
          );
        }
      })
      .catch(err => {
        this.onUploadFailure(file, err);
      });
  }

  // @ts-ignore
  onUploadProgress(file, progressEvent) {
    const progress = parseFloat(
      ((progressEvent.loaded * 100) / progressEvent.total).toString()
    ).toFixed(0);
    // @ts-ignore
    if (progress && !isNaN(progress)) {
      this.setState({ progress });
    }
  }

  // @ts-ignore
  onUploadSuccess(file, awsUrl) {
    this.setState({ status: "uploaded", awsUrl });
    this.props.onChange({ url: awsUrl, file });
  }

  // @ts-ignore
  onUploadFailure(file, err) {
    this.setState({
      status: "failed",
      invalidMsg: "Could not upload Image",
      item: undefined
    });
  }

  onImageChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length) {
      const item = files[0];
      // @ts-ignore
      item.originalName = item.name;
      // @ts-ignore
      item.extn = getExtn(item.name);
      // @ts-ignore
      item.newName = `${item.name.split(".")[0]}--${getHash(item.name)}.${
        item.extn
      }`;

      const src = URL.createObjectURL(item);
      this.setState({
        imagePreviewUrl: src,
        invalidMsg: "",
        status: "",
        item
      });
      if (this.imageRef) {
        this.imageRef.filename = undefined;
        this.imageRef.value = null;
      }
      this.upload(item);
    }
  };

  render() {
    const {
      placeholder,
      mimeTypes,
      withUI,
      className,
      loading,
      disabled
    } = this.props;
    const allowedMimeTypes = (mimeTypes || []).map(mt => MIMETYPE_MAP[mt]);
    const { uploadStarted, progress, item } = this.state;

    return (
      <div className={className}>
        <input
          type="file"
          accept={allowedMimeTypes.join(",")}
          ref={node => {
            // @ts-ignore
            this.imageRef = node;
          }}
          onChange={this.onImageChange}
          style={{ display: "none" }}
        />
        <div
          className={`${uploaderCont} ${!!withUI && resumeUploadCont} ${
            disabled ? "disabled" : ""
          }`}
          onClick={() => {
            if (this.imageRef && !disabled) {
              // @ts-ignore
              this.imageRef.click();
            }
          }}
        >
          {withUI && (
            <>
              {(uploadStarted || loading) && (
                <div style={{ textAlign: "center" }}>
                  <Loader
                    color={colors.blue.base}
                    scale={0.5}
                    className={loaderClass}
                  />
                  <div style={{ marginBottom: 5 }}>{progress} % uploaded</div>
                  <div>{item && item.name}</div>
                </div>
              )}
              {!uploadStarted && !loading && (
                <div style={{ textAlign: "center" }}>
                  <i className={`pi pi-document-uploaded`} />
                  <div style={{ marginTop: 5, fontSize: 14 }}>
                    {placeholder}
                  </div>
                </div>
              )}
            </>
          )}
          {!withUI && (
            <div>
              {placeholder}
              {(uploadStarted || loading) && (
                <Loader
                  color={colors.blue.base}
                  scale={0.5}
                  className={loaderClass}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FileUploader;
