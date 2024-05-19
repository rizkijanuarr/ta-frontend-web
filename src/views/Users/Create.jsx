//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutDefault from "../../layouts/Default";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function UserCreate() {
  //title page
  document.title = "Create User - SIPEVO";

  //navigate
  const navigate = useNavigate();

  //define state for form
  const [identifyID, setIdentifyID] = useState("");
  const [name, setName] = useState("");
  const [nohp, setNohp] = useState("");
  const [noinduk, setNoinduk] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [errors, setErrors] = useState([]);

  const [identify, setIdentify] = useState([]);

  //define state "roles"
  const [roles, setRoles] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  // DROPDOWN
  const fetchDataUsersIdentity = async () => {
    await Api.get("/api/admin/users/identifies/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setIdentify(response.data.data);
    });
  };

  //function "fetchDataRoles"
  const fetchDataRoles = async () => {
    await Api.get("/api/admin/roles/all", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state "roles"
      setRoles(response.data.data);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataRoles"
    fetchDataUsersIdentity();
    fetchDataRoles();
  }, []);

  //function "handleCheckboxChange"
  const handleCheckboxChange = (e) => {
    //define data
    let data = rolesData;

    if (e.target.checked) {
      //push data on state if checked
      data.push(e.target.value);
    } else {
      //remove data from state if unchecked
      data = data.filter((role) => role !== e.target.value);
    }

    //set data to state
    setRolesData(data);
  };

  //function "storeUser"
  const storeUser = async (e) => {
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
    if (identifyID) formData.append("users_identifies_id", identifyID); // dropdown

    //sending data
    await Api.post("/api/admin/users", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/users");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErrors(error.response.data.errors);
      });
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/users"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-user"></i> Create User
                </h6>
                <hr />
                <form onSubmit={storeUser}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Full Name"
                        />
                      </div>
                      {errors.name && (
                        <div className="alert alert-danger">
                          {errors.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Email Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email Address"
                        />
                      </div>
                      {errors.email && (
                        <div className="alert alert-danger">
                          {errors.email[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">No HP/WA</label>
                        <input
                          type="text"
                          className="form-control"
                          value={nohp}
                          onChange={(e) => setNohp(e.target.value)}
                          placeholder="Enter No HP/WA"
                        />
                      </div>
                      {errors.nohp && (
                        <div className="alert alert-danger">
                          {errors.nohp[0]}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">No Induk</label>
                        <input
                          type="text"
                          className="form-control"
                          value={noinduk}
                          onChange={(e) => setNoinduk(e.target.value)}
                          placeholder="Enter No Induk"
                        />
                      </div>
                      {errors.noinduk && (
                        <div className="alert alert-danger">
                          {errors.noinduk[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter Password"
                        />
                      </div>
                      {errors.password && (
                        <div className="alert alert-danger">
                          {errors.password[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Password Confirmation
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={passwordConfirmation}
                          onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                          }
                          placeholder="Enter Password Confirmation"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Users Identify
                        </label>
                        <select
                          className="form-select"
                          value={identifyID}
                          onChange={(e) => setIdentifyID(e.target.value)}
                        >
                          <option value="">-- Select Identify --</option>
                          {identify.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.users_identifies_id && (
                        <div className="alert alert-danger">
                          {errors.users_identifies_id[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <label className="fw-bold">Roles</label>
                    <br />
                    {roles.map((role) => (
                      <div
                        className="form-check form-check-inline"
                        key={role.id}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={role.name}
                          onChange={handleCheckboxChange}
                          id={`check-${role.id}`}
                        />
                        <label
                          className="form-check-label fw-normal"
                          htmlFor={`check-${role.id}`}
                        >
                          {role.name}
                        </label>
                      </div>
                    ))}

                    {errors.roles && (
                      <div className="alert alert-danger mt-2">
                        {errors.roles[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-tertiary me-2"
                    >
                      <i className="fa fa-save"></i> Save
                    </button>
                    <button type="reset" className="btn btn-md btn-warning">
                      <i className="fa fa-redo"></i> Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
