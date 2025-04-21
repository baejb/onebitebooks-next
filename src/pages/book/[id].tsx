import style from "./[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // false : 404 Not found,
    // blocking : SSR 방식,
    // ture: SSR 방식 + 데이터가 없는 폴백 상태의 페에지부터 반환 (그 뒤에 데이터는 후속으로)
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>로딩중입니다.</div>;
  }
  if (!book) return <div>문제 발생했습니다. 다시 시도해주세요</div>;

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author}| {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
