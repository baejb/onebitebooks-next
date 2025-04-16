//CSS Modules page 별로 className 겹치는거 방지하기 위해 app 컴포넌트 외에는 글로벌 css 파일 임포트 불가 대신 module 사용
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어 , 컴포넌트에 필요한 데이터 불러오는 함수
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(allBooks);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
