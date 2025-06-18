import React from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button/Button";
import './Dialog.scss'
const Dialog = ({
  isOpen,
  confirm = { text: "", onConfirm: () => {} },
  onClose,
  children,
  title,
  close
}) => {
  if (!isOpen) return null; // Render nothing if the dialog is not open
  return (
    <>
      <div className="dialog-overlay" onClick={onClose}>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
          {/* Dialog Header */}
          <div className="dialog-header">
            <h3>{title}</h3>
            <Button
              size="small"
              type="plain"
              onClick={onClose}
              className="close-icon-dialog"
            >
              <IoMdClose color="#000" size={"15px"} />
            </Button>
          </div>
          {/* Dialog Body */}
          <div className="dialog-body">{children}</div>
          {/* Dialog Footer */}
          <div className="dialog-footer">
            {/* {!close && <Button size="small" type="border" onClick={onClose}>
              Close
            </Button>} */}
            {confirm.text && (
              <Button size="small" type="primary" onClick={confirm.onConfirm}>
                {confirm.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
