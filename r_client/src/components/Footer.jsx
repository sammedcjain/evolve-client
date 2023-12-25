import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { PiCopyrightFill } from "react-icons/pi";

function Footer() {
  return (
    <footer id="footer">
      <style>
        {`
      
/* footer css */

footer {
    background: #3e8e41;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
 
}

#footer .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.social-icons a {
  color: #333333;
  font-size: 34px;
  margin-right: 10px;
  transition: color 0.3s ease-in-out;
}

.social-icons a:hover {
  color: white;
}

#footer h4 {
  margin: 0;
  color: #333333;
}

@media screen and (max-width: 768px) {
  /* adjust layout for smaller screens */
  #footer h1 {
    font-size: 36px;
  }

  #footer h2 {
    font-size: 20px;
  }

  /* form.ev {
    margin: 20px 15px;
    max-width: 400px;
  }
 */
  /* adjust button styles */
  #footer button {
    padding: 8px 16px;
    font-size: 14px;
  }

  /* adjust footer styles */
  .social-icons {
    margin-bottom: 20px;
  }

  #footer p {
    font-size: 16px;
  }
}`}
      </style>
      <div className="container">
        <div className="social-icons">
          <a href="https://in.linkedin.com/in/sammed-jain-663572203">
            <FaLinkedin />
          </a>
          <a href="https://github.com/sammedcjain">
            <FaGithubSquare />
          </a>
          <a href="mailto:sammed.c.jain@gmail.com">
            <MdMail />
          </a>
          <a href="https://twitter.com/sammysammed">
            <FaSquareXTwitter />
          </a>
        </div>
        <h4 className="footer-text">
          <PiCopyrightFill />
          sammed.c.jain - EV Dekho
        </h4>
      </div>
    </footer>
  );
}

export default Footer;
