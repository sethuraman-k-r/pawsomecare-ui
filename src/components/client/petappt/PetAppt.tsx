import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetAppt.css";
import {
  bookPetAppt,
  doRateAppt,
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
  faCommentAlt,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";
import { getReportHtml } from "../../../utils/report.util";
import DataList from "../../../hoc-components/UI/datalist/DataList";

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
  const [apptId, setApptId] = useState<number>(-1);
  const [feedTitle, setFeedTitle] = useState<string>("");
  const [feedDesc, setFeedDesc] = useState<string>("");
  const [feedRate, setFeedRate] = useState<number>(5);
  const [petId, setPetId] = useState<number>(-1);
  const [clinicId, setClinicId] = useState<number>(-1);
  const [vetStaffId, setVetStaffId] = useState<number>(-1);
  const [grmStaffId, setGrmStaffId] = useState<number>(-1);
  const [services, setServices] = useState<Array<string>>([]);
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
        vetStaffId,
        grmStaffId,
        services,
        apptTime,
        reason,
        grooms
      );
      setIsFetched(false);
      setPets([]);
      setPetId(-1);
      setClinicId(-1);
      setVetStaffId(-1);
      setGrmStaffId(-1);
      setServices([]);
      setGrooms([]);
      setApptTime("");
      setReason("");
      setApptId(-1);
      setFeedTitle("");
      setFeedDesc("");
      setFeedRate(5);
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
  };

  const doSaveFeedback = async () => {
    if (mode === "FEEDBACK") {
      await doRateAppt(apptId, feedTitle, feedDesc, feedRate);
      setIsFetched(false);
      setPets([]);
      setPetId(-1);
      setClinicId(-1);
      setVetStaffId(-1);
      setGrmStaffId(-1);
      setServices([]);
      setGrooms([]);
      setApptTime("");
      setReason("");
      setApptId(-1);
      setFeedTitle("");
      setFeedDesc("");
      setFeedRate(5);
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
  };

  const getStaffByRole = (role: string) => {
    return petStaffs.filter((s) =>
      s.authorities
        .map((a: any) => a["authority"].replace("ROLE_", ""))
        .includes(role)
    );
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <DataList
        dataLength={petAppts.length}
        icon={faCalendarCheck}
        placeholder={"No appointments booked yet"}
        actionIcon={faCalendarCheck}
        actionText="Book Appointment"
        actionCallback={() => {
          setMode("BOOK");
        }}
      >
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
                  <th scope="col">Services</th>
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
                    <td className="text-capitalize">
                      {t.pet.petCategory.name}
                    </td>
                    <td>
                      <strong>{t.clinic.name}</strong>
                      <address>{t.clinic.address}</address>
                    </td>
                    <td>
                      {t.staffDetails.map((s: any) => s.username).join(", ")}
                    </td>
                    <td>{new Date(t.apptTime).toLocaleString()}</td>
                    <td>
                      {t.services.map((s: any) => s.serviceName).join("\n")}
                    </td>
                    <td>
                      {t.status === "CLOSED"
                        ? t.appointmentDetails.amount
                        : "-"}
                    </td>
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
                        className="cursor-pointer mx-2"
                        icon={faFileDownload}
                        color={t.status === "CLOSED" ? "GREEN" : "BLACK"}
                        onClick={() => {
                          const winUrl = URL.createObjectURL(
                            new Blob([getReportHtml(t)], { type: "text/html" })
                          );
                          window.open(winUrl);
                        }}
                      />
                      {t.appointmentDetails.feedback === null && t.status === "CLOSED" && (
                        <FontAwesomeIcon
                          className="cursor-pointer mx-2 text-info"
                          icon={faCommentAlt}
                          data-toggle="modal"
                          data-target="#petModal"
                          onClick={() => {
                            setMode("FEEDBACK");
                            setApptId(t.id);
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
          mode === "BOOK" ? "Booking an appointment" : "Give us a feedback"
        }
        submitText={mode === "BOOK" ? "Book" : "Save"}
        doSubmit={mode === "BOOK" ? doBookAppt : doSaveFeedback}
      >
        {mode === "BOOK" ? (
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
                    getStaffByRole();
                  }
                }}
              >
                <option value={-1}>{""}</option>
                {petClinics.map((c) => (
                  <option className="text-capitalize" value={c.id} key={c.id}>
                    {c.name + " - " + c.address}
                  </option>
                ))}
              </select>
            </div>
            {services.some((v) =>
              ["CONSULTATION", "CHECKUP", "VACCINATION"].includes(v)
            ) && (
              <div className="form-group">
                <label className="text-secondary">Veterinarian Staff</label>
                <select
                  name="petvetstaff"
                  title="Veterinarian Staff"
                  className="form-control"
                  value={vetStaffId}
                  onChange={(ev) => {
                    setVetStaffId(+ev.target.value);
                  }}
                >
                  <option value={-1}></option>
                  {getStaffByRole("VETERINARIAN").map((s) => (
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
            )}
            {services.length > 0 && services.includes("GROOMING") && (
              <div className="form-group">
                <label className="text-secondary">Grooming Staff</label>
                <select
                  name="petgrmstaff"
                  title="Grooming Staff"
                  className="form-control"
                  value={grmStaffId}
                  onChange={(ev) => {
                    setGrmStaffId(+ev.target.value);
                  }}
                >
                  <option value={-1}></option>
                  {getStaffByRole("GROOMING").map((s) => (
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
            )}
            <div className="form-group">
              <label className="text-secondary">Service</label>
              <select
                name="petservice"
                title="Service"
                className="form-control"
                onChange={(ev) => {
                  const options = [...ev.target.selectedOptions];
                  const values = options.map((option) => option.value);
                  setServices(values);
                }}
                defaultValue={[...services.map((g) => g.toString())]}
                multiple
              >
                {petServices.map((s) => (
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
            {services.length > 0 && services.includes("GROOMING") && (
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
                    <option className="text-capitalize" value={s.id} key={s.id}>
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
                min={new Date().toISOString().slice(0, -8)}
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
        ) : (
          <Fragment>
            <div className="form-group">
              <label className="text-secondary">Feedback</label>
              <input
                type="text"
                className="form-control"
                value={feedTitle}
                onChange={(ev) => setFeedTitle(ev.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Rating</label>
              <select
                name="feedrate"
                title="Rating"
                className="form-control"
                onChange={(ev) => {
                  setFeedRate(+ev.target.value);
                }}
                defaultValue={5}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="form-group">
              <label className="text-secondary">Elaborate here</label>
              <textarea
                name="feedelab"
                rows={5}
                className="form-control"
                value={feedDesc}
                onChange={(ev) => setFeedDesc(ev.target.value)}
              ></textarea>
            </div>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default AdminLayout(PetAppt);
