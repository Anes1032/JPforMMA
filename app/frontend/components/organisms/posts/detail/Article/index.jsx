import Infos from "~/components/atoms/Infos";
import Source from "~/components/atoms/Source";
import style from "~/components/organisms/posts/detail/Article/index.module.scss";

const Article = ({ data }) => {
  const icons = (n) => {
    const baseUrl = `http://twitter.com/share?url=https://mma.jp-portal.com/posts/${data.id}`;
    return [
      {
        name: "twitter",
        url: `http://twitter.com/share?url=${baseUrl}&text=${data.ja_title}`,
      },
      {
        name: "facebook",
        url: `https://www.facebook.com/share.php?u=${baseUrl}`,
      },
      {
        name: "line",
        url: `https://social-plugins.line.me/lineit/share?url=${baseUrl}`,
      },
    ].map((item, i) => (
      <a className={style.icon} href={item.url} target="_blank" key={i}>
        <img src={`/images/${item.name}${n}.svg`} alt={"twitter"} />
      </a>
    ));
  };
  console.log(data);
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.sns}>{icons(1)}</div>
      </div>
      <div className={style.body}>
        <h1 className={style.title}>{data.en_title}</h1>
        <h2 className={style.description}>{data.en_sub_title}</h2>
        <img
          className={style.image}
          src={data.image_url}
          alt={data.en_title}
          width={540}
          height={405}
        />
        <Infos date={data.post_time} />
        <Source url={data.reference_url} />
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: data.en_content }}
        ></div>
        {data.video_url && (
          <iframe
            className={style.video}
            src={data.video_url}
            width={540}
            height={304}
          />
        )}
      </div>
      <div className={style.bottom}>
        <div className={style.sns}>{icons(2)}</div>
      </div>
    </div>
  );
};

export default Article;