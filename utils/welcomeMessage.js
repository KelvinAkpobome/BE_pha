const dotenv = require('dotenv');

// load config
dotenv.config();
const message = (url) => {
  const html = `
          <body style="margin: 0; padding: 0;">
          <h1>You are welcome to Port Harcourt Agents API</h1>
            <p>Home Hunting Made Easy in Port Harcourt, kindly see the link below for usage</p>
                <a style="width:250px; display:inline-block; text-decoration: none; font-size: 15px; text-align: center;
                  background-color:#55acee; border-radius:2px; color:white; height:32px; cursor: pointer; padding-top:5px"
                          href=${url}>
                          Documentation here
                        </a>
          </body>`;
  return html;
};

const fullMessage = message(`${process.env.LIVE_DOCS}`);

module.exports = fullMessage;
