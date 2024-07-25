import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetAppt.css";
import {
  bookPetAppt,
  getClinicStaffs,
  getMyPets,
  getPetAppointments,
  getPetClinics,
  getPetGroomings,
  getPetServices,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCheck,
  faEdit,
  faFileDownload,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";

const PetAppt: React.FC = () => {
  const [pets, setPets] = useState<Array<any>>([]);
  const [petClinics, setPetClinics] = useState<Array<any>>([]);
  const [petAppts, setPetAppts] = useState<Array<any>>([]);
  const [petStaffs, setPetStaffs] = useState<Array<any>>([]);
  const [petServices, setPetServices] = useState<Array<any>>([]);
  const [petGrooms, setPetGrooms] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [petId, setPetId] = useState<number>(-1);
  const [clinicId, setClinicId] = useState<number>(-1);
  const [staffId, setStaffId] = useState<number>(-1);
  const [staffRole, setStaffRole] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [grooms, setGrooms] = useState<Array<number>>([]);
  const [apptTime, setApptTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    async function getPets() {
      try {
        const myPets: any = await getMyPets();
        const clinics: any = await getPetClinics("user");
        const services: any = await getPetServices();
        const appts: any = await getPetAppointments();
        const grms: any = await getPetGroomings();
        setPets(myPets);
        setPetClinics(clinics);
        setPetServices(services);
        setPetAppts(appts);
        setPetGrooms(grms);
        setIsVerifying(false);
        setMode("");
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

  const doBookAppt = async () => {
    if (mode === "BOOK") {
      await bookPetAppt(
        petId,
        clinicId,
        staffId,
        service,
        apptTime,
        reason,
        grooms
      );
      setIsFetched(false);
      setPets([]);
      setPetId(-1);
      setClinicId(-1);
      setStaffId(-1);
      setService("");
      setGrooms([]);
      setApptTime("");
      setStaffRole("");
      setReason("");
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
  };

  const newPS = (): any[] => {
    return staffRole === "GROOMING"
      ? petServices.filter((s) => s.serviceName === "GROOMING")
      : petServices.filter((s) => s.serviceName !== "GROOMING");
  };

  const getMonths = (dob: string) => {
    let diff = (new Date().getTime() - new Date(dob).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <div className="col-12 my-4">
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h3>My Pets Appointments</h3>
            <button
              className="btn bg-primary mb-4 text-white login-button"
              data-toggle="modal"
              data-target="#petModal"
              onClick={() => {
                setMode("BOOK");
              }}
            >
              <FontAwesomeIcon icon={faCalendarCheck} />
              &nbsp; Book Appointment
            </button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Pet Name</th>
                <th scope="col">Pet Type</th>
                <th scope="col">Clinic</th>
                <th scope="col">Staff</th>
                <th scope="col">Appointment Time</th>
                <th scope="col">Service</th>
                <th scope="col">Cost</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {petAppts.map((t, i) => (
                <tr key={t.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{t.pet.petName}</td>
                  <td className="text-capitalize">{t.pet.petCategory.name}</td>
                  <td>
                    <strong>{t.clinic.name}</strong>
                    <address>{t.clinic.address}</address>
                  </td>
                  <td>{t.staffDetails.username}</td>
                  <td>{t.apptTime}</td>
                  <td>{t.service.serviceName}</td>
                  <td>{t.status === "CLOSED" ? t.amount : "-"}</td>
                  <td className="text-capitalize">
                    <button
                      className={`btn ${
                        t.status === "CLOSED"
                          ? "btn-success"
                          : t.status === "OPEN"
                          ? "btn-info"
                          : "btn-secondary"
                      }`}
                      disabled
                    >
                      {t.status}
                    </button>
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faFileDownload}
                      color={t.status === "CLOSED" ? "GREEN" : "BLACK"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          title={mode === "BOOK" && "Booking an appointment"}
          submitText={mode === "BOOK" && "Book"}
          doSubmit={doBookAppt}
        >
          {mode === "BOOK" && (
            <Fragment>
              <div className="form-group">
                <label className="text-secondary">Pet Name</label>
                <select
                  name="petname"
                  title="Pet"
                  className="form-control"
                  value={petId}
                  onChange={(ev) => setPetId(+ev.target.value)}
                >
                  <option value={-1}></option>
                  {pets.map((p) => (
                    <option
                      key={p.id}
                      className="text-capitalize"
                      value={p.id}
                    >{`${p.petName} (${p.petCategory.name})`}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-secondary">Clinic</label>
                <select
                  name="petclinic"
                  title="Clinic"
                  className="form-control"
                  value={clinicId}
                  onChange={async (ev) => {
                    setClinicId(+ev.target.value);
                    if (+ev.target.value !== -1) {
                      const staffs = await getClinicStaffs(+ev.target.value);
                      setPetStaffs(staffs);
                    }
                  }}
                >
                  <option value={-1}></option>
                  {petClinics.map((c) => (
                    <option className="text-capitalize" value={c.id} key={c.id}>
                      {c.name + " - " + c.address}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-secondary">Staff</label>
                <select
                  name="petstaff"
                  title="Staff"
                  className="form-control"
                  value={staffId}
                  onChange={(ev) => {
                    setStaffId(+ev.target.value);
                    setStaffRole(
                      petStaffs
                        .filter((s) => s.staff.id === +ev.target.value)[0]
                        .authorities.map((a) =>
                          a["authority"].replace("ROLE_", "")
                        )[0]
                    );
                  }}
                >
                  <option value={-1}></option>
                  {petStaffs.map((s) => (
                    <option
                      className="text-capitalize"
                      value={s.staff.id}
                      key={s.id}
                    >
                      {`${s.username} (${s.staff.id}) - Fee: ${s.staff.consultFee}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-secondary">Service</label>
                <select
                  name="petservice"
                  title="Service"
                  className="form-control"
                  value={service}
                  onChange={(ev) => setService(ev.target.value)}
                >
                  <option value={""}></option>
                  {newPS().map((s) => (
                    <option
                      className="text-capitalize"
                      value={s.serviceName}
                      key={s.id}
                    >
                      {`${s.serviceName}`}
                    </option>
                  ))}
                </select>
              </div>
              {service === "GROOMING" && (
                <div className="form-group">
                  <label className="text-secondary">Grooming</label>
                  <select
                    name="petgroom"
                    title="Grooming"
                    className="form-control"
                    onChange={(ev) => {
                      const options = [...ev.target.selectedOptions];
                      const values = options.map((option) => option.value);
                      setGrooms(values);
                    }}
                    defaultValue={[...grooms.map((g) => g.toString())]}
                    multiple
                  >
                    {petGrooms.map((s) => (
                      <option
                        className="text-capitalize"
                        value={s.id}
                        key={s.id}
                      >
                        {`${s.name}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group">
                <label className="text-secondary">Appointment time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={apptTime}
                  onChange={(ev) => setApptTime(ev.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">Reason for appointment</label>
                <textarea
                  name="reason"
                  rows={5}
                  className="form-control"
                  value={reason}
                  onChange={(ev) => setReason(ev.target.value)}
                ></textarea>
              </div>
            </Fragment>
          )}
        </Modal>
      </div>
    </Fragment>
  );
};

export default AdminLayout(PetAppt);
