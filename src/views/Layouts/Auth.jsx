import "../../assets/admin/css/custom.css";

//import font awesome
import "@fortawesome/fontawesome-free/js/all.js";

export default function auth({ children }) {
  return (
    <div
      style={{
        backgroundImage: "url(/assets/images/u.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-center h-100">{children}</div>
      </div>
    </div>
  );
}
