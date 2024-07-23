import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./MyPet.css";
import { getMyPets, updatePet } from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";

const MyPet: React.FC = () => {
  const [pets, setPets] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [petId, setPetId] = useState<number>(0);
  const [petName, setPetName] = useState<string>("");
  const [petWeight, setPetWeight] = useState<0>(0);

  useEffect(() => {
    async function getPets() {
      try {
        const cli: any = await getMyPets();
        setPets(cli);
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
    if (mode === "EDIT") {
      await updatePet(petId, petName, petWeight);
      setIsFetched(false);
      setPets([]);
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
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
      <div className="col-12 my-4">
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h3>My Pets</h3>
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
                  <td className="text-capitalize">
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
                          navigator.clipboard.writeText(t.licenseForm.licenseNo)
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
                    <button
                      className="bg-primary text-white btn"
                      onClick={() => {
                        setMode("EDIT");
                        setPetId(t.id);
                        setPetName(t.petName);
                        setPetWeight(t.weight);
                      }}
                      data-toggle="modal"
                      data-target="#petModal"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      &nbsp; Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          title={mode === "EDIT" && "Update Pet"}
          submitText={mode === "EDIT" && "Update"}
          doSubmit={doUpdatePet}
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
          )}
        </Modal>
      </div>
    </Fragment>
  );
};

export default AdminLayout(MyPet);
