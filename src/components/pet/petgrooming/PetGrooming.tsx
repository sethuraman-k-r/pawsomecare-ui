import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetGrooming.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  addNewUnadoptPet,
  addPetCategory,
  addPetGrooming,
  getPetCategory,
  getPetGrooming,
  updatePetCategory,
  updatePetGrooming,
} from "../../../services/http.services";

const PetGrooming: React.FC = () => {
  const [petGrooms, setPetGrooms] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [ins, setIns] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [id, setId] = useState<number>(-1);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getPetGroom() {
      try {
        const grooms: any = await getPetGrooming();
        setPetGrooms(grooms);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (petGrooms.length === 0 && !isFetched) {
      getPetGroom();
    }
  });

  const doAddUpdateGroom = async () => {
    try {
      setIsVerifying(true);
      const responseCode =
        mode === "ADD"
          ? await addPetGrooming(name, desc, cost, ins, time)
          : await updatePetGrooming(id, name, desc, cost, ins, time);
      responseCode === 200 && alert("Updated successfully");
      setPetGrooms([]);
      setMode("");
      setId(-1);
      setName("");
      setDesc("");
      setCost(0);
      setTime(0);
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
                    setTime(0);
                    setIns(true);
                  }}
                >
                  Add Grooming
                </button>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Grooming Name</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Insurance</th>
                      <th scope="col">Time Required</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {petGrooms.map((t) => (
                      <tr key={t.id}>
                        <th scope="row">{t.id}</th>
                        <td>
                          {t.name}
                          <br />
                          <span className="small">{t.description}</span>
                        </td>
                        <td className="text-capitalize">{t.cost}</td>
                        <td>
                          {t.isInsAllowed ? (
                            <FontAwesomeIcon icon={faCheck} size={"1x"} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} size={"1x"} />
                          )}
                        </td>
                        <td className="text-capitalize">{t.timeRequire}</td>
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
                              setCost(t.cost);
                              setTime(t.timeRequire);
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
                    ? "Add New Grooming"
                    : "Update Grooming Service"}
                </h6>
                <div className="form-group">
                  <label className="text-secondary">Grooming Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(ev) => doUpdateFields(ev, setName)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-secondary">Grooming Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    value={cost}
                    onChange={(ev) => setCost(ev.target.valueAsNumber)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-secondary">
                    Time Required (in mins)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={time}
                    onChange={(ev) => setTime(ev.target.valueAsNumber)}
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
                    onClick={doAddUpdateGroom}
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

export default PetGrooming;
