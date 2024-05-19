import React, { useState, useEffect } from "react";
import Api from "../../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LayoutAuth from "../Layouts/Auth.jsx";

export default function Register() {
  document.title = "Register - SIPEVO";

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nohp, setNohp] = useState("");
  const [noinduk, setNoinduk] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [rolesData, setRolesData] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    let selectedRole = e.target.value;
    // Check if the role is already selected
    if (rolesData.includes(selectedRole)) {
      // If selected, remove from the rolesData array
      setRolesData(rolesData.filter((role) => role !== selectedRole));
    } else {
      // If not selected, add to the rolesData array
      setRolesData([...rolesData, selectedRole]);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (name) formData.append("name", name);
    if (nohp) formData.append("no_hp", nohp);
    if (noinduk) formData.append("no_induk", noinduk);
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (passwordConfirmation)
      formData.append("password_confirmation", passwordConfirmation);
    if (rolesData.length > 0) formData.append("roles", rolesData);

    try {
      const response = await Api.post("/api/register", formData);

      toast.success("Register Successfully!", {
        position: "top-right",
        duration: 4000,
      });

      navigate("/");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <LayoutAuth>
      <div
        className="row d-flex align-items-center justify-content-center"
        style={{
          marginTop: "50px",
        }}
      >
        <div className="col-md-7">
          <div className="text-center" style={{ margin: "20px 0" }}>
            <img
              src={"/assets/images/logo.png"}
              width={"100"}
              style={{ marginBottom: "10px" }}
            />
            <br />
            <img
              src={"/assets/images/u.png"}
              width={"200"}
              style={{ marginBottom: "5px" }}
            />
          </div>

          <div className="card rounded-4 shadow-sm border-top-success">
            <div className="card-body">
              <div className="form-left h-100 py-3 px-3">
                {errors.message && (
                  <div className="alert alert-danger">{errors.message}</div>
                )}
                <form onSubmit={register} className="row g-4">
                  {/* NAME */}
                  <div className="col-12">
                    <label>Name</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger mt-2">
                        {errors.name[0]}
                      </div>
                    )}
                  </div>
                  {/* NO HP / WA */}
                  <div className="col-12">
                    <label>No HP / WA</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={nohp}
                        onChange={(e) => setNohp(e.target.value)}
                        placeholder="Enter Email Address"
                      />
                    </div>
                    {errors.nohp && (
                      <div className="alert alert-danger mt-2">
                        {errors.nohp[0]}
                      </div>
                    )}
                  </div>
                  {/* NO INDUK */}
                  <div className="col-12">
                    <label>No Induk</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={noinduk}
                        onChange={(e) => setNoinduk(e.target.value)}
                        placeholder="Enter No Induk"
                      />
                    </div>
                    {errors.noinduk && (
                      <div className="alert alert-danger mt-2">
                        {errors.noinduk[0]}
                      </div>
                    )}
                  </div>
                  {/*  EMAIL */}
                  <div className="col-12">
                    <label>Email Address</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                      />
                    </div>
                    {errors.email && (
                      <div className="alert alert-danger mt-2">
                        {errors.email[0]}
                      </div>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div className="col-12">
                    <label>Password</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                      />
                    </div>
                    {errors.password && (
                      <div className="alert alert-danger mt-2">
                        {errors.password[0]}
                      </div>
                    )}
                  </div>

                  {/* PASSWORD CONFIRMATION */}
                  <div className="col-12">
                    <label>Password Confirmation</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        placeholder="Enter Password"
                      />
                    </div>
                    {errors.passwordConfirmation && (
                      <div className="alert alert-danger mt-2">
                        {errors.passwordConfirmation[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="fw-bold">Roles</label>
                    <br />
                    {/* Checkbox for Mahasiswa */}
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="mahasiswa"
                        onChange={handleCheckboxChange}
                        id="check-mahasiswa"
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="check-mahasiswa"
                      >
                        mahasiswa
                      </label>
                    </div>
                    {/* Checkbox for Dosen */}
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="dosen"
                        onChange={handleCheckboxChange}
                        id="check-dosen"
                      />
                      <label
                        className="form-check-label fw-normal"
                        htmlFor="check-dosen"
                      >
                        dosen
                      </label>
                    </div>

                    {errors.roles && (
                      <div className="alert alert-danger mt-2">
                        {errors.roles[0]}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary px-4 float-end rounded-4"
                  >
                    REGISTER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
