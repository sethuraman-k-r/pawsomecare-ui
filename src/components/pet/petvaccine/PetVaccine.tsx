import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetVaccine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  addPetVaccine,
  getPetVaccines,
  updatePetVaccine,
} from "../../../services/http.services";

const PetVaccine: React.FC = () => {
  const [vaccines, setVaccines] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [ins, setIns] = useState<boolean>(true);
  const [id, setId] = useState<number>(-1);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getPetVaccine() {
      try {
        const vacc: any = await getPetVaccines();
        setVaccines(vacc);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (vaccines.length === 0 && !isFetched) {
      getPetVaccine();
    }
  });

  const doAddUpdateVaccine = async () => {
    try {
      setIsVerifying(true);
      const responseCode =
        mode === "ADD"
          ? await addPetVaccine(name, desc, cost, ins)
          : await updatePetVaccine(id, name, desc, cost, ins);
      responseCode === 200 && alert("Updated successfully");
      setVaccines([]);
      setMode("");
      setId(-1);
      setName("");
      setDesc("");
      setCost(0);
      setIns(true);
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
                    setCost(0);
                    setIns(true);
                  }}
                >
                  Add Vaccine
                </button>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Vaccine Name</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Insurance</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccines.map((t) => (
                      <tr key={t.id}>
                        <th scope="row">{t.id}</th>
                        <td>
                          {t.name}
                          <br />
                          <span className="small">{t.description}</span>
                        </td>
                        <td className="text-capitalize">{t.amount}</td>
                        <td>
                          {t.isInsAllowed ? (
                            <FontAwesomeIcon icon={faCheck} size={"1x"} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} size={"1x"} />
                          )}
                        </td>
                        <td className="text-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            size={"1x"}
                            color="red"
                            className="mx-2 cursor-pointer"
                            title="Edit Pet Type"
                            onClick={() => {
                              setMode("EDIT");
                              setId(t.id);
                              setName(t.name);
                              setDesc(t.description);
                              setCost(t.amount);
                              setIns(t.isInsAllowed);
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
                  {mode === "ADD"
                    ? "Add New Vaccine"
                    : "Update Vaccine Service"}
                </h6>
                <div className="form-group">
                  <label className="text-secondary">Vaccine Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(ev) => doUpdateFields(ev, setName)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-secondary">Vaccine Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    value={cost}
                    onChange={(ev) => setCost(ev.target.valueAsNumber)}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={ins}
                    onChange={(ev) => setIns(ev.target.checked)}
                  />
                  <label className="text-secondary form-check-label">
                    Insurance
                  </label>
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
                  <button
                    className="btn bg-primary form-control mt-2 mb-2 text-white login-button"
                    onClick={doAddUpdateVaccine}
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

export default PetVaccine;
