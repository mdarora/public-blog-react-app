import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                <ul className="list-inline text-center">
                    <li className="list-inline-item">
                    <a href="https://www.linkedin.com/in/md-arora-65aa0b191/" target="_blank" rel="noreferrer">
                        <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-linkedin fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    </li>
                    <li className="list-inline-item">
                    <a href="https://www.facebook.com/profile.php?id=100008392332447" target="_blank" rel="noreferrer">
                        <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    </li>
                    <li className="list-inline-item">
                    <a href="https://github.com/mdarora" target="_blank" rel="noreferrer">
                        <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    </li>
                </ul>
                <p className="copyright text-muted">Copyright &copy; Public Blog (Mohit)</p>
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer
