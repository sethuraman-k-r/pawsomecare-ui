import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./MyPet.css";
import {
  addNewUnadoptPet,
  getMyPets,
  getPetCategory,
  updatePet,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faIdBadge,
  faInfoCircle,
  faPaw,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";
import { getLicenseHtml } from "../../../utils/report.util";

const MyPet: React.FC = () => {
  const [pets, setPets] = useState<Array<any>>([]);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [petId, setPetId] = useState<number>(0);
  const [petName, setPetName] = useState<string>("");
  const [petWeight, setPetWeight] = useState<0>(0);
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [type, setType] = useState<number>(-1);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    async function getPets() {
      try {
        const cli: any = await getMyPets();
        const cats: any = await getPetCategory("user");
        setPets(cli);
        setCategories(cats);
        setIsVerifying(false);
        setMode("");
        setPetId(0);
        setPetName("");
        setPetWeight(0);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (pets.length === 0 && !isFetched) {
      getPets();
    }
  });

  const doUpdatePet = async () => {
    setIsVerifying(true);
    if (mode === "EDIT") {
      await updatePet(petId, petName, petWeight);
    } else {
      await addNewUnadoptPet(name, dob, gender, weight, type, "user");
      setName("");
      setDob("");
      setWeight(0);
      setGender("");
    }
    setIsVerifying(false);
    setIsFetched(false);
    setPets([]);
    document.getElementById("petModal")?.classList.remove("show");
    document.querySelector(".modal-backdrop")?.remove();
  };

  const getMonths = (dob: string) => {
    let diff = (new Date().getTime() - new Date(dob).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
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
        dataLength={pets.length}
        icon={faPaw}
        placeholder="You no longer own any pets"
        secPlaceholder={'To adopt a pet, visit "Adopt Pets"'}
        actionIcon={faPlusCircle}
        actionText={"Add Pet"}
        actionCallback={() => {
          console.log("NICE COMING");
          setMode("ADD");
          setName("");
          setDob("");
          setWeight(0);
          setGender("");
        }}
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>My Pets</h3>
              <button
                className="btn bg-primary mb-4 text-white login-button"
                data-toggle="modal"
                data-target="#petModal"
                onClick={() => {
                  setMode("ADD");
                  setName("");
                  setDob("");
                  setWeight(0);
                  setGender("");
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp; Add Pet
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Pet Name</th>
                  <th scope="col">Weight (in grams)</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Pet Type</th>
                  <th scope="col">License</th>
                  <th scope="col">License Expires At</th>
                  <th scope="col">Age (in months)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((t, i) => (
                  <tr key={t.id}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {t.petName}
                      &nbsp;
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        title={"Pet ID: " + t.id}
                      />
                    </td>
                    <td>{t.weight}</td>
                    <td>{t.gender}</td>
                    <td className="text-capitalize">{t.petCategory.name}</td>
                    <td className="text-capitalize text-center">
                      {t.isLicensed ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          color="green"
                          title={
                            t.licenseForm && t.licenseForm.licenseNo
                              ? t.licenseForm.licenseNo
                              : "-"
                          }
                          onClick={() =>
                            navigator.clipboard.writeText(
                              t.licenseForm.licenseNo
                            )
                          }
                        />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      )}
                    </td>
                    <td>
                      {t.licenseForm && t.licenseForm.expiresOn
                        ? t.licenseForm.expiresOn.substr(0, 10)
                        : "-"}
                    </td>
                    <td>{getMonths(t.dob)}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="mx-2 cursor-pointer text-dark-primary"
                        onClick={() => {
                          setMode("EDIT");
                          setPetId(t.id);
                          setPetName(t.petName);
                          setPetWeight(t.weight);
                        }}
                        data-toggle="modal"
                        data-target="#petModal"
                        title="Update"
                      />
                      {t.isLicensed && (
                        <FontAwesomeIcon
                          icon={faIdBadge}
                          className="mx-2 cursor-pointer text-primary"
                          onClick={() => {
                            const winUrl = URL.createObjectURL(
                              new Blob([getLicenseHtml(t)], {
                                type: "text/html",
                              })
                            );
                            window.open(winUrl);
                          }}
                          title={`Download ${t.petName} License`}
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
        title={mode === "EDIT" ? "Update Pet" : "Add New Pet"}
        submitText={mode === "EDIT" ? "Update" : "Add Pet"}
        doSubmit={doUpdatePet}
      >
        {mode === "EDIT" ? (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Pet #</label>
              <input
                type="text"
                disabled
                className="form-control"
                value={petId}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Pet Name</label>
              <input
                type="text"
                className="form-control"
                value={petName}
                onChange={(ev) => doUpdateFields(ev, setPetName)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Pet Weight</label>
              <input
                type="number"
                className="form-control"
                value={petWeight}
                onChange={(ev) => setPetWeight(ev.target.valueAsNumber)}
                required
              />
            </div>
          </Fragment>
        ) : (
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
              <label className="text-secondary">Pet Type</label>
              <select
                name="pettype"
                className="form-control text-capitalize"
                title="Pet Type"
                onChange={(ev) => setType(+ev.target.value)}
                required
              >
                <option value="-1"></option>
                {categories
                  .filter((c: any) => c.isActive)
                  .map((c, i) => (
                    <option value={c.id} key={i} className="text-capitalize">
                      {c.name}
                    </option>
                  ))}
              </select>
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
                max={new Date().toISOString().substring(0, 10)}
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

export default AdminLayout(MyPet);
