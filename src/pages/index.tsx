import Loading from "@/ components/Loading";
import RootLayout from "@/ components/RootLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { ReactElement, Suspense, useEffect, useState } from "react";

import React from "react";

type NewYorkBestSeller = {
  results: [
    {
      display_name: string;
      list_name: string;
      list_name_encoded: string;
      newest_published_date: string;
      oldest_published_date: string;
      updated: string;
    }
  ];
};
export const getServerSideProps: GetServerSideProps<{
  data: NewYorkBestSeller;
}> = async () => {
  // const { id } = context.query;
  const res = await fetch(" https://books-api.nomadcoders.workers.dev/lists");
  const data = await res.json();
  return { props: { data } };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <h1>The New York Times Best Seller Explorer</h1>
      <div className="box-container">
        <Suspense fallback={<Loading />}>
          {data.results.map((book) => (
            <div key={Date.now()}>
              <Link href={`list/${book.list_name_encoded}`}>
                {book.list_name}
              </Link>
              &rarr;
            </div>
          ))}
        </Suspense>
      </div>
      <style jsx>{`
        h1 {
          margin-bottom: 50px;
          text-align: center;
        }
        .container {
          width: 80%;
          height: 100vh;
           {
            /* border: 1px solid red; */
          }
          margin: 0 auto;
        }
        .box-container {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(auto-fill, minmax(25%, auto));
          grid-gap: 30px;
          border: 1px solid white;
        }
      `}</style>
    </div>
  );
}
