import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* TS Import */
import { Auth } from "../../../services/auth.services";

/* CSS Import */
import "./PetCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  addPetCategory,
  getPetCategory,
  updatePetCategory,
} from "../../../services/http.services";

const PetCategory: React.FC = () => {
  const [petTypes, setPetTypes] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  useEffect(() => {
    async function getPetTypes() {
      try {
        const petCategory: any = await getPetCategory();
        setPetTypes(petCategory);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      }
    }

    if (petTypes.length === 0) {
      getPetTypes();
    }
  });

  const doUpdateType = async () => {
    try {
      setIsVerifying(true);
      const responseCode =
        mode === "ADD"
          ? await addPetCategory(type)
          : await updatePetCategory(type, status ? "true" : "false");
      responseCode === 200 && alert("Updated successfully");
      setPetTypes([]);
      setMode("");
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
          <div className="d-flex flex-row" style={{ flexGrow: 14 }}>
            <div className="user-form m-4">
              <div className="form-group">
                <button
                  className="btn bg-primary form-control mb-4 text-white login-button w-25"
                  onClick={() => {
                    setMode("ADD");
                  }}
                >
                  Add Pet Type
                </button>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {petTypes.map((t) => (
                      <tr key={t.id}>
                        <th scope="row">{t.id}</th>
                        <td className="text-capitalize">{t.name}</td>
                        <td>{t.isActive ? "Active" : "Inactive"}</td>
                        <td className="text-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            size={"1x"}
                            color="red"
                            onClick={() => {
                              setMode("EDIT");
                              setType(t.name);
                              setStatus(t.isActive);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {mode !== "" && (
              <div className="user-form m-4">
                <h6 className="font-weight-bold mb-3">
                  {mode === "ADD" ? "Create Pet Type" : "Update Pet Type"}
                </h6>
                <div className="form-group">
                  <label className="text-secondary">Pet Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={type}
                    onChange={(ev) => doUpdateFields(ev, setType)}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={status}
                    onChange={(ev) => setStatus(ev.target.checked)}
                  />
                  <label className="text-secondary form-check-label">
                    Active
                  </label>
                </div>
                <div className="form-group">
                  <button
                    className="btn bg-primary form-control mt-2 mb-2 text-white login-button"
                    onClick={doUpdateType}
                  >
                    {mode === "ADD" ? "Create" : "Update"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PetCategory;
