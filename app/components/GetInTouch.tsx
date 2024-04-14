import { Button } from "@/components/ui/button";

type props = {
  className?: string;
};

const GetInTouch = ({ className }: props) => {
  return (
    <section
      className={`bg-[url('https://images.pexels.com/photos/1549308/pexels-photo-1549308.jpeg?auto=compress&cs=tinysrgb&w=2000')] bg-hero bg-no-repeat bg-cover bg-center ${className} text-white`}
    ><div className={`backdrop-brightness-50`}>
        <div className="py-10">
          <h2 className="text-center text-3xl pt-8">Get in touch with us</h2>
          <div className="max-w-6xl container mx-auto grid grid-cols-1 sm:grid-cols-2">
            <div className="p-5">
              <table className={`table-fixed mx-auto sm:ml-auto sm:mx-0`}>
                <thead>
                  <tr>
                    <th scope="col">General enquiries:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Tuesday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Wednesday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Thursday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Friday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Saturday:</td> <td>Closed</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td> <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-5">
              <table className={`table-fixed mx-auto sm:mx-0`}>
                <thead>
                  <tr>
                    <th scope="col">Charter enquiries:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Tuesday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Wednesday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Thursday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Friday:</td> <td>08:30 - 1730</td>
                  </tr>
                  <tr>
                    <td>Saturday:</td> <td>Closed</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td> <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="pb-10 pt-5 max-w-6xl grid center mx-auto">
            <Button className="bg-brand-light-blue text-white mx-auto">General enquiries</Button>
          </div></div>
      </div>
    </section>
  );
};

export default GetInTouch  