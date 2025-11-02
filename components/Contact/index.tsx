import { HomeIcon } from "../icons/HomeIcon";
import { PhoneIcon } from "../icons/PhoneIcon";


export const Contact = () => {
  return (
    <section>
      <p>Contact</p>
      <h3>Need help from real people?</h3>
      <div>
        <h4>Any Questions?</h4>
        <div>
          Any We are here to help and answer any questions you may have. We look
          forward to hearing from you. Fill out this form or send us an email at
          <p>ketoan@upgo.io</p>
        </div>
        <div>Want to collaborate?</div>
        <p>
          Send an email to contact our business team <span>ketoan@upgo.io</span>
        </p>
        <div>
          <div>
            <div className="w-10 h-10">
              <PhoneIcon />
            </div>
            <p>(+84) 327 072 120</p>
          </div>
          <div>
            <div className="w-10 h-10">
              <HomeIcon />
            </div>
            <p>
              117 Duong Nguyen Du, Phuong Ben Thanh, Quan 1, Ho Chi Minh 700000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
