import axios from "axios";
import { VendorProfileProps, CuisineType } from "../props/VendorProps";
import { ItemProps } from "../props/MenuProps";
import { generateMenus } from "./menu.services";
import { Auth } from "./auth.services";

export function getPetCategory(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("admin/pet/category", {
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

export function addPetCategory(petType: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "admin/pet/category?name=" + petType,
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
  status: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `admin/pet/category?name=${petType}&active=${status}`,
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

export function getPetGrooming(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("admin/pet/groom", {
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

export function getPetVaccines(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("admin/pet/vaccine", {
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

export function getPetMedicines(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("admin/pet/medicine", {
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
  category: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `admin/pet/new/unadopt`,
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

export function getPetClinics(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get("admin/pet/clinic", {
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
