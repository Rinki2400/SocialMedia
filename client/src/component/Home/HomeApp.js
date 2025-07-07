import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import "./HomeApp.css";
import { fetchPosts } from "../../services/api";

function HomeApp() {
  const [refresh, setRefresh] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetchPosts(page, 6);
        setPosts(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    getPosts();
  }, [refresh, page]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (_, term) => {
    setSearchTerm(term);
  };

  return (
    <div className="main_container">
      <div className="grid-item">
        <Posts
          posts={filteredPosts}
          setCurrentPost={setCurrentPost}
          setRefresh={setRefresh}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
      <div className="grid-item">
        <Form
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          setRefresh={setRefresh}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}

export default HomeApp;
