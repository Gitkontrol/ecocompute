import { Failed } from "../../FailedEmail.jsx";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Preview — Canceled Subscription Email</h1>
      <Failed customerName="Harold" planName="Pro Tools Package" />
    </div>
  );
}
