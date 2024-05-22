import React from "react";
import logo from "./../../assets/web-posting-high-resolution-logo-transparent.png";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import classNames from "classnames";
import css from "./Footer.module.css";

const Footer = (props) => {
  const { footerClassName } = props;
  const rootClassName = classNames(css.root, footerClassName);
  return (
    <div className={rootClassName}>
      <p className={css.implinksp}>IMPORTANT LINKS</p>
      <div className={css.implinks}>
        <a href="/">Feed</a>
        <a href="/">Posts</a>
        <a href="/">Favourites</a>
        <a href="/">Comments</a>
        <a href="/">FAQs</a>
        <a href="/">Join</a>
        <a href="/">Contact Us</a>
        <a href="/">About Us</a>
        <a href="/">Join</a>
      </div>
      <div className={css.footerMain}>
        <div className={css.logoDv}>
          <div className={css.decoyDiv}>
            <img src={logo} alt="Logo" className={css.logo} />
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className={css.secondDiv}>
          <div className={css.socials}>
            <p>
              By following us on social media you will be able to keep up to
              date with with our latest news and announcements
            </p>
            <p className={css.wesoso}>We're social too. Follow us on: </p>
            <div className={css.sociallogoDiv}>
              <FaGithub />
              <FaFacebook />
              <FaInstagram />
              <SiGmail />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
