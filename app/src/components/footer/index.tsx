
import { Link } from "react-router-dom"
import './style.css'

export default function Footer(){
     return(
          <footer className="bg-white p-5 position-fixed w-100 bottom-0">
               <div id="footer-container" className="footer-container d-flex align-items-center justify-content-center flex-column">
               <p className="m-0">
                    <Link className="" aria-label="DEV Community 👩‍💻👨‍💻 Home" to="/">DEV Community 👩‍💻👨‍💻</Link> — A constructive and inclusive social network for software developers. With you every step of your journey.
               </p>
               <ul className="d-flex" >
                    <li className="">
                    <Link to="/">
                         Home
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/listings">
                         Listings
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/pod">
                         Podcasts
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/videos">
                         Videos
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/tags">
                         Tags
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/faq">
                         FAQ
                    </Link>
                    </li>
                    <li className="">
                    <Link to="https://shop.forem.com">
                         Forem Shop
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/sponsorships">
                         Sponsors
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/about">
                         About
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/contact">
                         Contact
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/guides">
                         Guides
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/software-comparisons">
                         Software comparisons
                    </Link>
                    </li>

               </ul>

               <ul className="d-flex align-items-center" >
                    <li className="">
                    <Link to="/code-of-conduct">
                         Code of Conduct
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/privacy">
                         Privacy Policy
                    </Link>
                    </li>
                    <li className="">
                    <Link to="/terms">
                         Terms of use
                    </Link>
                    </li>
               </ul>

               </div>
          </footer>

     )
}