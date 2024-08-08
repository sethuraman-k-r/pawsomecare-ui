import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetAppt.css";
import {
  finalAppointment,
  getPetMedicines,
  getPetVaccines,
  getStaffPetAppointments,
} from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";
import DataList from "../../../hoc-components/UI/datalist/DataList";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const PetAppt: React.FC = () => {
  const [petAppts, setPetAppts] = useState<Array<any>>([]);
  const [petMeds, setPetMeds] = useState<Array<any>>([]);
  const [petVacs, setPetVacs] = useState<Array<any>>([]);
  const [presMeds, setPresMeds] = useState<Array<any>>([]);
  const [analysis, setAnalysis] = useState<string>("");
  const [nextTime, setNextTime] = useState<string>("");
  const [vaccine, setVaccine] = useState<number>(-1);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [appt, setAppt] = useState<any>(null);

  useEffect(() => {
    async function getPetAppts() {
      try {
        const appts: any = await getStaffPetAppointments();
        const meds: any = await getPetMedicines("staff");
        const vacs: any = await getPetVaccines("staff");
        setPetAppts(appts);
        setPetMeds(meds);
        setPetVacs(vacs);
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

  const doFinishAppt = async () => {
    if (appt != null) {
      await finalAppointment(appt.id, vaccine, analysis, nextTime, presMeds);
      setIsFetched(false);
      setPetAppts([]);
      setAppt(null);
      setAnalysis("");
      setNextTime("");
      setVaccine(-1);
      setPresMeds([]);
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
      <DataList
        dataLength={petAppts.length}
        icon={faCalendarCheck}
        placeholder="You don't have any active appointments"
      >
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
                <div className="d-flex justify-content-end">
                  <button className="btn btn-success" onClick={doFinishAppt}>
                    Finish Appointment
                  </button>
                </div>
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
                      <select
                        name="petmedicine"
                        title="Medicine"
                        className="form-control"
                        onChange={(ev) => {
                          const options = [...ev.target.selectedOptions];
                          const values = options.map((option) => {
                            const med = petMeds.find((m) => {
                              return m.id === +option.value;
                            });
                            med.mrng = 0;
                            med.evng = 0;
                            med.noon = 0;
                            med.night = 0;
                            med.nos = 0;
                            return med;
                          });
                          setPresMeds(values);
                        }}
                        // defaultValue={[...grooms.map((g) => g.toString())]}
                        multiple
                      >
                        {petMeds.map((s) => (
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
                    <div>
                      {presMeds.map((m, i) => (
                        <div className="row" key={i}>
                          <div className="form-group col">
                            <input
                              type="text"
                              disabled
                              value={m.name}
                              className="form-control"
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="number"
                              min={1}
                              max={m.count}
                              placeholder="No of Medicines"
                              className="form-control col"
                              onChange={(ev) => {
                                m.nos = ev.target.valueAsNumber;
                              }}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="number"
                              className="form-control col"
                              placeholder="Morning"
                              onChange={(ev) => {
                                m.mrng = ev.target.valueAsNumber;
                              }}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="number"
                              className="form-control col"
                              placeholder="Afternoon"
                              onChange={(ev) => {
                                m.noon = ev.target.valueAsNumber;
                              }}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="number"
                              className="form-control col"
                              placeholder="Evening"
                              onChange={(ev) => {
                                m.evng = ev.target.valueAsNumber;
                              }}
                            />
                          </div>
                          <div className="form-group col">
                            <input
                              type="number"
                              className="form-control col"
                              placeholder="Night"
                              onChange={(ev) => {
                                m.night = ev.target.valueAsNumber;
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="form-group">
                      <label className="text-secondary">Vaccine</label>
                      <select
                        name="petvaccine"
                        title="Vaccine"
                        className="form-control"
                        onChange={(ev) => {
                          setVaccine(+ev.target.value);
                        }}
                      >
                        <option value={-1}></option>
                        {petVacs.map((s) => (
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
                  </Fragment>
                )}
                {appt.groom && (
                  <div className="form-group">
                    <label className="text-secondary">Grooming</label>
                    <select
                      name="petgroom"
                      title="Grooming"
                      className="form-control"
                      disabled
                      multiple
                    >
                      {appt.groomings.map((s) => (
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
                  <label className="text-secondary">Patient Analysis</label>
                  <textarea
                    name="analysis"
                    className="form-control"
                    rows={3}
                    value={analysis}
                    onChange={(ev) => setAnalysis(ev.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="text-secondary">Next Visit Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={nextTime}
                    onChange={(ev) => setNextTime(ev.target.value)}
                    min={new Date(appt.apptTime).toISOString().substring(0, 19)}
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

export default AdminLayout(PetAppt);
