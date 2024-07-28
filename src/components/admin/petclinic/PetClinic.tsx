import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetClinic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faEdit,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  addPetClinic,
  getPetClinics,
  updatePetClinic,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

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
        const cli: any = await getPetClinics("admin");
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
        dataLength={clinics.length}
        icon={faClinicMedical}
        placeholder="No clinics available"
        actionIcon={faPlusCircle}
        actionText="Add Clinic"
        actionCallback={() => {
          setMode("ADD");
          setId(-1);
          setName("");
          setDesc("");
          setSpl("");
          setAddress("");
          setDesc("");
        }}
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Clinic Details</h3>
              <button
                className="btn bg-primary mb-4 text-white login-button"
                data-toggle="modal"
                data-target="#petModal"
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
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp; Add Clinic
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Clinic Name</th>
                  <th scope="col">Specialities</th>
                  <th scope="col">Description</th>
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
                      <span className="small font-italic">
                        <address>{t.address}</address>
                      </span>
                    </td>
                    <td>
                      <pre>{t.specialities}</pre>
                    </td>
                    <td>
                      <pre>{t.description}</pre>
                    </td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size={"1x"}
                        className="mx-2 cursor-pointer text-dark-primary"
                        title="Edit Clinic"
                        data-toggle="modal"
                        data-target="#petModal"
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
      </DataList>

      <Modal
        title={mode === "ADD" ? "Add New Clinic" : "Update Clinic"}
        submitText={mode === "ADD" ? "Create" : "Update"}
        doSubmit={doAddUpdateClinic}
      >
        {mode !== "" && (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Clinic Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(ev) => doUpdateFields(ev, setName)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Clinic Specialities</label>
              <textarea
                rows={3}
                className="form-control"
                value={spl}
                onChange={(ev) => doUpdateFields(ev, setSpl)}
                required
              ></textarea>
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
            <div className="form-group">
              <label className="text-secondary">Address</label>
              <textarea
                rows={3}
                className="form-control"
                value={address}
                onChange={(ev) => doUpdateFields(ev, setAddress)}
                required
              ></textarea>
            </div>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default AdminLayout(PetClinic);
