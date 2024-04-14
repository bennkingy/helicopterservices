import { Button } from "@/components/ui/button";

type props = {
  className?: string;
};

const GetInTouch = ({ className }: props) => {
  return (
    <><h2 className="text-center text-3xl mt-6">Get in touch</h2>
      <div className="py-10 max-w-6xl container mx-auto grid grid-cols-1 sm:grid-cols-2">
        <div>
          <table className={`table-fixed ml-auto ${className}`}>
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
        <div>
          <table className={`table-fixed ${className}`}>
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
      <div className="py-10 max-w-6xl grid center">
        <Button className="bg-brand-light-blue text-white mx-auto">General enquiries</Button>
      </div>
    </>
  );
}; 

export default GetInTouch  