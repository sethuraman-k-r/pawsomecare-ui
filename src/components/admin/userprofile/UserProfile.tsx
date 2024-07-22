import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* TS Import */
import { Auth } from "../../../services/auth.services";

/* CSS Import */
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [income, setIncome] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [gender, setGender] = useState<string>("MALE");
  const [contact, setContact] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  useEffect(() => {
    async function getUserDetails() {
      try {
        const userDetails = await Auth.getAuthUser();
        setFirstname(userDetails.firstname);
        setLastname(userDetails.lastname || "");
        setUsername(userDetails.username);
        setDob((userDetails.dob || "").substr(0, 10));
        setGender(userDetails.gender || "MALE");
        setIncome(userDetails.annualIncome || "");
        setContact(userDetails.contact || "");
        setAddress(userDetails.address || "");
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      }
    }

    if (username.length === 0) {
      getUserDetails();
    }
  });

  useEffect(() => {
    setUsername(firstname + " " + lastname);
  }, [firstname, lastname]);

  const doUpdateUser = async () => {
    try {
      setIsVerifying(true);
      const responseCode = await Auth.updateUser(
        firstname,
        lastname,
        dob,
        income,
        address,
        contact,
        gender
      );
      responseCode === 200 && alert("User updated successfully");
      setIsVerifying(false);
    } catch (err: any) {
      setIsVerifying(false);
    }
  };

  const doUpdateFields = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
            <div className="user-form">
              <h6 className="font-weight-bold mb-3">Update Details</h6>
              <div className="row">
                <div className="form-group col">
                  <label className="text-secondary">Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    onChange={(ev) => doUpdateFields(ev, setFirstname)}
                  />
                </div>
                <div className="form-group col">
                  <label className="text-secondary">Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    onChange={(ev) => doUpdateFields(ev, setLastname)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="text-secondary">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  disabled
                />
              </div>
              <div className="row">
                <div className="form-group col">
                  <label className="text-secondary">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(ev) => doUpdateFields(ev, setDob)}
                  />
                </div>
                <div className="form-group col">
                  <label className="text-secondary">Annual Income</label>
                  <input
                    type="number"
                    className="form-control"
                    value={income}
                    onChange={(ev) => setIncome(ev.target.valueAsNumber)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="text-secondary">Gender</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value={"MALE"}
                    onChange={(ev) => doUpdateFields(ev, setGender)}
                    checked={gender === "MALE"}
                    required
                  />
                  <label className="text-secondary form-check-label">M</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value={"FEMALE"}
                    checked={gender === "FEMALE"}
                    onChange={(ev) => doUpdateFields(ev, setGender)}
                    required
                  />
                  <label className="text-secondary form-check-label">F</label>
                </div>
              </div>
              <div className="form-group">
                <label className="text-secondary">Contact</label>
                <input
                  type="tel"
                  className="form-control"
                  value={contact}
                  onChange={(ev) => doUpdateFields(ev, setContact)}
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">Address</label>
                <textarea
                  className="form-control"
                  value={address}
                  rows={3}
                  onChange={(ev) => doUpdateFields(ev, setAddress)}
                ></textarea>
              </div>
              <div className="form-group">
                <button
                  className="btn bg-primary form-control mt-4 mb-2 text-white login-button"
                  onClick={doUpdateUser}
                >
                  Update my info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
