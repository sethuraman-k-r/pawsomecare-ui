import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetAppt.css";
import {
  bookPetAppt,
  getClinicStaffs,
  getStaffPetAppointments,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../hoc-components/UI/modal/Modal";

const PetAppt: React.FC = () => {
  const [petAppts, setPetAppts] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [appt, setAppt] = useState<any>(null);

  useEffect(() => {
    async function getPetAppts() {
      try {
        const appts: any = await getStaffPetAppointments();
        setPetAppts(appts);
        setIsVerifying(false);
        setMode("");
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (petAppts.length === 0 && !isFetched) {
      getPetAppts();
    }
  });

  const doBookAppt = async () => {
    if (mode === "BOOK") {
      // await bookPetAppt(petId, clinicId, staffId, service, apptTime, reason);
      setIsFetched(false);
      document.getElementById("petModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
    }
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
        <div className="row">
          <div className="col-4">
            <h3>My Appointments</h3>
            <table className="table table-bordered">
              <tbody>
                {petAppts.map((t, i) => (
                  <tr key={t.id}>
                    <td
                      className={`cursor-pointer pet-select ${
                        appt !== null && appt.id === t.id
                          ? "pet-select-focus"
                          : ""
                      }`}
                      onClick={() => {
                        setAppt(t);
                      }}
                    >
                      <strong>{`${i + 1}. ${
                        t.pet.petName
                      } (${t.pet.petCategory.name.toUpperCase()})`}</strong>
                      <section>{"Owner: " + t.user.username}</section>
                      <section>
                        {"Pet Age (in months): " + getMonths(t.pet.dob)}
                      </section>
                      <section className="text-truncate">{t.reason}</section>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {appt && (
            <div className="col-8">
              <div className="form-group">
                <label className="text-secondary">Reason for Appointment</label>
                <textarea name="reason" className="form-control" rows={3} value={appt.reason}>
                </textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLayout(PetAppt);
