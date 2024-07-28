import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetLicense.css";
import {
  approvePetLicense,
  getAppliedPetLicense,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faIdBadge,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

const MyPet: React.FC = () => {
  const [licenses, setLicenses] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [licenseId, setLicenseId] = useState<number>(0);
  const [petId, setPetId] = useState<number>(0);
  const [petName, setPetName] = useState<string>("");

  useEffect(() => {
    async function getLicense() {
      try {
        const licens: any = await getAppliedPetLicense();
        setLicenses(licens);
        setIsVerifying(false);
        setMode("");
        setLicenseId(0);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (licenses.length === 0 && !isFetched) {
      getLicense();
    }
  });

  const getMonths = (dob: string) => {
    let diff = (new Date().getTime() - new Date(dob).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  const doApproveLicense = async () => {
    if (mode === "EDIT") {
      await approvePetLicense(licenseId);
      setIsFetched(false);
      setLicenses([]);
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <DataList
        dataLength={licenses.length}
        icon={faIdBadge}
        placeholder="No licenses applied"
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Applied Pet License</h3>
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
                {licenses.map((t, i) => (
                  <tr key={t.id}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {t.animal.petName}
                      &nbsp;
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        title={"Pet ID: " + t.animal.id}
                      />
                    </td>
                    <td>{t.animal.weight}</td>
                    <td>{t.animal.gender}</td>
                    <td className="text-capitalize">
                      {t.animal.petCategory.name}
                    </td>
                    <td className="text-capitalize">{t.amount}</td>
                    <td>{getMonths(t.animal.dob)}</td>
                    <td>
                      <button
                        className="bg-primary text-white btn"
                        onClick={() => {
                          setMode("EDIT");
                          setPetId(t.animal.id);
                          setPetName(t.animal.petName);
                          setLicenseId(t.id);
                        }}
                        data-toggle="modal"
                        data-target="#petModal"
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                        &nbsp; Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            title={mode === "EDIT" && "License Approval"}
            submitText={mode === "EDIT" && "Approve"}
            doSubmit={doApproveLicense}
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
                    disabled
                  />
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
