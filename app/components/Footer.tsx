const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto px-4 sm:px-6  text-gray-800 flex flex-wrap container justify-between">
        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Home</div>
          <a className="my-3 block" href="/#">Services <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Products <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">About Us <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Pricing <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Partners <span className="text-teal-600 text-xs p-1">New</span>
          </a>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Resources</div>
          <a className="my-3 block" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span>
          </a>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Support</div>
          <a className="my-3 block" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span>
          </a>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Contact us</div>
          <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA
            <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">contact@company.com
            <span className="text-teal-600 text-xs p-1"></span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer