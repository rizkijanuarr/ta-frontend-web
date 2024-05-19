//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutDefault from "../../layouts/Default";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function PengaduanEdit() {
  //title page
  document.title = "Edit Pengaduan - SIPEVO";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [identifyID, setIdentifyID] = useState("");
  const [identify, setIdentify] = useState([]);
  const [tanggapanImage, setTanggapanImage] = useState([]);
  const [tanggapanDescription, setTanggapanDescription] = useState([]);
  const [tanggapanStatusID, setTanggapanStatusID] = useState([]);
  const [tanggapanStatus, setTanggapanStatus] = useState([]);

  const [errors, setErrors] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  const fetchDataPengaduanStatus = async () => {
    await Api.get("/api/admin/pengaduan/status/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setTanggapanStatus(response.data.data);
    });
  };

  const fetchDataPengaduanUsers = async () => {
    await Api.get("/api/admin/users/identifies/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setIdentify(response.data.data);
    });
  };

  //function "fetchDataUser"
  const fetchDataPengaduan = async () => {
    await Api.get(`/api/admin/pengaduan/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setTanggapanImage(response.data.data.tanggapan_image);
      setTanggapanStatusID(response.data.data.pengaduan_status_id || "");
      setTanggapanDescription(response.data.data.tanggapan_description);
      setIdentifyID(response.data.data.users_identifies_id || "");
    });
  };

  //useEffect
  useEffect(() => {
    fetchDataPengaduan();
    fetchDataPengaduanUsers();
    fetchDataPengaduanStatus();
  }, []);

  //function "updateUser"
  const updatePengaduan = async (e) => {
    e.preventDefault();

    const dataToSend = {};

    if (tanggapanImage) dataToSend.tanggapan_image = tanggapanImage;
    if (tanggapanDescription)
      dataToSend.tanggapan_description = tanggapanDescription;
    if (tanggapanStatusID) dataToSend.pengaduan_status_id = tanggapanStatusID;
    if (identifyID) dataToSend.users_identifies_id = identifyID;

    const formData = new FormData();
    for (const key in dataToSend) {
      formData.append(key, dataToSend[key]);
    }
    formData.append("_method", "PUT");

    console.log("Data to send:", dataToSend);

    await Api.post(`/api/admin/pengaduan/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Response data:", response.data); // Log data untuk debug
        setTanggapanStatus(response.data.data);

        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/pengaduan");
      })
      .catch((error) => {
        console.error("Error response:", error.response); // Log error response untuk debug
        setErrors(error.response.data);
      });
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/pengaduan"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-user"></i> Edit Pengaduan
                </h6>
                <hr />
                <form onSubmit={updatePengaduan}>
                  <div className="row">
                    {/* TANGGAPAN IMAGE */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tanggapan Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setTanggapanImage(e.target.files[0])}
                      />
                      {errors.tanggapanImage && (
                        <div className="alert alert-danger">
                          {errors.tanggapanImage[0]}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      {/* STATUS */}
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Status</label>
                          <select
                            className="form-select"
                            value={tanggapanStatusID}
                            onChange={(e) =>
                              setTanggapanStatusID(e.target.value)
                            }
                          >
                            <option value="">-- Select Status --</option>
                            {tanggapanStatus.map((status) => (
                              <option value={status.id} key={status.id}>
                                {status.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* IDENTIFY */}
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
                            {identify.map((identify) => (
                              <option value={identify.id} key={identify.id}>
                                {identify.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/*  DESCRIPTION  */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tanggapan Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={tanggapanDescription}
                        onChange={(e) =>
                          setTanggapanDescription(e.target.value)
                        }
                        placeholder="Enter Tanggapan Description"
                      />
                    </div>
                    {errors.tanggapanDescription && (
                      <div className="alert alert-danger">
                        {errors.tanggapanDescription[0]}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-tertiary me-2"
                    >
                      <i className="fa fa-save"></i> Update
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
