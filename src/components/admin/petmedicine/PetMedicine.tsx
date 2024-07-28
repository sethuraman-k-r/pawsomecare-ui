import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetMedicine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faPlusCircle,
  faTablets,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  addPetMedicine,
  getPetMedicines,
  updatePetMedicine,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

const PetMedicine: React.FC = () => {
  const [medicines, setMedicines] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [ins, setIns] = useState<boolean>(true);
  const [expire, setExpire] = useState<string>("");
  const [id, setId] = useState<number>(-1);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getPetMedicine() {
      try {
        const med: any = await getPetMedicines();
        setMedicines(med);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (medicines.length === 0 && !isFetched) {
      getPetMedicine();
    }
  });

  const doAddUpdateMedicine = async () => {
    try {
      setIsVerifying(true);
      const responseCode =
        mode === "ADD"
          ? await addPetMedicine(name, desc, cost, count, ins, expire)
          : await updatePetMedicine(id, name, desc, cost, count, ins, expire);
      responseCode === 200 && alert("Updated successfully");
      setMedicines([]);
      setMode("");
      setId(-1);
      setName("");
      setDesc("");
      setCost(0);
      setCount(0);
      setExpire("");
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
        dataLength={medicines.length}
        icon={faTablets}
        placeholder="No medicines available"
        actionIcon={faPlusCircle}
        actionText="Add Medicine"
        actionCallback={() => {
          setMode("ADD");
          setId(-1);
          setName("");
          setDesc("");
          setCost(0);
          setCount(0);
          setExpire("");
          setIns(true);
        }}
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Medicine Details</h3>
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
                  setCount(0);
                  setExpire("");
                  setIns(true);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp; Add Medicine
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Per Cost</th>
                  <th scope="col">Available Count</th>
                  <th scope="col">Insurance</th>
                  <th scope="col">Expires At</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">{t.id}</th>
                    <td>
                      {t.name}
                      <br />
                      <span className="small">{t.description}</span>
                    </td>
                    <td className="text-capitalize">{t.perCost}</td>
                    <td className="text-capitalize">{t.count}</td>
                    <td>
                      {t.isInsAllowed ? (
                        <FontAwesomeIcon icon={faCheck} size={"1x"} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} size={"1x"} />
                      )}
                    </td>
                    <td className="text-capitalize">
                      {t.expiresAt && t.expiresAt.substr(0, 10)}
                    </td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size={"1x"}
                        className="mx-2 cursor-pointer text-dark-primary"
                        title="Edit Medicine"
                        data-toggle="modal"
                        data-target="#petModal"
                        onClick={() => {
                          setMode("EDIT");
                          setId(t.id);
                          setName(t.name);
                          setDesc(t.description);
                          setCost(t.perCost);
                          setCount(t.count);
                          setExpire(t.expiresAt && t.expiresAt.substr(0, 10));
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
        title={mode === "ADD" ? "Add New Medicine" : "Update Medicine"}
        submitText={mode === "ADD" ? "Create" : "Update"}
        doSubmit={doAddUpdateMedicine}
      >
        {mode !== "" && (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Medicine Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(ev) => doUpdateFields(ev, setName)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Per Cost</label>
              <input
                type="number"
                className="form-control"
                value={cost}
                onChange={(ev) => setCost(ev.target.valueAsNumber)}
                required
                min={0}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Available Count</label>
              <input
                type="number"
                className="form-control"
                value={count}
                onChange={(ev) => setCount(ev.target.valueAsNumber)}
                required
                min={1}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Expires At</label>
              <input
                type="date"
                className="form-control"
                value={expire}
                onChange={(ev) => setExpire(ev.target.value)}
                required
                min={new Date().toISOString().substr(0, 10)}
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

export default AdminLayout(PetMedicine);
