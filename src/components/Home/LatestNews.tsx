"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useGetAllBlogsQuery } from "@/redux/api/services/blogAndFAQApi";

const LatestNews = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/api/v1/blogs`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);



  return (
    <section
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "60px 0",
      }}
      className="pt-20 pb-10 lg:pt-[120px] lg:pb-20"
    >
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <span className="block mb-2 text-lg font-semibold text-primary">
                Our Blogs
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Our Recent News
              </h2>
              <p className="text-base text-body-color">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {/* @ts-ignore  */}
          {blogs?.data?.data?.slice(0,6).map((blog:any) => {
            return (
              <>
                <BlogCard
                  date={blog?.createdAt}
                  CardTitle={blog?.title}
                  CardDescription={blog?.text}
                  image={blog?.image}
                />
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
