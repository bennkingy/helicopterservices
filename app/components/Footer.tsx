export default function Footer() {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto px-4 dark:bg-black sm:px-6 md:pt-6 flex flex-wrap container justify-between">
        <div className="p-5">
          <div className="text-xs uppercase font-medium">Home</div>
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
          <div className="text-xs uppercase font-medium">Resources</div>
          <a className="my-3 block" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span>
          </a>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase font-medium">Useful links</div>
          <a className="my-3 block" href="/#">Terms and conditions <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span>
          </a>
        </div>
        <div className="p-5">
          <div className="text-xs uppercase font-medium">Contact us</div>
          <a className="my-3 block" href="/#">Helicopter Services
            White Waltham Airfield
            Maidenhead
            Berkshire
            SL6 3NJ
            <span className="text-teal-600 text-xs p-1"></span>
          </a>
          <a className="my-3 block" href="/#">contact@company.com
            <span className="text-teal-600 text-xs p-1"></span>
          </a>
        </div>
      </div>
    </div>
  )
};