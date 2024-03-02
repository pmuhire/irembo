import React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const validSchema = yup.object().shape({
  citizenship: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  phone: yup.string().required("This field is required"),
  company: yup.string().required("This field is required"),
  surname: yup.string().required("This field is required"),
  othernames: yup.string().required("This field is required"),
  TIN: yup.string().required("This field is required"),
  date: yup.date().required("This field is required"),
  province: yup.string().required("This field is required"),
  businessType: yup.string().required("This field is required"),
  purposeOfImportation: yup.string().required("This field is required"),
  productCategory: yup.string().required("This field is required"),
  weight: yup.string().required("This field is required"),
  unitOfMeasurement: yup.string().required("This field is required"),
  qty: yup
    .number()
    .min(0, "Quantity must be greater than or equal to 0")
    .required("This field is required"),
  desc: yup.string().required("This field is required"),
});

function WorkPermit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ resolver: yupResolver(validSchema) });
  const watch = useWatch({
    name: "citizenship",
    control: control,
    defaultValue: "",
  });

  const handleChange = (name, value) => {
    setValue(name, value);
  };

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axios.post("http://localhost:8080/api/permit/create", data);
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto w-3/5 ">
          <div className="mt-16 bg-blue-400">
            <h5 className="px-10 py-2 hover:bg-blue-700 text-white font-bold border-none">
              Business Owner Details
            </h5>
          </div>
          <div className="border border-blue-500 rounded-md rounded-t-none rounded-sm px-10 py-5">
            <label className="required font-bold">Applicant citizenship</label>
            <div>
              <select
                {...register("citizenship")}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/4 p-1.5 ${errors.citizenship ? 'border-red-500' : ''
                  }`}
                onChange={(e) => handleChange("citizenship", e.target.value)}

              >
                <option value="">Select citizenship</option>
                <option value="Rwandan">Rwandan</option>
                <option value="Foreigner">Foreigner</option>
              </select>
              {errors.citizenship && (
                <p className="text-red-500 text-sm">{errors.citizenship.message}</p>
              )}
            </div>
            {watch === 'Rwandan' && (
              <div className="pr-3 w-1/3">
                <label htmlFor="nationalId" className="font-bold">
                  National ID
                </label>
                <div>
                  <input
                    {...register("nationalId")}
                    type="text"
                    id="nationalId"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.nationalId ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter National ID"
                    onChange={(e) => handleChange("nationalId", e.target.value)}
                  />
                  {errors.nationalId && (
                    <p className="text-red-500 text-sm">{errors.nationalId.message}</p>
                  )}
                </div>
              </div>
            )}
            {watch === 'Foreigner' && (
              <div className="pr-3 w-1/3">
                <label htmlFor="passportId" className="font-bold">
                  Passport ID
                </label>
                <div>
                  <input
                    {...register("passportId")}
                    type="text"
                    id="passportId"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.passportId ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter Passport ID"
                    onChange={(e) => handleChange("passportId", e.target.value)}
                  />
                  {errors.passportId && (
                    <p className="text-red-500 text-sm">{errors.passportId.message}</p>
                  )}
                </div>
              </div>
            )}
            <div className="py-3 flex justify-start ">
              <div className="pr-3 w-1/3">
                <label htmlFor="" className="font-bold">
                  Phone number
                </label>
                <div>
                  <input
                    {...register("phone")}
                    type="text"
                    id="phone"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.phone ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter phone number"
                    onChange={(e) => handleChange("phone", e.target.value)}

                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="w-1/3 pr-3">
                <label htmlFor="" className="font-bold">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full block p-1.5 ${errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter email address"
                  onChange={(e) => handleChange("email", e.target.value)}

                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="py-3 flex justify-start ">
              <div className="w-1/3 pr-3">
                <label htmlFor="surname" className="font-bold">
                  Surname
                </label>
                <input
                  {...register("surname")}
                  type="text"
                  id="surname"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full block p-1.5 ${errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter your surname"
                  onChange={(e) => handleChange("surname", e.target.value)}

                />
                {errors.surname && (
                  <p className="text-red-500 text-sm">{errors.surname.message}</p>
                )}
              </div>
              <div className="w-1/3 pr-3">
                <label htmlFor="" className="font-bold">
                  Other names
                </label>
                <input
                  {...register("othernames")}
                  type="text"
                  id="othernames"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full block p-1.5 ${errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter your other names"
                  onChange={(e) => handleChange("othernames", e.target.value)}

                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.othernames.message}</p>
                )}
              </div>

            </div>
            <h5 className="py-3 font-bold">Business Owner Address</h5>
            <label className="py-3 font-bold">Province</label>
            <div className="mb-4">
              <select
                {...register("province")}
                placeholder="Select province"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-2/4 mt-2 block p-2.5 ${errors.province ? 'border-red-500' : ''
                  }`}
                onChange={(e) => handleChange("province", e.target.value)}
              >
                <option value="">Select province</option>
                <option value="Kigali">Kigali</option>
                <option value="Eastern Province">Eastern Province</option>
                <option value="Southern Province">Southern Province</option>
                <option value="Western Province">Western Province</option>
                <option value="Northern Province">Northern Province</option>
              </select>
              {errors.province && (
                <p className="text-red-500 text-sm">{errors.province.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="w-3/5 mx-auto">
          <div className="mt-6 bg-blue-500 ">
            <h5 className="px-10 py-2 hover:bg-blue-700 text-white font-bold border-none">
              Business Details
            </h5>
          </div>
          <div className="border border-blue-500 rounded-md rounded-t-none px-10 py-5">
            <p className="font-bold mt-2 mb-2">Business Details</p>
            <div className="py-3 flex justify-start ">
              <div className="w-1/3 pr-3">
                <label className="required font-bold">Business Type</label>
                <select
                  {...register("businessType")}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.businessType ? 'border-red-500' : ''
                    }`}
                  onChange={(e) => handleChange("businessType", e.target.value)}

                >
                  <option value="">Enter business type</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Manufacturer">Manufacturer</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-500 text-sm">{errors.businessType.message}</p>
                )}
              </div>
              <div className="pr-3 w-1/3">
                <label htmlFor="" className="font-bold">
                  Company name
                </label>
                <div>
                  <input
                    {...register("company")}
                    type="text"
                    id="company"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.company ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter company name"
                    onChange={(e) => handleChange("company", e.target.value)}

                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm">{errors.company.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="py-3 flex justify-start ">
              <div className="pr-3 w-1/3">
                <label htmlFor="" className="font-bold">
                  TIN Number
                </label>
                <div>
                  <input
                    {...register("TIN")}
                    type="text"
                    id="TIN"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.TIN ? 'border-red-500' : ''
                      }`}
                    placeholder="Enter TIN number"
                    onChange={(e) => handleChange("TIN", e.target.value)}

                  />
                  {errors.TIN && (
                    <p className="text-red-500 text-sm">{errors.TIN.message}</p>
                  )}
                </div>
              </div>
              <div className="w-1/3 pr-3">
                <label htmlFor="" className="font-bold">
                  Registration Date
                </label>
                <input
                  {...register("date")}
                  type="date"
                  id="date"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full block p-1.5 ${errors.date ? 'border-red-500' : ''
                    }`}
                  placeholder="Choose Date"
                  onChange={(e) => handleChange("date", e.target.value)}

                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
            </div>
            <h5 className="py-3 font-bold">Business Address</h5>
            <label className="py-3 font-bold">Province</label>
            <div className="mb-4">
              <select
                {...register("province")}
                placeholder="Select province"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-2/4 mt-2 block p-2.5 ${errors.province ? 'border-red-500' : ''
                  }`}
                onChange={(e) => handleChange("province", e.target.value)}
              >
                <option value="">Select province</option>
                <option value="Kigali">Kigali</option>
                <option value="Eastern Province">Eastern Province</option>
                <option value="Southern Province">Southern Province</option>
                <option value="Western Province">Western Province</option>
                <option value="Northern Province">Northern Province</option>
              </select>
              {errors.province && (
                <p className="text-red-500 text-sm">{errors.province.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="w-3/5 mx-auto">
          <div className="mt-6 bg-blue-400">
            <h5 className="px-10 py-2 hover:bg-blue-700 text-white font-bold border-none">
              Product Information
            </h5>
          </div>
          <div className="border border-blue-500 rounded-md rounded-t-none px-10 py-5">
            <label className="required font-bold">Purpose of importation</label>
            <div>
              <select
                {...register("purposeOfImportation")}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/4 p-1.5 ${errors.purposeOfImportation ? 'border-red-500' : ''
                  }`}

                onChange={(e) => handleChange("purposeOfImportation", e.target.value)}
              >
                <option value="">the purpose of importation</option>
                <option value="Direct sale">Direct sale</option>
                <option value="Personal use">Personal use</option>
                <option value="Trial use">Trial use</option>
                <option value="Other">Other</option>
              </select>
              {errors.purposeOfImportation && (
                <p className="text-red-500 text-sm">{errors.purposeOfImportation.message}</p>
              )}
            </div>
            <p className="font-bold mt-2 mb-2">Product details</p>
            <label className="required font-bold">Product category</label>
            <div>
              <select
                {...register("productCategory")}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/4 p-1.5 ${errors.productCategory ? 'border-red-500' : ''
                  }`}

                onChange={(e) => handleChange("productCategory", e.target.value)}
              >
                <option value="">Select product category</option>
                <option value="General purpose">General purpose</option>
                <option value="Construction materials">Construction materials</option>
                <option value="Chemicals">Chemicals</option>
              </select>
              {errors.productCategory && (
                <p className="text-red-500 text-sm">{errors.productCategory.message}</p>
              )}
            </div>
            <div className="pr-3 w-1/3 mt-4">
              <label htmlFor="" className="font-bold">
                Weight(kg)
              </label>
              <div>
                <input
                  {...register("weight")}
                  type="text"
                  name="weight"
                  id="weight"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.weight ? 'border-red-500' : ''
                    }`}
                  placeholder="Weight(kg)"
                  onChange={(e) => handleChange("weight", e.target.value)}

                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">{errors.weight.message}</p>
                )}
              </div>
            </div>
            <div className="py-3 flex justify-start ">
              <div className="pr-3 w-1/3">
                <label htmlFor="" className="font-bold">
                  Unit of measurement
                </label>
                <div>
                  <select
                    {...register("unitOfMeasurement")}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 ${errors.unitOfMeasurement ? 'border-red-500' : ''
                      }`}

                    onChange={(e) => handleChange("unitOfMeasurement", e.target.value)}
                  >
                    <option value="">Select unit of measurement</option>
                    <option value="kgs">Kgs</option>
                    <option value="Tonnes">Tonnes</option>
                  </select>
                  {errors.unitOfMeasurement && (
                    <p className="text-red-500 text-sm">{errors.unitOfMeasurement.message}</p>
                  )}
                </div>
              </div>
              <div className="w-1/3 pr-3">
                <label htmlFor="" className="font-bold">
                  Quantity of product(s)
                </label>
                <input
                  {...register("qty")}
                  type="number"
                  id="qty"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full block p-1.5 ${errors.qty ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter quantity"
                  min={0}
                  onChange={(e) => handleChange("qty", e.target.value)}

                />
                {errors.qty && (
                  <p className="text-red-500 text-sm">{errors.qty.message}</p>
                )}
              </div>
            </div>
            <div className="pr-3 w-2/3 mt-4">
              <label htmlFor="" className="font-bold required">
                Description of products
              </label>
              <textarea
                {...register("desc")}
                name="desc"
                id="desc"
                cols="200"
                rows="6"
                placeholder="Enter product description"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full block p-1.5 ${errors.desc ? 'border-red-500' : ''
                  }`}
              />
              {errors.desc && (
                <p className="text-red-500 text-sm">{errors.desc.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto my-3 w-3/5">
          <button type="submit" class=" mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send request
          </button>
        </div>

      </form>
    </div>
  );
}

export default WorkPermit;
