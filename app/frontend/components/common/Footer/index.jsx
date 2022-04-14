import Link from "next/link";
import style from "~/components/common/Footer/index.module.scss"

const Footer = () => {

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.inner}>
          <Link href={"/"}>
            <a className={style.image}>
              <img 
                src="/images/footer-logo.svg"
                width={229}
                height={216}
                alt={"JAPAN PORTAL for UFC"}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={style.bottom}>
        <p className={style.copyright}>©︎ 2022 JAPAN PORTAL  All Rights Reserved.</p>
      </div>
    </div>
  );
};
  
  export default Footer;