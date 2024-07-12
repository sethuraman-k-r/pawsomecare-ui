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

export function getMenuItems(
  menuId: number,
  vendorBranchId: number,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/vendor/menu/${menuId}/${vendorBranchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((value: Array<ItemProps>) => resolve(generateMenus(value)))
      .catch((err) => reject(err));
  });
}

export function updateHeading(
  headingId: number,
  headingTitle: string,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `api/vendor/header/${headingId}`,
        {
          heading_level: headingTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.status)
      .then((value) => resolve(value))
      .catch((err) => reject(err));
  });
}

export function createHeading(
  menuId: number,
  headingTitle: string,
  vendorBranchId: number,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `api/vendor/header`,
        {
          heading_level: headingTitle,
          menu_id: menuId,
          vendor_branch_id: vendorBranchId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .then((value) => resolve(value))
      .catch((err) => reject(err));
  });
}

export function updateMenu(
  method: "POST" | "PUT",
  itemId: number,
  data: ItemProps,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const id = data.id;
    const updatedData: any = {
      ...data,
    };
    if (id === -1) {
      delete updatedData.id;
      delete updatedData.menu_item_id;
    }
    delete updatedData.heading_level;
    let axiosInstance;
    if (method === "POST") {
      axiosInstance = axios.post(`api/vendor/menu`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      axiosInstance = axios.put(`api/vendor/menu/${itemId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    axiosInstance
      .then((response) => response.data)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => reject(err));
  });
}

export function deleteMenu(itemId: number, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .delete(`api/vendor/menu/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((value) => resolve(value))
      .catch((err) => reject(err));
  });
}
