import React, { useState } from "react";

const Checkout = () => {
  const [isPurchased, setIsPurchased] = useState(false);
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const username = formData.get("username");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address1 = formData.get("address1");
    const city = formData.get("city");
    const state = formData.get("state");
    const zip = formData.get("zip");

    if([username, email, phone, address1, city, state, zip].some((value) => !value)){
      console.log("Please fill all the fields");
    } else {
      const userDetails = {
        username,
        email,
        phone: Number(phone),
        address1,
        city,
        state,
        zip: Number(zip),
      };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  
      //alert logic
      setTimeout(() => {
        setIsPurchased(true);
        setTimeout(() => {
          setIsPurchased(false);
        }, 2000);
      }, 1000);
      form.reset();
    }
  };

  return (
    <>
      {isPurchased && (
        <div
          role="alert"
          className="alert alert-success fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      )}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>

        <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>

          <form className="space-y-4" onSubmit={handleForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="address1" className="label">
                  <span className="label-text">Address 1</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label htmlFor="city" className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  name="city"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label htmlFor="state" className="label">
                  <span className="label-text">State</span>
                </label>
                <input
                  type="text"
                  name="state"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your state"
                />
              </div>

              <div>
                <label htmlFor="zip" className="label">
                  <span className="label-text">Zip</span>
                </label>
                <input
                  type="number"
                  name="zip"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your zip code"
                />
              </div>

              <div>
                <label htmlFor="country" className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  type="text"
                  name="country"
                  className="input input-bordered input-secondary w-full"
                  placeholder="Enter your country"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
