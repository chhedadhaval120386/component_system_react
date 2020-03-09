import React, { PureComponent } from "react";

interface Props {
  onChange: (val: string) => void;
  data?: string;
}

interface State {
  editorLoaded: boolean;
}

let CKEditor: any;
let ClassicEditor: any;

export class CustomEditor extends PureComponent<Props, State> {
  state: State = {
    editorLoaded: false
  };

  componentDidMount() {
    CKEditor = require("@ckeditor/ckeditor5-react");
    ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    this.setState({ editorLoaded: true });
  }

  render() {
    const { data, onChange } = this.props;
    if (typeof window !== "undefined" && this.state.editorLoaded) {
      return (
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onInit={(editor: any) => {
            Array.from(editor.ui.componentFactory.names());
          }}
          onChange={(_event: any, editor: any) => {
            const dat = editor.getData();
            // tslint:disable-next-line: no-console
            onChange(dat);
          }}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "undo",
              "redo",
              "insertTable",
              "tableColumn",
              "tableRow",
              "mergeTableCells"
            ]
          }}
        />
      );
    }
    return <>{""}</>;
  }
}
