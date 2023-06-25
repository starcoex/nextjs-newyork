import Loading from "@/ components/Loading";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense } from "react";

type BookList = {
  last_modified: string;
  num_results: number;
  results: {
    bestsellers_date: string;
    books: [
      {
        amazon_product_url: string;
        author: string;
        book_image: string;
        book_image_height: number;
        book_image_width: number;
        buy_links: [
          {
            name: string;
            url: string;
          }
        ];
        contributor: string;
        description: string;
        title: string;
      }
    ];
    corrections: [];
    display_name: string;
    list_name: string;
    list_name_encoded: string;
    next_published_date: string;
    normal_list_ends_at: number;
    previous_published_date: string;
    published_date: string;
    published_date_description: string;
    updated: string;
  };
};

export const getServerSideProps: GetServerSideProps<{
  data: BookList;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${id}`
  );
  const data = await res.json();
  return { props: { data } };
};

export default function Detail({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1 className="book_title">{data.results.list_name}</h1>
        <div className="container">
          {data.results.books.map((book) => (
            <div key={book.title}>
              <img src={book.book_image} alt={book.title} />
              {/* <Image
            src={book.book_image}
            alt={book.title}
            width={book.book_image_width}
            height={book.book_image_height}
          /> */}
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <div>
                <Link href={book.amazon_product_url}>
                  <span>Buy now &rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Suspense>

      <style jsx>{`
        .book_title {
          text-align: center;
          padding: 30px;
        }
        .container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        img {
          width: 70%;
          height: 70%;
          background-size: cover;
        }
        h2 {
          font-size: 18px;
        }
        h3 {
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
