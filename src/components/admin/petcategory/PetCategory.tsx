import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPaw, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  addNewUnadoptPet,
  addPetCategory,
  getPetCategory,
  updatePetCategory,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

const PetCategory: React.FC = () => {
  const [petTypes, setPetTypes] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [licenseCost, setLicenseCost] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  useEffect(() => {
    async function getPetTypes() {
      try {
        const petCategory: any = await getPetCategory();
        setPetTypes(petCategory);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (petTypes.length === 0 && !isFetched) {
      getPetTypes();
    }
  });

  const doUpdateType = async () => {
    try {
      setIsVerifying(true);
      const responseCode =
        mode === "ADD"
          ? await addPetCategory(type, licenseCost)
          : await updatePetCategory(
              type,
              status ? "true" : "false",
              licenseCost
            );
      responseCode === 200 && alert("Updated successfully");
      setPetTypes([]);
      setMode("");
      setIsVerifying(false);
      setIsFetched(false);
    } catch (err: any) {
      setIsVerifying(false);
    } finally {
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
  };

  const doAddNewUnadoptPet = async () => {
    try {
      setIsVerifying(true);
      const responseCode = await addNewUnadoptPet(
        name,
        dob,
        gender,
        weight,
        categoryId
      );
      responseCode === 200 && alert("Added successfully");
      setMode("");
      setIsVerifying(false);
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
        dataLength={petTypes.length}
        icon={faPaw}
        placeholder="No pet types available"
        actionIcon={faPlusCircle}
        actionText="Add Pet Type"
        actionCallback={() => {
          setMode("ADD");
          setType("");
          setLicenseCost(0);
          setStatus(true);
        }}
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Pet Category</h3>
              <button
                className="btn bg-primary mb-4 text-white login-button"
                data-toggle="modal"
                data-target="#petModal"
                onClick={() => {
                  setMode("ADD");
                  setType("");
                  setLicenseCost(0);
                  setStatus(true);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp; Add Pet Type
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">License Cost</th>
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
                    <td>{t.licenseCost}</td>
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
                          setType(t.name);
                          setStatus(t.isActive);
                          setLicenseCost(t.licenseCost);
                        }}
                      />
                      {t.isActive && (
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          size={"1x"}
                          className="text-primary mx-2 cursor-pointer"
                          title="Add Pet for Adoption"
                          data-toggle="modal"
                          data-target="#petModal"
                          onClick={() => {
                            setMode("NEW_PET");
                            setCategoryId(t.id);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DataList>
      <Modal
        title={
          mode === "NEW_PET"
            ? "Add New Pet"
            : mode === "ADD"
            ? "Create Pet Type"
            : "Update Pet Type"
        }
        submitText={
          mode === "NEW_PET" ? "Create" : mode === "ADD" ? "Create" : "Update"
        }
        doSubmit={mode === "NEW_PET" ? doAddNewUnadoptPet : doUpdateType}
      >
        {mode !== "" && mode !== "NEW_PET" && (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Pet Type</label>
              <input
                type="text"
                className="form-control"
                value={type}
                onChange={(ev) => doUpdateFields(ev, setType)}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={status}
                onChange={(ev) => setStatus(ev.target.checked)}
              />
              <label className="text-secondary form-check-label">Active</label>
            </div>
            <div className="form-group">
              <label className="text-secondary">License Cost</label>
              <input
                type="number"
                className="form-control"
                value={licenseCost}
                onChange={(ev) => setLicenseCost(ev.target.valueAsNumber)}
                required
                min={5}
              />
            </div>
          </Fragment>
        )}

        {mode === "NEW_PET" && (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Pet Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(ev) => doUpdateFields(ev, setName)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={(ev) => doUpdateFields(ev, setDob)}
                required
                min={"1970-01-01"}
              />
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
                  onChange={(ev) => doUpdateFields(ev, setGender)}
                  required
                />
                <label className="text-secondary form-check-label">F</label>
              </div>
            </div>
            <div className="form-group">
              <label className="text-secondary">Weight (in grams)</label>
              <input
                type="number"
                className="form-control"
                value={weight}
                onChange={(ev) => setWeight(ev.target.valueAsNumber)}
                required
                min={5}
              />
            </div>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default AdminLayout(PetCategory);
