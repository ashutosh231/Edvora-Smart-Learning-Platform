// // Icons
// import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// import { FooterLink2 } from "../../data/footer-links";
// import { Link } from "react-router-dom";
// // Images
// import Logo from "../../assets/Logo/Logo-Full-Light.png";
// import React from "react";

// const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
// const Resources = [
//   "Articles",
//   "Blog",
//   "Chart Sheet",
//   "Code challenges",
//   "Docs",
//   "Projects",
//   "Videos",
//   "Workspaces",
// ];
// const Plans = ["Paid memberships", "For students", "Business solutions"];
// const Community = ["Forums", "Chapters", "Events"];

// const Footer = () => {
//   return (
//     <div className="bg-richblack-800">
//       <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
//         <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
//           {/* Section 1 */}
//           <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
//             <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
//               <img src={Logo} alt="" className="object-contain" />
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Company
//               </h1>
//               <div className="flex flex-col gap-2">
//                 {["About", "Careers", "Affiliates"].map((ele, i) => {
//                   return (
//                     <div
//                       key={i}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.toLowerCase()}>{ele}</Link>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="flex gap-3 text-lg">
//                 <FaFacebook />
//                 <FaGoogle />
//                 <FaTwitter />
//                 <FaYoutube />
//               </div>
//               <div></div>
//             </div>

//             <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Resources
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Resources.map((ele, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.split(" ").join("-").toLowerCase()}>
//                         {ele}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>

//               <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
//                 Support
//               </h1>
//               <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
//                 <Link to={"/help-center"}>Help Center</Link>
//               </div>
//             </div>

//             <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Plans
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Plans.map((ele, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.split(" ").join("-").toLowerCase()}>
//                         {ele}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//               <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
//                 Community
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Community.map((ele, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <Link to={ele.split(" ").join("-").toLowerCase()}>
//                         {ele}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Section 2 */}
//           <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
//             {FooterLink2.map((ele, i) => {
//               return (
//                 <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//                   <h1 className="text-richblack-50 font-semibold text-[16px]">
//                     {ele.title}
//                   </h1>
//                   <div className="flex flex-col gap-2 mt-2">
//                     {ele.links.map((link, index) => {
//                       return (
//                         <div
//                           key={index}
//                           className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                         >
//                           <Link to={link.link}>{link.title}</Link>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
//         {/* Section 1 */}
//         <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
//           <div className="flex flex-row">
//             {BottomFooter.map((ele, i) => {
//               return (
//                 <div
//                   key={i}
//                   className={` ${
//                     BottomFooter.length - 1 === i
//                       ? ""
//                       : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                   } px-3 `}
//                 >
//                   <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
//                     {ele}
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="text-center">Made with ❤️ CodeHelp © 2023 Studynotion</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

// Icons
import { FaFacebook, FaGoogle, FaHeart, FaTwitter, FaYoutube } from "react-icons/fa";

import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import React from "react";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-richblack-800 to-richblack-900 border-t border-richblack-700">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between w-11/12 max-w-maxContent text-richblack-300 leading-6 mx-auto relative py-16">
        
        {/* Main Footer Content */}
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-8 pb-8">
          
          {/* Section 1 - Left Side */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 lg:pr-12 gap-8">
            
            {/* Company & Social */}
            <div className="w-full md:w-[45%] lg:w-[30%] flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <img 
                  src={Logo} 
                  alt="StudyNotion Logo" 
                  className="object-contain w-40 h-auto filter brightness-0 invert opacity-90"
                />
                <p className="text-richblack-100 text-sm leading-6">
                  Empowering learners worldwide with quality education and cutting-edge resources.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="text-richblack-50 font-bold text-lg">Company</h3>
                <div className="flex flex-col gap-3">
                  {["About", "Careers", "Affiliates"].map((ele, i) => (
                    <Link
                      key={i}
                      to={ele.toLowerCase()}
                      className="text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform"
                    >
                      {ele}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-3">
                <h3 className="text-richblack-50 font-bold text-lg">Follow Us</h3>
                <div className="flex gap-4 text-xl">
                  {[
                    { Icon: FaFacebook, color: "hover:text-blue-500" },
                    { Icon: FaGoogle, color: "hover:text-red-500" },
                    { Icon: FaTwitter, color: "hover:text-blue-400" },
                    { Icon: FaYoutube, color: "hover:text-red-600" }
                  ].map(({ Icon, color }, index) => (
                    <Link
                      key={index}
                      to="#"
                      className={`text-richblack-400 ${color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5`}
                    >
                      <Icon />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources & Support */}
            <div className="w-full md:w-[45%] lg:w-[30%] flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-richblack-50 font-bold text-lg">Resources</h3>
                <div className="flex flex-col gap-3">
                  {Resources.map((ele, index) => (
                    <Link
                      key={index}
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform"
                    >
                      {ele}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-richblack-50 font-bold text-lg">Support</h3>
                <Link
                  to={"/help-center"}
                  className="text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform"
                >
                  Help Center
                </Link>
              </div>
            </div>

            {/* Plans & Community */}
            <div className="w-full md:w-[45%] lg:w-[30%] flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-richblack-50 font-bold text-lg">Plans</h3>
                <div className="flex flex-col gap-3">
                  {Plans.map((ele, index) => (
                    <Link
                      key={index}
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform"
                    >
                      {ele}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-richblack-50 font-bold text-lg">Community</h3>
                <div className="flex flex-col gap-3">
                  {Community.map((ele, index) => (
                    <Link
                      key={index}
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform"
                    >
                      {ele}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Right Side */}
          <div className="lg:w-[50%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:pl-4">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="flex flex-col gap-4">
                <h3 className="text-richblack-50 font-bold text-lg">{ele.title}</h3>
                <div className="flex flex-col gap-3">
                  {ele.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.link}
                      className="text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-richblack-700">
        <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto py-8 gap-6 text-sm">
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className="text-richblack-400 hover:text-yellow-50 transition-all duration-200 px-3 py-1 rounded-lg hover:bg-richblack-700 font-medium text-xs uppercase tracking-wide"
              >
                {ele}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-richblack-300 font-medium">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by CodeHelp</span>
            <span className="text-richblack-400">© 2023 Studynotion</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;