import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetGrooming.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faCheck,
  faEdit,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  addPetGrooming,
  getPetGrooming,
  updatePetGrooming,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

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
    } finally {
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
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

      <DataList
        dataLength={petGrooms.length}
        icon={faBath}
        placeholder="No grooming services available"
        actionIcon={faPlusCircle}
        actionText="Add Grooming"
        actionCallback={() => {
          setMode("ADD");
          setId(-1);
          setName("");
          setDesc("");
          setCost(0);
          setTime(0);
          setIns(true);
        }}
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Grooming Services</h3>
              <button
                className="btn bg-primary mb-4 text-white login-button"
                data-toggle="modal"
                data-target="#petModal"
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
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp; Add Grooming
              </button>
            </div>
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
                        className="mx-2 cursor-pointer text-dark-primary"
                        title="Edit Pet Type"
                        data-toggle="modal"
                        data-target="#petModal"
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
      </DataList>

      <Modal
        title={mode === "ADD" ? "Add New Grooming" : "Update Grooming Service"}
        submitText={mode === "ADD" ? "Create" : "Update"}
        doSubmit={doAddUpdateGroom}
      >
        {mode !== "" && (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Grooming Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(ev) => doUpdateFields(ev, setName)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Grooming Cost</label>
              <input
                type="number"
                className="form-control"
                value={cost}
                onChange={(ev) => setCost(ev.target.valueAsNumber)}
                required
                min={1}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Time Required (in mins)</label>
              <input
                type="number"
                className="form-control"
                value={time}
                onChange={(ev) => setTime(ev.target.valueAsNumber)}
                required
                min={5}
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
                required
              ></textarea>
            </div>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default AdminLayout(PetGrooming);
