import AppLayout from "@/components/layouts/AppLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout
      title="Profile"
      subtitle="Manage and update your profile information"
    >
      <div className="rounded-lg shadow p-4 bg-white">
        <div className="flex items-center space-x-6">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium">Company Profile Picture</p>
            <p className="text-sm font-light text-grey-clr">
              Use your compnay logo. Max upload size - 1.5MB
            </p>
          </div>
          <button className="btn btn-sm">Change</button>
        </div>

        <div className="divider" />

        <form className="p-2 space-y-8">
          {/* Name and Email */}
          <div className="flex space-x-6">
            <label htmlFor="name" className="block w-full">
              <p className="text-sm">Display Name</p>
              <p className="text-sm font-light text-grey-clr">
                How your company name will appear to customers
              </p>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-bordered w-full mt-3"
                placeholder="e.g My Company Name"
              />
            </label>
            <label htmlFor="email" className="block w-full overflow-x-hidden">
              <p className="text-sm">Email Address</p>
              <p className="text-sm font-light text-grey-clr">
                You will receive order notifications and general updates with
                this email
              </p>
              <input
                type="email"
                name="email"
                id="email"
                className="input input-bordered w-full mt-3"
                placeholder="e.g. mycompany@logistics.com"
              />
            </label>
          </div>

          {/* Company Location */}
          <div>
            <p className="text-sm">Company Location</p>
            <p className="text-sm font-light text-grey-clr">
              This will not appear to customers. It will help us match you with
              nearest orders
            </p>

            <div className="flex space-x-6 mt-3">
              <select
                defaultValue="Select Company State"
                className="select w-full"
                name="state"
              >
                <option disabled={true}>Select Company State</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kaduna</option>
              </select>
              <select
                defaultValue="Select Company LCDA"
                className="select w-full"
                name="lcda"
              >
                <option disabled={true}>Select Company LCDA</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kaduna</option>
              </select>
              <select
                defaultValue="Select Company Region"
                className="select w-full"
                name="region"
              >
                <option disabled={true}>Select Company Region</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kaduna</option>
              </select>
            </div>
          </div>

          {/* Company Physical Address */}
          <label htmlFor="address" className="block w-full">
            <p className="text-sm">Company Physical Address</p>
            <p className="text-sm font-light text-grey-clr">
              Your company's registered physical address. This will not appear
              to customers
            </p>
            <input
              type="text"
              name="address"
              id="address"
              className="input input-bordered w-full mt-3"
              placeholder="e.g. 24, Allen Avenue, Ikeja Lagos, Nigeria"
            />
          </label>

          {/* Phone Number and Submit Button */}
          <div className="flex space-x-6 items-end">
            <label htmlFor="phone" className="block w-full">
              <p className="text-sm">Phone Number(s)</p>
              <p className="text-sm font-light text-grey-clr">
                You may be contacted via SMS or whatsapp by Agroxhub. This is
                not visible to customers
              </p>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="input input-bordered w-full mt-3"
                placeholder="e.g. 09011223344"
              />
            </label>

            <button
              className="btn bg-dark-green-clr text-white font-normal border-0"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Visibility Status */}
        <label
          htmlFor="visibility"
          className="flex w-full items-center justify-between space-x-6 mt-8 px-2"
        >
          <div>
            <p className="text-sm">Visibility Status</p>
            <p className="text-sm font-light text-grey-clr">
              You will not receive orders while your account is set to
              invisible. Only toggle this off if you do not want to receive
              orders
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
            id="visibility"
            className="toggle toggle-success mt-3"
          />
        </label>
      </div>
    </AppLayout>
  );
}
