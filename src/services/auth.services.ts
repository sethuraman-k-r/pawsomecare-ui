import axios from "axios";
import { UserProfileProps } from "../props/VendorProps";

export const Auth = {
  signIn: function (email: string, password: string): Promise<any | null> {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/public/login`, {
          email,
          password,
        })
        .then((response) => ({
          data: response.data,
          token: response.headers.authorization,
        }))
        .then((value) => {
          const roles = value.data.authorities.map((a:any) => a['authority']).join(",");
          resolve({
            ...(value.data as UserProfileProps),
            token: value.token,
            role: roles
          });
        })
        .catch((err) => reject(err));
    });
  },
  signUp: function (
    email: string,
    username: string,
    password: string
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/public/signup`, {
          email,
          password,
          username,
        })
        .then((response) => response.status)
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  },
  updatePassword: function (
    oldP: string,
    newP: string,
    confP: string
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `auth/user/update/password`,
          {
            oldPassword: oldP,
            newPassword: newP,
            confirmPassword: confP,
          },
          {
            headers: {
              Authorization: `Bearer ${this.getToken()}`,
            },
          }
        )
        .then((response) => response.status)
        .then((value) => {
          resolve(value);
        })

        .catch((err) => reject(err));
    });
  },
  updateUser: function (
    firstname: string,
    lastname: string,
    dob: string,
    income: number,
    address: string,
    contact: string,
    gender: string
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `auth/user/update`,
          {
            firstname,
            lastname,
            dob,
            income,
            address,
            contact,
            gender
          },
          {
            headers: {
              Authorization: `Bearer ${this.getToken()}`,
            },
          }
        )
        .then((response) => response.status)
        .then((value) => {
          resolve(value);
        })

        .catch((err) => reject(err));
    });
  },
  getAuthUser: function (): Promise<any | null> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `auth/user`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.getToken()}`,
            },
          }
        )
        .then((response) => response.data)
        .then((value) => {
          resolve(value);
        })
        .catch((err) => reject(err));
    });
  },
  setLocalStorage: function (
    email: string,
    name: string,
    role: string,
    token: string
  ) {
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
  },
  currentUserInfo: function (): any {
    const email = localStorage.getItem("email") || "";
    const name = localStorage.getItem("name") || "";
    const role = localStorage.getItem("role") || "";
    const token = localStorage.getItem("token") || "";
    return {
      email,
      name,
      role,
      token,
    };
  },
  signOut: function (): any {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  },
  getToken: function () {
    return localStorage.getItem("token") || "";
  },
};
