import axios from "axios";
import { VendorProfileProps } from "../props/VendorProps";
import { Auth } from "./auth.services";

export function getPetCategory(role: string = "admin"): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(role + "/pet/category", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addPetCategory(petType: string, cost: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/category?name=" + petType + "&cost=" + cost,
        {},
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updatePetCategory(
  petType: string,
  status: string,
  cost: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `admin/pet/category?name=${petType}&active=${status}&cost=${cost}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetGrooming(role: string = "admin"): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(role + "/pet/groom", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetGroomings(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("user/pet/grooming", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addPetGrooming(
  name: string,
  description: string,
  cost: number,
  isInsAllowed: boolean,
  timeRequire: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/groom",
        {
          name,
          description,
          cost,
          isInsAllowed,
          timeRequire,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updatePetGrooming(
  id: number,
  name: string,
  description: string,
  cost: number,
  isInsAllowed: boolean,
  timeRequire: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "admin/pet/groom",
        {
          id,
          name,
          description,
          cost,
          isInsAllowed,
          timeRequire,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetVaccines(role: string = "admin"): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(role + "/pet/vaccine", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addPetVaccine(
  name: string,
  description: string,
  amount: number,
  isInsAllowed: boolean
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/vaccine",
        {
          name,
          description,
          amount,
          isInsAllowed,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updatePetVaccine(
  id: number,
  name: string,
  description: string,
  amount: number,
  isInsAllowed: boolean
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "admin/pet/vaccine",
        {
          id,
          name,
          description,
          amount,
          isInsAllowed,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetMedicines(role: string = "admin"): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(role + "/pet/medicine", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addPetMedicine(
  name: string,
  description: string,
  cost: number,
  count: number,
  isInsAllowed: boolean,
  expiresAt: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/medicine",
        {
          name,
          description,
          count,
          cost,
          isInsAllowed,
          expiresAt,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updatePetMedicine(
  id: number,
  name: string,
  description: string,
  cost: number,
  count: number,
  isInsAllowed: boolean,
  expiresAt: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "admin/pet/medicine",
        {
          id,
          name,
          description,
          count,
          cost,
          isInsAllowed,
          expiresAt,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addNewUnadoptPet(
  name: string,
  dob: string,
  gender: string,
  weight: number,
  category: number,
  role: string = "admin"
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${role}/pet/new/unadopt`,
        {
          name,
          dob,
          gender,
          weight,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updateProfile(
  endpoint: string,
  email: string,
  data: Partial<VendorProfileProps>,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const requestData: any = {
      ...data,
      rest_food_type:
        data.rest_food_type === 0
          ? "Veg"
          : data.rest_food_type === 1
          ? "Non-Veg"
          : "both",
    };
    axios
      .put(`${endpoint}/${email}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetClinics(role: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${role}/pet/clinic`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addPetClinic(
  name: string,
  description: string,
  specialities: string,
  address: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/clinic",
        {
          name,
          description,
          specialities,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updatePetClinic(
  id: number,
  name: string,
  description: string,
  specialities: string,
  address: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "admin/pet/clinic",
        {
          id,
          name,
          description,
          specialities,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getUnadoptedPets(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("common/pet/unadopted", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function addPetStaff(
  name: string,
  email: string,
  gender: string,
  staffId: number,
  fee: number,
  role: string,
  clinics: Array<any>
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/staff",
        {
          staffName: name,
          email,
          staffId,
          gender,
          clinicIds: clinics,
          consultFee: fee,
          userRole: role,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetStaffs(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("admin/pet/staff", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetServices(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("user/pet/service", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function bookPetAppt(
  petId: number,
  clinicId: number,
  vetStaffId: number,
  grmStaffId: number,
  services: Array<string>,
  apptTime: string,
  reason: string,
  grooms: Array<number>
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "user/pet/book/appointment",
        {
          petId,
          clinicId,
          vetStaffId,
          grmStaffId,
          services,
          apptTime,
          reason,
          grooms,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function doRateAppt(
  apptId: number,
  title: string,
  description: string,
  rating: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "user/pet/book/appointment/feedback",
        {
          apptId,
          title,
          description,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getPetAppointments(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("user/pet/appointments", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getStaffPetAppointments(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("staff/pet/appointments", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getStaffPetAppointmentsHistory(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("staff/pet/appointments/history", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function adoptNewPet(petId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `user/adopt/new`,
        {
          petId,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getMyPets(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`user/pets`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function updatePet(
  petId: number,
  petName: string,
  petWeight: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `user/pet`,
        {
          petId,
          petName,
          petWeight,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function applyPetLicense(
  petId: number,
  cost: number,
  desc: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `user/pet/license`,
        {
          petId,
          cost,
          description: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getAppliedPetLicense(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`admin/pet/license`, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function approvePetLicense(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `admin/pet/license/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function getClinicStaffs(clinic: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("user/pet/staff?clinic=" + clinic, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function finalAppointment(
  appointmentId: number,
  vaccineId: number,
  analysis: string,
  nextTime: string,
  medicines: Array<any>
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "staff/pet/finish/appointment",
        {
          appointmentId,
          vaccineId,
          analysis,
          nextTime,
          medicines,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}
