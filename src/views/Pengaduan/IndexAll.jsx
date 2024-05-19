//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutDefault from "../../layouts/Default";

//import permissions
import hasAnyPermission from "../../utils/Permissions.jsx";

//import pagination component
import Pagination from "../../components/Pagination";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//import toast
import toast from "react-hot-toast";

export default function PengaduanIndexAll() {
  //title page
  document.title = "Pengaduan - SIPEVO";

  //define state "categories"
  const [pengaduan, setPengaduan] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //function fetchData
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/pengaduan?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setCategories"
      setPengaduan(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {hasAnyPermission([
                "pengaduan.create",
                "pengaduan.create.all",
              ]) && (
                <div className="col-md-3 col-12 mb-2">
                  <Link
                    to={
                      hasAnyPermission(["pengaduan.create.all"])
                        ? "/pengaduan/create/all"
                        : "/pengaduan/create"
                    }
                    className="btn btn-md btn-tertiary border-0 shadow w-100"
                    type="button"
                  >
                    <i className="fa fa-plus-circle"></i> Add New
                  </Link>
                </div>
              )}
              <div className="col-md-9 col-12 mb-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 shadow"
                    onChange={(e) => searchData(e)}
                    placeholder="search here..."
                  />
                  <span className="input-group-text border-0 shadow">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-centered mb-0 rounded">
                    <thead className="thead-dark">
                      <tr className="border-0">
                        <th className="border-0" style={{ width: "5%" }}>
                          No.
                        </th>
                        <th className="border-0">Image</th>
                        <th className="border-0">Title</th>
                        <th className="border-0">Description</th>
                        <th className="border-0">Location</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        //cek apakah data ada
                        pengaduan.length > 0 ? (
                          //looping data "categories" dengan "map"
                          pengaduan.map((pengaduan, index) => (
                            <tr key={index}>
                              <td className="fw-bold text-center">
                                {++index +
                                  (pagination.currentPage - 1) *
                                    pagination.perPage}
                              </td>
                              <td className="text-center">
                                {pengaduan.image && (
                                  <div>
                                    <img
                                      src={pengaduan.image}
                                      width="70"
                                      alt="Pengaduan"
                                    />
                                  </div>
                                )}
                                {pengaduan.image &&
                                  pengaduan.tanggapan_image && (
                                    <div style={{ margin: "5px 0" }}>-</div>
                                  )}
                                {pengaduan.tanggapan_image && (
                                  <div>
                                    <img
                                      src={pengaduan.tanggapan_image}
                                      width="100"
                                      alt="Tanggapan"
                                    />
                                  </div>
                                )}
                              </td>

                              <td>{pengaduan.title}</td>
                              <td>
                                {pengaduan.description && (
                                  <div>{pengaduan.description}</div>
                                )}
                                {pengaduan.description &&
                                  pengaduan.tanggapan_description && (
                                    <div>-</div>
                                  )}
                                {pengaduan.tanggapan_description && (
                                  <div>{pengaduan.tanggapan_description}</div>
                                )}
                              </td>

                              <td>{pengaduan.location}</td>
                              <td>{pengaduan.pengaduan_status.name}</td>
                            </tr>
                          ))
                        ) : (
                          //tampilkan pesan data belum tersedia
                          <tr>
                            <td colSpan={7}>
                              <div
                                className="alert alert-danger border-0 rounded shadow-sm w-100"
                                role="alert"
                              >
                                Data Belum Tersedia!.
                              </div>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={pagination.currentPage}
                  perPage={pagination.perPage}
                  total={pagination.total}
                  onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                  position="end"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
