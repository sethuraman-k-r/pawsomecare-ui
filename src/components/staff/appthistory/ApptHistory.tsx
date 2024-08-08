import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./ApptHistory.css";
import { getStaffPetAppointmentsHistory } from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import DataList from "../../../hoc-components/UI/datalist/DataList";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

const ApptHistory: React.FC = () => {
  const [petAppts, setPetAppts] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [appt, setAppt] = useState<any>(null);

  useEffect(() => {
    async function getPetAppts() {
      try {
        const appts: any = await getStaffPetAppointmentsHistory();
        setPetAppts(appts);
        setIsVerifying(false);
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

  const getMonths = (dob: string) => {
    let diff = (new Date().getTime() - new Date(dob).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <DataList
        dataLength={petAppts.length}
        icon={faHistory}
        placeholder="No history available"
      >
        <div className="col-12 my-4">
          <div className="row">
            <div className="col-4">
              <h3>Appointment History</h3>
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
                        <section
                          className="text-truncate"
                          style={{ width: "300px" }}
                        >
                          {t.reason}
                        </section>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {appt && (
              <div className="col-8">
                <div className="form-group">
                  <label className="text-secondary">
                    Reason for Appointment
                  </label>
                  <textarea
                    name="reason"
                    className="form-control"
                    rows={3}
                    value={appt.reason}
                    disabled
                  ></textarea>
                </div>
                {appt.consult && (
                  <Fragment>
                    <div className="form-group">
                      <label className="text-secondary">Medicine</label>
                      {JSON.parse(
                        appt.appointmentDetails.consultDetails != null
                          ? appt.appointmentDetails.consultDetails
                          : "{}"
                      ).medicine.map((v: any, i: number) => (
                        <div className="row" key={i}>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.medicine}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.count}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.mrng}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.noon}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.evng}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.ngt}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.cost}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="form-group">
                      <label className="text-secondary">Vaccine</label>
                      {JSON.parse(
                        appt.appointmentDetails.consultDetails != null
                          ? appt.appointmentDetails.consultDetails
                          : "{}"
                      ).vaccine.map((v: any, i: number) => (
                        <div className="row" key={i}>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.name}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={v.cost}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}
                {appt.groom && (
                  <div className="form-group">
                    <label className="text-secondary">Grooming</label>
                    {JSON.parse(
                      appt.appointmentDetails.groomDetails != null
                        ? appt.appointmentDetails.groomDetails
                        : "{}"
                    ).grooming.map((v: any, i: number) => (
                      <div className="row" key={i}>
                        <div className="form-group col">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={v.name}
                          />
                        </div>
                        <div className="form-group col">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={v.cost}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="form-group">
                  <label className="text-secondary">Patient Analysis</label>
                  <textarea
                    name="analysis"
                    className="form-control"
                    rows={3}
                    value={appt.appointmentDetails.consultDetail || ""}
                    disabled
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="text-secondary">Next Visit Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={appt.nextVisitSuggest.substr(0, 19)}
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DataList>
    </Fragment>
  );
};

export default AdminLayout(ApptHistory);
