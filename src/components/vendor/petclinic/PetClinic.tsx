import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetClinic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { addPetClinic, getPetClinics, updatePetClinic } from "../../../services/http.services";

const PetClinic: React.FC = () => {
  const [clinics, setClinics] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [spl, setSpl] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [id, setId] = useState<number>(-1);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getPetClinic() {
      try {
        const cli: any = await getPetClinics();
        setClinics(cli);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }


    if (clinics.length === 0 && !isFetched) {
      getPetClinic();
    }
  });

  const doAddUpdateClinic = async () => {
    try {
      setIsVerifying(true);
      const responseCode =
        mode === "ADD"
          ? await addPetClinic(name, desc, spl, address)
          : await updatePetClinic(id, name, desc, spl, address);
      responseCode === 200 && alert("Updated successfully");
      setClinics([]);
      setMode("");
      setId(-1);
      setName("");
      setDesc("");
      setSpl("");
      setAddress("");
      setDesc("");
      setIsVerifying(false);
      setIsFetched(false);
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
            <div className="col-7 m-4">
              <div className="form-group">
                <button
                  className="btn bg-primary form-control mb-4 text-white login-button w-25"
                  onClick={() => {
                    setMode("ADD");
                    setId(-1);
                    setName("");
                    setDesc("");
                    setSpl("");
                    setAddress("");
                    setDesc("");
                  }}
                >
                  Add Clinic
                </button>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Clinic Name</th>
                      <th scope="col">Specialities</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinics.map((t) => (
                      <tr key={t.id}>
                        <th scope="row">{t.id}</th>
                        <td>
                          {t.name}
                          <br />
                          <span className="small">{t.description}</span>
                          <br />
                          <span className="small font-italic">{t.address}</span>
                        </td>
                        <td>{t.specialities}</td>
                        <td className="text-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            size={"1x"}
                            color="red"
                            className="mx-2 cursor-pointer"
                            title="Edit Clinic"
                            onClick={() => {
                              setMode("EDIT");
                              setId(t.id);
                              setName(t.name);
                              setDesc(t.description);
                              setSpl(t.specialities);
                              setAddress(t.address);
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
                  {mode === "ADD" ? "Add New Clinic" : "Update Clinic"}
                </h6>
                <div className="form-group">
                  <label className="text-secondary">Clinic Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(ev) => doUpdateFields(ev, setName)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-secondary">Clinic Specialities</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={spl}
                    onChange={(ev) => doUpdateFields(ev, setSpl)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="text-secondary">Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={desc}
                    onChange={(ev) => doUpdateFields(ev, setDesc)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="text-secondary">Address</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={address}
                    onChange={(ev) => doUpdateFields(ev, setAddress)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <button
                    className="btn bg-primary form-control mt-2 mb-2 text-white login-button"
                    onClick={doAddUpdateClinic}
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

export default PetClinic;
