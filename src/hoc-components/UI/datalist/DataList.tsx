import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";

const DataList: React.FC<any> = ({
  children,
  dataLength,
  icon,
  placeholder,
  secPlaceholder,
  actionIcon,
  actionText,
  actionCallback,
}) => {
  return dataLength > 0 ? (
    <Fragment>{children}</Fragment>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <FontAwesomeIcon icon={icon} size="8x" className="text-dark-primary" />
      {placeholder && <p className="lead mt-2">{placeholder}</p>}
      {secPlaceholder && <p className="mark">{secPlaceholder}</p>}
      {(actionIcon || actionText) && (
        <button
          className="btn bg-primary mb-4 text-white login-button"
          data-toggle="modal"
          data-target="#petModal"
          onClick={(ev) => {
            if (actionCallback) {
              actionCallback(ev);
            }
          }}
        >
          {actionIcon && (
            <Fragment>
              <FontAwesomeIcon icon={actionIcon} /> &nbsp;
            </Fragment>
          )}
          {actionText}
        </button>
      )}
    </div>
  );
};

export default DataList;
