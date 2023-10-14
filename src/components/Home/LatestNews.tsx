import React from "react";
import BlogCard from "./BlogCard";

const LatestNews = () => {
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
          <BlogCard
            date="Dec 22, 2023"
            CardTitle="Meet AutoManage, the best AI management tools"
            CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            image="https://i.ibb.co/Cnwd4q6/image-01.jpg"
          />
          <BlogCard
            date="Dec 22, 2023"
            CardTitle="Meet AutoManage, the best AI management tools"
            CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            image="https://i.ibb.co/Y23YC07/image-02.jpg"
          />
          <BlogCard
            date="Dec 22, 2023"
            CardTitle="Meet AutoManage, the best AI management tools"
            CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            image="https://i.ibb.co/7jdcnwn/image-03.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
