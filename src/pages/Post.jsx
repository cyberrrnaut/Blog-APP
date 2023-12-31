import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components"; // Add a Loader component if you have one
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const fetchedPost = await appwriteService.getPost(slug);
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/"); // Navigate on error
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      if (post) {
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
          await appwriteService.deleteFile(post.featuredimage);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <Loader />; // Display a loader while data is being fetched
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
