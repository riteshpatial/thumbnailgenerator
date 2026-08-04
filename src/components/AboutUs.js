import React from "react";

export default function AboutUs() {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p>
        With a vision to transform video editing, I crafted this website as a dedicated BCA student. My mission is
        to provide streamlined, professional-grade tools that empower users to create compelling content with ease
        and efficiency.
      </p>
      <h4>Contact with me:</h4>
      <div className="icons">
        <a href="https://www.instagram.com/_.ritesh._0_0?igsh=bjNlMTlxcDE2YTdp">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/492/009/non_2x/instagram-logo-transparent-free-png.png"
            className="move"
            alt="Instagram"
            width="55"
            height="55"
          />
        </a>
        <a href="mailto:riteshpatial430@gmail.com">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/636/796/non_2x/email-3d-illustration-icon-png.png"
            className="move"
            alt="Email"
            width="45"
            height="45"
          />
        </a>
        <a href="https://wa.me/916230075812">
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/748/non_2x/whatsapp-logo-whatsapp-icon-whatsapp-transparent-free-png.png"
            className="move"
            alt="WhatsApp"
            width="55"
            height="55"
          />
        </a>
      </div>
    </div>
  );
}
