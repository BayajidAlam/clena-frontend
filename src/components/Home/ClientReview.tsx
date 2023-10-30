"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ClientReview = () => {
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    // const url = `https://clena-ts-prisma-postgress.vercel.app/api/v1/feedbacks`;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/feedbacks`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFeedback(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  
  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "60px 0",
      }}
    >
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* @ts-ignore  */}
            {feedback?.data?.slice(0,6).map((feedback: any) => {
              return (
                <>
                  {" "}
                  <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                    <div className="h-full text-center">
                      <Image
                        src={feedback?.user?.profileImg}
                        alt="testimonial"
                        className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                        height={80}
                        width={80}
                      ></Image>
                      <p className="leading-relaxed">
                        {feedback?.feedback}
                      </p>
                      <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                      <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                        {feedback?.user?.name}
                      </h2>
                      <p className="text-gray-500"> {feedback?.user?.address}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientReview;
