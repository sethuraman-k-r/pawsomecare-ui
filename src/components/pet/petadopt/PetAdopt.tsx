import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetAdopt.css";
import { getUnadoptedPets } from "../../../services/http.services";

const PetAdopt: React.FC = () => {
  const [pets, setPets] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getUnadoptedPet() {
      try {
        const cli: any = await getUnadoptedPets();
        setPets(cli);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (pets.length === 0 && !isFetched) {
      getUnadoptedPet();
    }
  });

  const doUpdateFields = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    updateFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    updateFn(ev.target.value);
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <div className="container-fluid d-flex flex-row row h-100 m-0 p-0">
        <div className="col-md-12 d-flex flex-column p-0">
          <div className="d-flex flex-row" style={{ flexGrow: 14 }}>
            <div className="col-12 mt-4">
              <div className="form-group">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Pet Name</th>
                      <th scope="col">Weight (in grams)</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Pet Type</th>
                      <th scope="col">Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pets.map((t) => (
                      <tr key={t.id}>
                        <th scope="row">{t.id}</th>
                        <td>{t.petName}</td>
                        <td>{t.weight}</td>
                        <td>{t.gender}</td>
                        <td className="text-capitalize">{t.petCategory.name}</td>
                        <td>{t.dob}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PetAdopt;
