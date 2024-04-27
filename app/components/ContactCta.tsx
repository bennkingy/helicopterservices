import Image from "next/image";

const ContactCta = () => {
  return (
    <div className='text-white bg-brand-medium-blue h-fit'>
      <div className='bg-brand-medium-blue py-5 text-white p-10 relative'>
        <Image
          src={'/images/ruth.png'}
          width={82}
          height={82}
          alt="Title Image"
          priority
          className="rounded-lg -top-5 right-5 absolute z-10"
        />
      </div>
      <div className=' text-white relative z-1 overflow-x-hidden pb-9'>
        <h5 className="font-bold mb-4  pl-5 pr-24">“Contact us today for a customised quote tailored to your needs”</h5>
        <p className='pl-5'>Captain Ruth Downey,<br /><span className="text-brand-light-blue">Accountable Manager/Examiner</span></p>
        <table className={`table-fixed mt-5 ml-5 w-full`}>
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
  )
}

export default ContactCta