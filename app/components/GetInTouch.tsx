import { Button } from "@/components/ui/button";
import Link from "next/link";
import Heading from "./Heading";

type props = {
  className?: string;
};

const GetInTouch = ({ className }: props) => {
  return (
    <section
      className={`bg-[url('/images/flipped.jpg')] bg-no-repeat bg-cover bg-center ${className} text-white`}
    ><div className={`bg-opacity-80 bg-brand-dark-blue`}>
        <div className="container py-16">
          <Heading title="Get in touch with us." tag='Contact' iconColor="light-blue" center className='mb-10' titleSize='text-white text-3xl sm:text-5xl' />
          <div className="max-w-6xl container p-0 mx-auto grid grid-cols-1 sm:grid-cols-2 font-openSans">
            <div className="p-5 pr-5 sm:pr-12">
              <table className={`table-fixed mx-auto sm:ml-auto sm:mx-0`}>
                <thead>
                  <tr>
                    <th scope="col" className="pb-3">General enquiries</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Thursday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Friday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Saturday</td> <td>Closed</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Sunday</td> <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-5 pl-5 sm:pl-12">
              <table className={`table-fixed mx-auto sm:mx-0`}>
                <thead>
                  <tr>
                    <th scope="col" className="pb-3">Charter enquiries</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Thursday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Friday</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Saturday</td> <td>Closed</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Sunday</td> <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 max-w-6xl grid center mx-auto">
            <Link href='/enquire' className="mx-auto"><Button size='lg' className="bg-brand-light-blue text-white mx-auto">General enquiries</Button></Link>
          </div></div>
      </div>
    </section>
  );
};

export default GetInTouch  