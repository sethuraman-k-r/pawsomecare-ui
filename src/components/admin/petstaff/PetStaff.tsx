import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetStaff.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faHospitalUser,
  faInfoCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  addPetStaff,
  getPetClinics,
  getPetStaffs,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import Modal from "../../../hoc-components/UI/modal/Modal";
import DataList from "../../../hoc-components/UI/datalist/DataList";

const PetStaff: React.FC = () => {
  const [staffs, setStaffs] = useState<Array<any>>([]);
  const [clinics, setClinics] = useState<Array<any>>([]);
  const [mode, setMode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [staffId, setStaffId] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [role, setRole] = useState<string>("");
  const [gender, setGender] = useState<string>("MALE");
  const [staffClinic, setStaffClinic] = useState<Array<number>>([]);
  // const [id, setId] = useState<number>(-1);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getStaffs() {
      try {
        const staff: any = await getPetStaffs();
        const cli: any = await getPetClinics("admin");
        setStaffs(staff);
        setClinics(cli);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (staffs.length === 0 && !isFetched) {
      getStaffs();
    }
  });

  const doAddUpdateStaff = async () => {
    try {
      setIsVerifying(true);
      const responseCode = await addPetStaff(
        name,
        email,
        gender,
        staffId,
        fee,
        role,
        staffClinic
      );

      responseCode === 200 && alert("Updated successfully");
      setStaffs([]);
      setMode("");
      // setId(-1);
      setName("");
      setEmail("");
      setGender("");
      setStaffId(0);
      setFee(0);
      setRole("");
      setStaffClinic([]);
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
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    updateFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    updateFn(ev.target.value);
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <DataList
        dataLength={staffs.length}
        icon={faHospitalUser}
        placeholder={"No staffs available"}
        actionIcon={faPlusCircle}
        actionText="Add Staff"
        actionCallback={() => {
          setMode("ADD");
          // setId(-1);
          setName("");
          setEmail("");
          setGender("");
          setStaffId(0);
          setFee(0);
          setRole("");
          setStaffClinic([]);
        }}
      >
        <div className="col-12 my-4">
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Staff Details</h3>
              <button
                className="btn bg-primary mb-4 text-white login-button"
                data-toggle="modal"
                data-target="#petModal"
                onClick={() => {
                  setMode("ADD");
                  // setId(-1);
                  setName("");
                  setEmail("");
                  setGender("");
                  setStaffId(0);
                  setFee(0);
                  setRole("");
                  setStaffClinic([]);
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp; Add Staff
              </button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Staff Name</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Role</th>
                  <th scope="col">Clinic</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((t, i) => (
                  <tr key={t.id}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      {t.username}
                      &nbsp;
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        size={"1x"}
                        title={`Staff #: ${t.staff.id}`}
                        onClick={() =>
                          navigator.clipboard.writeText(t.staff.id)
                        }
                      />
                      &nbsp;
                      <FontAwesomeIcon
                        icon={faAt}
                        size={"1x"}
                        title={`${t.email}`}
                        onClick={() => navigator.clipboard.writeText(t.email)}
                      />
                    </td>
                    <td>{t.staff.consultFee}</td>
                    <td className="text-capitalize">
                      {t.authorities
                        .map((a: any) => a.authority.replace("ROLE_", ""))
                        .join(", ")}
                    </td>
                    <td>
                      <table>
                        <tbody>
                          {t.staff.clinics.map((c: any, i: number) => (
                            <tr key={i}>
                              <td>
                                <strong>
                                  {i + 1}
                                  {". " + c.name}
                                </strong>
                                <br />
                                <i>{c.specialities}</i>
                                <br />
                                <i>{c.address}</i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DataList>

      <Modal
        title={mode === "ADD" ? "Add New Staff" : "Update Staff"}
        submitText={mode === "ADD" ? "Create" : "Update"}
        doSubmit={doAddUpdateStaff}
      >
        {mode !== "" && (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Staff Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(ev) => doUpdateFields(ev, setName)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Staff Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(ev) => doUpdateFields(ev, setEmail)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Staff ID</label>
              <input
                type="number"
                className="form-control"
                value={staffId}
                onChange={(ev) => setStaffId(ev.target.valueAsNumber)}
                required
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
                  checked={gender === "MALE"}
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
                  checked={gender === "FEMALE"}
                  onChange={(ev) => doUpdateFields(ev, setGender)}
                  required
                />
                <label className="text-secondary form-check-label">F</label>
              </div>
            </div>
            <div className="form-group">
              <label className="text-secondary">Service Fee</label>
              <input
                type="number"
                className="form-control"
                value={fee}
                onChange={(ev) => setFee(ev.target.valueAsNumber)}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Clinic</label>
              <select
                name="clinic"
                className="form-control"
                title="clinic"
                onChange={(ev) => {
                  const options = [...ev.target.selectedOptions];
                  const values = options.map((option) => option.value);
                  setStaffClinic(values);
                }}
                required
                multiple
                defaultValue={[...staffClinic.map((s) => s.toString())]}
              >
                {clinics.map((c, i) => {
                  return (
                    <option value={c.id} key={i}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="text-secondary">Staff Role</label>
              <select
                name="role"
                id="role"
                className="form-control"
                title="staff role"
                onChange={(ev) => {
                  doUpdateFields(ev, setRole);
                }}
                required
                value={role}
              >
                <option value="-1"></option>
                <option value="VETERINARIAN">VETERINARIAN</option>
                <option value="GROOMING">GROOM</option>
              </select>
            </div>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default AdminLayout(PetStaff);
