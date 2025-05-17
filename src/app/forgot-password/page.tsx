import Image from 'next/image';
import pup from './puppies.jpg';
import Link from 'next/link';
export default function ForgetPassword() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>
      <p className="text-lg">
        This is the forgot password page. Sadly, there is no functionality for this right now. Rest in peace your account click <Link href = '/signup' className = 'text-blue-500'>here</Link>   to create a new account. Here's a cute image of a puppy as compensation.
      </p>
      <Image
        src={pup}
        alt="Cute puppy"
        width={200} // Adjust the width
        height={200} // Adjust the height
        className="rounded-full shadow-lg mt-4 pt-0"
      />
    </div>
  );
}