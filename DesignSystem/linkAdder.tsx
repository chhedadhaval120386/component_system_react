import React, { PureComponent } from "react";
import { Modal, Button } from "pebble-web";
import {
  modalOuterCont,
  modalOuterContInner,
  modalClose,
  modalBody,
  modalTitle,
  profileSection,
  sectionItemContainer,
  profileFooter
} from "@styles/basicProfile.styles";
import { uploaderCont } from "./fileUploader.styles";
import { resumeUploadCont } from "@styles/signup.styles";
import CustomInput from "./input";
import { css } from "emotion";
import { isWebUri } from "valid-url";

interface Props {
  className?: string;
  placeholder: string;
  onChange: ({ name, link }: { name?: string; link?: string }) => void;
  disabled?: boolean;
}

interface State {
  showModal: boolean;
  submitting: boolean;
  name?: string;
  link?: string;
  errors: { name?: string; link?: string };
}

export class LinkAdder extends PureComponent<Props> {
  state: State = {
    showModal: false,
    submitting: false,
    errors: {}
  };

  validate = () => {
    const { name, link } = this.state;
    const errors: { name?: string; link?: string } = {};
    if (!name) {
      errors.name = "Link name is required";
    }
    if (!link || (link && !isWebUri(link))) {
      errors.link = "Link Url is invalid";
    }
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return false;
    }
    return true;
  };

  onChange = () => {
    const isValid = this.validate();
    if (isValid) {
      const { name, link } = this.state;
      this.setState({ showModal: false });
      this.props.onChange({ name, link });
    }
  };

  render() {
    const { className, placeholder, disabled } = this.props;

    const { showModal, name, link, errors } = this.state;

    return (
      <div className={className}>
        <div
          className={`${uploaderCont} ${resumeUploadCont} ${
            disabled ? "disabled" : ""
          }`}
          onClick={() => {
            if (disabled) {
              return;
            }
            this.setState({ showModal: true });
          }}
        >
          <div style={{ textAlign: "center" }}>
            <i className={`pi pi-link`} />
            <div style={{ marginTop: 5, fontSize: 14 }}>{placeholder}</div>
          </div>
        </div>
        {showModal && (
          <>
            <Modal visible={showModal} modalClassName={modalOuterCont}>
              <div className={modalOuterContInner}>
                <div
                  className={modalClose}
                  onClick={() => {
                    this.setState({ showModal: false });
                  }}
                >
                  <i className="pi pi-close" />
                </div>
                <div className={modalBody}>
                  <div className={modalTitle}>Add New Link</div>
                  <div className={profileSection}>
                    <div className={sectionItemContainer}>
                      <CustomInput
                        onChange={(val: string) => {
                          this.setState({ name: val });
                        }}
                        value={name}
                        placeholder="LINK NAME"
                        inputPlaceHolder="Enter Name"
                        errorMessage={errors.name}
                      />
                    </div>
                  </div>
                  <div className={profileSection}>
                    <div className={sectionItemContainer}>
                      <CustomInput
                        onChange={(val: string) => {
                          this.setState({ link: val });
                        }}
                        value={link}
                        placeholder="URL"
                        inputPlaceHolder="Enter Url"
                        errorMessage={errors.link}
                        type="link"
                      />
                    </div>
                  </div>
                  <div className={profileFooter}>
                    <Button
                      onClick={this.onChange}
                      className={css({ display: "inline-flex !important" })}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    );
  }
}
