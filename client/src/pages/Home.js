import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pgno, setPgno] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    (async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          axios.get("https://checkdeploye.onrender.com/api/v1/get/allblogs", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }),
          axios.get("https://checkdeploye.onrender.com/api/v1/get/catagories", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
        ]);
        setBlogs(blogsRes.data);
        setFilteredBlogs(blogsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    })();
  }, []);

  const handleSearchAndFilter = () => {
    let list = [...blogs];

    if (selectedCategory !== "All") {
      list = list.filter(b => b.category.title === selectedCategory);
    }
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        b =>
          (b.title + b.user.username + b.category.title)
            .toLowerCase()
            .includes(q)
      );
    }
    setFilteredBlogs(list);
    setPgno(1);
  };

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (pgno - 1) * blogsPerPage,
    pgno * blogsPerPage
  );

  return (
    <>
      <main className="my-4">
        <div className="container">
          <section className="text-center">
            <h2 className="mb-4 fw-bold">Latest Posts</h2>
            <div className="row justify-content-center mb-4">
              <div className="col-11 col-sm-10 col-md-9 col-lg-8 col-xl-7">
                <div className="row gy-2 gx-2 gx-sm-3">
               
                  <div className="col-12 col-sm-6 col-md-4">
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      onKeyDown={e =>
                        e.key === "Enter" && handleSearchAndFilter()
                      }
                    >
                      <option value="All">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat.title}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-sm-6 col-md-5">
                    <input
                      className="form-control"
                      placeholder="Search by Title & Author"
                      value={searchText}
                      onChange={e => setSearchText(e.target.value)}
                      onKeyDown={e =>
                        e.key === "Enter" && handleSearchAndFilter()
                      }
                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-3">
                    <button
                      className="btn w-100 text-dark"
                      style={{ backgroundColor: "#FFC107" }}
                      onClick={handleSearchAndFilter}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              {currentBlogs.length
                ? currentBlogs.map(item => (
                    <div
                      key={item._id}
                      className="col-11 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
                    >
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
                    <div
                      key={i}
                      className="col-11 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
                    >
                      <div className="card flex-fill placeholder-glow">
                        <div
                          className="card-img-top placeholder"
                          style={{ height: "200px" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title placeholder col-8 mb-2" />
                          <p className="placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-5"></span>
                          </p>
                          <a className="btn btn-primary disabled placeholder col-6" />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {filteredBlogs.length > blogsPerPage && (
              <div className="d-flex justify-content-center my-4">
                <nav>
                  <ul className="pagination mb-0">
                    <li className={`page-item ${pgno === 1 && "disabled"}`}>
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
                        pgno === totalPages && "disabled"
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
