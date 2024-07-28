import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetLicense.css";
import { applyPetLicense, getMyPets } from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHourglassHalf,
  faIdBadge,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

const MyPet: React.FC = () => {
  const [pets, setPets] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [petId, setPetId] = useState<number>(0);
  const [petName, setPetName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [licenseCost, setLicenseCost] = useState<0>(0);

  useEffect(() => {
    async function getPets() {
      try {
        const cli: any = await getMyPets();
        setPets(cli);
        setIsVerifying(false);
        setMode("");
        setPetId(0);
        setPetName("");
        setLicenseCost(0);
        setDesc("");
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

  const getMonths = (dob: string) => {
    let diff = (new Date().getTime() - new Date(dob).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  const doApplyLicense = async () => {
    if (mode === "EDIT") {
      await applyPetLicense(petId, licenseCost, desc);
      setIsFetched(false);
      setPets([]);
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
        dataLength={pets.length}
        icon={faIdBadge}
        placeholder="You no longer own any pets to apply for license"
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Apply Pet License</h3>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Pet Name</th>
                  <th scope="col">Weight (in grams)</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Pet Type</th>
                  <th scope="col">License Cost</th>
                  <th scope="col">Age (in months)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pets
                  .filter((p) => !p.isLicensed)
                  .map((t, i) => (
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
                      <td className="text-capitalize">
                        {t.petCategory.licenseCost}
                      </td>
                      <td>{getMonths(t.dob)}</td>
                      <td>
                        {(t.licenseForm === null ||
                          (t.licenseForm !== null &&
                            !t.licenseForm.isActive)) && (
                          <button
                            className="bg-primary text-white btn"
                            onClick={() => {
                              setMode("EDIT");
                              setPetId(t.id);
                              setPetName(t.petName);
                              setLicenseCost(t.petCategory.licenseCost);
                              setDesc("");
                            }}
                            data-toggle="modal"
                            data-target="#petModal"
                          >
                            <FontAwesomeIcon icon={faBook} />
                            &nbsp; Apply License
                          </button>
                        )}
                        {t.licenseForm !== null && t.licenseForm.isActive && (
                          <button
                            className="bg-secondary text-white btn"
                            style={{ cursor: "none" }}
                            disabled
                          >
                            <FontAwesomeIcon icon={faHourglassHalf} />
                            &nbsp; License Awaiting
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <Modal
            title={mode === "EDIT" && "Apply for License"}
            submitText={mode === "EDIT" && "Apply"}
            doSubmit={doApplyLicense}
          >
            {mode === "EDIT" && (
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
                  <label className="text-secondary">License Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    value={licenseCost}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="text-secondary">Remarks</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    value={desc}
                    onChange={(ev) => doUpdateFields(ev, setDesc)}
                  ></textarea>
                </div>
              </Fragment>
            )}
          </Modal>
        </div>
      </DataList>
    </Fragment>
  );
};

export default AdminLayout(MyPet);
