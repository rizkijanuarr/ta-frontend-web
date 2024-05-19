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

export default function PengaduanCreate() {
  //title page
  document.title = "Create Pengaduan - SIPEVO";

  //navigate
  const navigate = useNavigate();

  //define state for form
  const [pengaduanCategoriesID, setPengaduanCategoriesID] = useState("");
  // const [categories, setCategories] = useState([]);
  const [pengaduanTitle, setPengaduanTitle] = useState("");
  const [pengaduanDescription, setPengaduanDescription] = useState("");
  const [pengaduanLocation, setPengaduanLocation] = useState("");
  const [pengaduanImage, setPengaduanImage] = useState("");

  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState({}); // Tambahkan ini

  //token from cookies
  const token = Cookies.get("token");

  // DROPDOWN
  const fetchDataPengaduanCategories = async () => {
    await Api.get("/api/admin/pengaduan/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategories(response.data.data);
    });
  };

  //   const fetchDataPengaduanStatus = async () => {
  //     await Api.get("/api/admin/pengaduan/status/all", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((response) => {
  //       setStatus(response.data.data);
  //     });
  //   };

  //   const fetchDataPengaduanUsers = async () => {
  //     await Api.get("/api/admin/users/identifies/all", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((response) => {
  //       setUsers(response.data.data);
  //     });
  //   };

  useEffect(() => {
    fetchDataPengaduanCategories();
    // fetchDataPengaduanStatus();
    // fetchDataPengaduanUsers();
  }, []);

  const storePengaduan = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pengaduan_category_id", pengaduanCategoriesID); // dropdown
    formData.append("title", pengaduanTitle);
    formData.append("description", pengaduanDescription);
    formData.append("location", pengaduanLocation);
    formData.append("image", pengaduanImage);

    await Api.post("/api/admin/pengaduan", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
        navigate("/pengaduan");
      })
      .catch((error) => {
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
                  <i className="fa fa-pencil-alt"></i> Create Pengaduan
                </h6>
                <hr />
                <form onSubmit={storePengaduan}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setPengaduanImage(e.target.files[0])}
                    />
                  </div>
                  {errors.image && (
                    <div className="alert alert-danger">{errors.image[0]}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={pengaduanTitle} // Penanda: gunakan state yang benar
                      onChange={(e) => setPengaduanTitle(e.target.value)}
                      placeholder="Enter Title Pengaduan"
                    />
                  </div>
                  {errors.title && (
                    <div className="alert alert-danger">{errors.title[0]}</div>
                  )}
                  {/* PENGADUAN DESCRIPTION  */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={pengaduanDescription} // Penanda: gunakan state yang benar
                      onChange={(e) => setPengaduanDescription(e.target.value)}
                      placeholder="Enter Description Pengaduan"
                    />
                  </div>
                  {errors.description && (
                    <div className="alert alert-danger">
                      {errors.description[0]}
                    </div>
                  )}
                  {/*  PENGADUAN DESCRIPTION */}
                  {/* PENGADUAN LOCATION  */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={pengaduanLocation} // Penanda: gunakan state yang benar
                      onChange={(e) => setPengaduanLocation(e.target.value)}
                      placeholder="Enter Location Pengaduan"
                    />
                  </div>
                  {errors.location && (
                    <div className="alert alert-danger">
                      {errors.location[0]}
                    </div>
                  )}
                  {/*  PENGADUAN LOCATION */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Pengaduan Categories
                    </label>
                    <select
                      className="form-select"
                      value={pengaduanCategoriesID}
                      onChange={(e) => setPengaduanCategoriesID(e.target.value)}
                    >
                      <option value="">-- Select Categories --</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.pengaduan_categories_id && (
                    <div className="alert alert-danger">
                      {errors.pengaduan_categories_id[0]}
                    </div>
                  )}

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
