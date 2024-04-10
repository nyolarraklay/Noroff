import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  name: yup.string().required().min(3, "Name must be at least 3 characters"),
  subject: yup
    .string()
    .required()
    .min(3, "Subject must be at least 3 characters"),
  message: yup
    .string()
    .required()
    .min(8, "Message must be at least 8 characters"),
});

function Contacts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="contact-form max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name{" "}
          </label>
          <input
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="name"
            placeholder="Your first name"
            {...register("name")}
          />
          <p className="form-errors">{errors.name?.message}</p>
        </div>
        <div className="form-group">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject{" "}
          </label>
          <input
            name="subject"
            placeholder="Subject"
            {...register("subject")}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="form-errors">{errors.subject?.message}</p>
        </div>
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email{" "}
          </label>
          <input
            name="email"
            placeholder="Your email"
            {...register("email")}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="form-errors">{errors.email?.message}</p>
        </div>
        <div className="form-group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message{" "}
          </label>
          <textarea
            name="message"
            placeholder="Your message"
            {...register("message")}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="form-errors">{errors.message?.message}</p>
        </div>
        <div className="form-group">
          <button
            className="inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contacts;