

const Contact = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
     <div
     className="border rounded bg-white p-5"
     >
      <div className="d-flex flex-column">
      <h1 className="mb-3">Contacts</h1>
        <div className="mb-3">
          <div>
          Email:&nbsp; 
          <a className="" href="mailto:yo@dev.to">
            yo@dev.to 😁
          </a>
          </div>
        </div>
        <div className="mb-3">
          <div>
          Twitter:&nbsp;
          <a className="" href="https://twitter.com/thepracticaldev">
             @thepracticaldev 👻
          </a>
          </div>
        </div>
        <div className="mb-3">
          <div>
          Report a vulnerability:&nbsp;
          <a className="" href="https://dev.to/security">
             dev.to/security 🐛
          </a>
          </div>
        </div>
        <div className="mb-3">
          <div>
          To report a bug, please create&nbsp;
          <a className="" href="https://github.com/forem/forem/issues">
            a bug report
          </a>
          &nbsp;in our open source repository.
          </div>
        </div>
        <div className="mb-3">
          <div>
          To request a feature, please&nbsp;
          <a className="" href="https://github.com/forem/forem/discussions">
            start a new GitHub Discussion
          </a>
          &nbsp;in the Forem repo!
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Contact
