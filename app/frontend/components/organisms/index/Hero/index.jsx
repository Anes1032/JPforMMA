import Link from "next/link";
import { getPostTime } from "~/lib/util";
import style from "~/components/organisms/index/Hero/index.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Hero = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const items = data.map((item) => {
    return (
      <Link href={`/posts/${item.id}`} key={item.id}>
        <a className={style.item}>
          <img
            className={style.image}
            src={item.image_url}
            alt={item.en_title}
          />
          <p className={style.title}>{item.en_title}</p>
          <span className={style.infos}>
            {item.post_time && (
              <span className={style.time}>
                <img src={"/images/clock.svg"} width={16} height={16} />
                {getPostTime(item.post_time)}
              </span>
            )}
          </span>
        </a>
      </Link>
    );
  });
  return (
    <div className={style.container}>
      <Slider {...settings}>{items}</Slider>
    </div>
  );
};

export default Hero;
