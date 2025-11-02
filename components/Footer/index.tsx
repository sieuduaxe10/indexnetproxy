import { ChromeIcon } from "../icons/ChromeIcon";
import { WindowIcon } from "../icons/WindowIcon";

export const Footer = () => {
  return (
    <footer>
      <div>
        NetProxy.io provides residential proxy services, helping users to access
        the internet anonymously and securely, supporting tasks such as web
        scraping and market research with high speed and reliability.
      </div>
      <div>
        <div>
          <div className="w-10 h-10">
            <ChromeIcon />
          </div>
          EXTENSIONS FOR Chrome
        </div>
        <div>
          <div className="w-10 h-10">
            <WindowIcon />
          </div>
          Download FOR WINDOWS
        </div>
        <div>
          <div className="w-10 h-10">
            <WindowIcon />
          </div>
          Download FOR IOS
        </div>{" "}
        <div>
          <div className="w-10 h-10">
            <WindowIcon />
          </div>
          DOWNLOAD FOR ANDROID
        </div>
      </div>
      <div>
        <div>
          <div>Account</div>
          <div>Login</div>
        </div>
        <div>
          <div>Affiliate</div>
          <div>Reseller Program</div>
          <div>Link Program</div>
        </div>
        <div>
          <div>Category</div>
          <div>FAQs</div>
          <div>Pricing</div>
          <div>Contact</div>
        </div>
        <div>
          <div>Service, Term</div>
          <div>Privacy Policy</div>
          <div>Cockie Policy</div>
          <div>Term, service</div>
          <div>Refund Policy</div>
        </div>
      </div>
    </footer>
  );
};
