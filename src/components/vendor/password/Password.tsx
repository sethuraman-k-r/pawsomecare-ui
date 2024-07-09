import React, { useState, Fragment } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* TS Import */
import { Auth } from "../../../services/auth.services";

/* CSS Import */
import "./Password.css";

const Password: React.FC = () => {
  const [oldP, setOldP] = useState<string>("");
  const [newP, setNewP] = useState<string>("");
  const [confP, setConfP] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const doUpdatePwd = async () => {
    if (oldP && newP && confP && newP === confP) {
      try {
        setIsVerifying(true);
        const responseCode = await Auth.updatePassword(oldP, newP, confP);
        responseCode === 200 && alert("Password updated successfully");
        setIsVerifying(false)
      } catch (err: any) {
        const message = err?.message;
        setIsVerifying(false);
        setConfP("");
        setNewP("");
        setOldP("");
        if (message) {
          alert(message);
        }
      }
    }
  };

  const doUpdateFields = (
    ev: React.ChangeEvent<HTMLInputElement>,
    updateFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    updateFn(ev.target.value);
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <div className="container-fluid d-flex flex-row row h-100 m-0 p-0">
        <div className="col-md-12 d-flex flex-column p-0">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ flexGrow: 14 }}
          >
            <div className="login-form">
              <h6 className="font-weight-bold mb-3">Update Password</h6>
              <div className="form-group">
                <label className="text-secondary">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={oldP}
                  onChange={(ev) => doUpdateFields(ev, setOldP)}
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newP}
                  onChange={(ev) => doUpdateFields(ev, setNewP)}
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">Confirm Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={confP}
                  onChange={(ev) => doUpdateFields(ev, setConfP)}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn bg-primary form-control mt-4 mb-2 text-white login-button"
                  onClick={doUpdatePwd}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Password;
