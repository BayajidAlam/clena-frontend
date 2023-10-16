import BlogCard from '@/components/Home/BlogCard';
import React from 'react';

const ContentManagementPage = () => {

  
  return (
    <section
    style={{
      width: "100%",
      margin: "0 auto",
    }}
    className="pb-10 pt-20 lg:pb-20"
  >
    <div className="container mx-auto">
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
        <BlogCard
          date="Dec 22, 2023"
          CardTitle="Meet AutoManage, the best AI management tools"
          CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          image="https://i.ibb.co/7jdcnwn/image-03.jpg"
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

export default ContentManagementPage;