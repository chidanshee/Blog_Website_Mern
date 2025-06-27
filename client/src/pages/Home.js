import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [pgno, setPgno] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get(
          "https://checkdeploye.onrender.com/api/v1/get/allblogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = blogs.slice(
    (pgno - 1) * blogsPerPage,
    pgno * blogsPerPage
  );

  return (
    <>
      <main className="my-5">
        <div className="container">
          <section className="text-center">
            <h2 className="mb-5">
              <strong>Latest Posts</strong>
            </h2>
            <div className="row justify-content-center">
              {currentBlogs && currentBlogs.length > 0
                ? currentBlogs.map((item) => (
                    <div key={item._id} className="col-md-3 mb-4 d-flex">
                      <div className="card blog-card flex-fill">
                        <img
                          src={item.thumbnail || "/fallback-image.jpg"}
                          className="card-img-top"
                          alt={item.title}
                          style={{ height: "160px", objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column">
                          <div className="badge-container mb-2">
                            <span
                              className={`category-badge ${item.category.title.toLowerCase()}`}
                            >
                              {item.category.title}
                            </span>
                            <span className="author-badge ms-2">
                              Author: {item.user.username}
                            </span>
                          </div>
                          <h5
                            className="card-title text-truncate"
                            title={item.title}
                          >
                            {item.title}
                          </h5>
                          <p className="card-text clamp-2">
                            {item.description || "No description available."}
                          </p>
                          <Link
                            to={`/blog/${item._id}`}
                            className="btn btn-primary mt-auto"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 8 }).map((_, i) => (
                    <div className="col-md-3 mb-4 d-flex" key={i}>
                      <div className="card flex-fill placeholder-glow">
                        <div
                          className="card-img-top placeholder"
                          style={{ height: "160px" }}
                        ></div>
                        <div className="card-body">
                          <h5 className="card-title placeholder col-8 mb-2"></h5>
                          <p className="placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-5"></span>
                          </p>
                          <a className="btn btn-primary disabled placeholder col-6"></a>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Pagination */}
            {blogs.length > blogsPerPage && (
              <div className="d-flex justify-content-center my-4">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${pgno === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setPgno(pgno - 1)}
                        disabled={pgno === 1}
                      >
                        Previous
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        pgno === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPgno(pgno + 1)}
                        disabled={pgno === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
