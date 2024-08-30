import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return <>
    <footer className="relative z-10 w-full bg-slate-700 text-white pt-8 pb-6 min-w-[400px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab text-teal-500 fa-twitter"></i></button><button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab text-teal-500 fa-facebook-square"></i></button><button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab text-teal-500 fa-dribbble"></i></button><button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab text-teal-500 fa-github"></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                <ul className="list-unstyled">
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">About Us</span>
                  </li>
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Blog</span>
                  </li>
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Github</span>
                  </li>
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Free Products</span>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                <ul className="list-unstyled">
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">MIT License</span>
                  </li>
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Terms &amp; Conditions</span>
                  </li>
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Privacy Policy</span>
                  </li>
                  <li>
                    <span className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Contact Us</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
      </div>
    </footer>
  </>
}
