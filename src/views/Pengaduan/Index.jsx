import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../../api";
import Cookies from "js-cookie";
import LayoutDefault from "../../layouts/Default";
import hasAnyPermission from "../../utils/Permissions.jsx";
import Pagination from "../../components/Pagination";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PengaduanIndex() {
  document.title = "Pengaduan - SIPEVO";

  const [pengaduan, setPengaduan] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });
  const [keywords, setKeywords] = useState("");
  const token = Cookies.get("token");

  const fetchData = async (pageNumber = 1, keywords = "") => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/pengaduan?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setPengaduan(response.data.data.data);
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = async (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  const deletePengaduan = (id) => {
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/pengaduan/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });
              fetchData();
            });
          },
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  const exportToPDF = async () => {
    const input = document.getElementById("pdfContent");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Set header image height
    const headerImgHeight = 200; // Adjust header image height as needed

    // Add header image (replace 'headerImgPath' with your header image path)
    const headerImgPath = "/assets/images/kop.png";
    const headerPadding = 20; // Padding for header image
    pdf.addImage(
      headerImgPath,
      "PNG",
      headerPadding,
      headerPadding,
      pdfWidth - 2 * headerPadding,
      headerImgHeight
    ); // Adjust padding and height based on header height

    // Add table content
    const contentPadding = 20; // Padding for table content
    pdf.addImage(
      imgData,
      "PNG",
      contentPadding,
      headerImgHeight + headerPadding,
      pdfWidth - 2 * contentPadding,
      pdfHeight - headerImgHeight - headerPadding
    ); // Adjust padding and height based on header height

    // Get table rows
    const tableRows = input.querySelectorAll("tbody tr");

    // Set y position to below the table
    let y = tableRows[tableRows.length - 1].getBoundingClientRect().bottom + 10;

    // Filter and add selected data to PDF
    tableRows.forEach((row) => {
      const rowData = Array.from(row.children)
        .filter((cell, index) => [1, 2, 3, 5].includes(index)) // Selecting image, title, description, and status columns
        .map((cell) => cell.innerText);

      pdf.text(10 + contentPadding, y + contentPadding, rowData.join(" | "));
      y += 20 + contentPadding; // Move to the next line with padding
    });

    pdf.save("pengaduan.pdf");
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
              {hasAnyPermission(["pengaduan.export"]) && (
                <div className="col-md-3 col-12 mb-2">
                  <button
                    onClick={exportToPDF}
                    className="btn btn-md btn-tertiary border-0 shadow w-100"
                    type="button"
                  >
                    <i className="fa fa-plus-circle"></i> Export PDF
                  </button>
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
                <div className="table-responsive" id="pdfContent">
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
                        <th className="border-0" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pengaduan.length > 0 ? (
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
                              {pengaduan.image && pengaduan.tanggapan_image && (
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
                                pengaduan.tanggapan_description && <div>-</div>}
                              {pengaduan.tanggapan_description && (
                                <div>{pengaduan.tanggapan_description}</div>
                              )}
                            </td>
                            <td>{pengaduan.location}</td>
                            <td>{pengaduan.pengaduan_status.name}</td>
                            <td className="text-center">
                              {hasAnyPermission(["pengaduan.edit"]) && (
                                <Link
                                  to={`/pengaduan/edit/${pengaduan.id}`}
                                  className="btn btn-primary btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt"></i>
                                </Link>
                              )}
                              {hasAnyPermission(["pengaduan.delete"]) && (
                                <button
                                  onClick={() => deletePengaduan(pengaduan.id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
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
                      )}
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
