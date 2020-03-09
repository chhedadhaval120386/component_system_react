import React, { PureComponent } from "react";
import {
  fileFolder,
  fileView,
  fileIcon,
  viewIcon,
  fileIconMain,
  fileNameClass,
  removeFile,
  removeFileIcon
} from "./fileUploader.styles";

interface Props {
  url: string | { link: string; name: string };
  type: "file" | "link";
  onRemove: () => void;
  fileName?: string;
  className?: string;
}

export class FileView extends PureComponent<Props> {
  render() {
    const { url, onRemove, type, fileName, className } = this.props;
    const urlSplit = (
      (typeof url === "object" && url.link ? url.link : (url as string)) || ""
    ).split("/");
    let fileNameToShow = fileName;
    if (!fileName && urlSplit && urlSplit.length) {
      const fileNameItem = urlSplit[urlSplit.length - 1].split("--");
      fileNameToShow = `${decodeURIComponent(fileNameItem[0])}.${
        (fileNameItem[1] || ".").split(".")[1]
      }`;
    }
    return (
      <div className={`${className} ${fileFolder}`}>
        <div className={removeFile} onClick={onRemove}>
          <i className={`pi pi-close-circle-filled ${removeFileIcon}`} />
        </div>
        <div className={fileIcon}>
          <div style={{ textAlign: "center" }}>
            <i
              className={`pi pi-${
                type === "file" ? "document-uploaded" : "link"
              } ${fileIconMain}`}
            />
            <span className={fileNameClass}>{fileNameToShow}</span>
          </div>
        </div>
        <div className={fileView}>
          <span
            onClick={() => {
              // @ts-ignore
              window.open(url, "_blank");
            }}
          >
            View <i className={`pi pi-outgoing-call-2 ${viewIcon}`} />
          </span>
        </div>
      </div>
    );
  }
}

export default FileView;
