import React from "react";
import styles from "./index.module.css";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="container">
      <div className={styles.containerItem}>
        <ContactForm />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d955.4209236014156!2d105.82106571216005!3d20.99978996937102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac8596674b05%3A0x7cf2cc2dac2feb1!2zMzMgUC4gVMO0IFbEqW5oIERp4buHbiwgS2jGsMahbmcgVHJ1bmcsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1716263032481!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0, width: "100%", height: "700px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
Contact.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
