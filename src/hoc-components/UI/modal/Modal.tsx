import React, { Children, Fragment } from "react";

const Modal: React.FC = ({ children, title, submitText, doSubmit }) => {
  return (
    <div
      className="modal fade"
      id="petModal"
      tabIndex={-1}
      aria-labelledby="petModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="petModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            className="mx-4"
            onSubmit={(ev) => {
              ev.preventDefault();
              doSubmit();
            }}
            method="POST"
          >
            <div className="modal-body">
              {Children.map(children, (child, index) => (
                <Fragment key={index}>{child}</Fragment>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-primary text-white login-button"
              >
                {submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
