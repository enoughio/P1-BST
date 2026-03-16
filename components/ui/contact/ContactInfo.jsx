
import ContactQuestion from "@/components/ui/contact/ContactQuestion";


export default function ContactInfo() {
    return (
      <div className="space-y-3 ">
        <ContactQuestion />
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">Phone</h2>
          <p className="text-gray-700">+91 8871317382</p>
        </div>
        
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">Email</h2>
          <p className="text-gray-700">contact@bharatstorytellers.com</p>
        </div>
        
        <div className="">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Address</h2>
          <p className="text-gray-700 " >
            First Floor, Bharat Storytellers,<br />
            B-66, near Chetak Bridge,<br />
            Housing Board Colony,<br />
            Kasturba Nagar, Bhopal,<br />
            Madhya Pradesh 462022
          </p>
        </div>
      </div>
    );
  }