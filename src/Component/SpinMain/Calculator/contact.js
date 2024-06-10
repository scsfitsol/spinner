"use client";
import React, { useEffect } from "react";
import Section from "./Section";
import "./style1.css";

const Contact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    const config = {
      region: "na1",
      portalId: "39660215",
      formId: "a30f8cb2-7ec5-4e39-ae61-4d58374067de",
    };
    // console.dir(document.querySelector(
    //   "#hubspot-form"
    // ));
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          ...config,
          target: "#hubspot-form",
        });
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container max-w-full bg-col6" id="contactUs">
      <div className="">
        <Section
          title={null}
          head="Got questions"
          desc={null}
          button={null}
          padding={"px-8"}
        />
        <div id="hubspot-form" className="px-8"></div>
      </div>
    </div>
  );
};

export default Contact;
