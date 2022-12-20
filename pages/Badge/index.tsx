import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Badge() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <>
      <header>
        <div className="border-b h-[60px] bg-[#C9CDD4] flex justify-center items-center">
          <div className="h-[55px] w-full flex justify-between items-center">
            <div>back</div>
            <div>
              <div>money</div>
              <div>address</div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <h1>Badge Awarding</h1>
        <div className="w-full flex items-center justify-center">
          <button className="btn">Save</button> |
          <button className="btn">Review</button>
        </div>
        <div>
          <div>step1</div>
          <div className="flex">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <div>
              <button className="btn">New</button>
            </div>
          </div>
        </div>
        <div>
          <div>step3</div>
          <h1>set Metadata</h1>
          <div className="flex">
            <form
              action=""
              className="max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700"
            >
              <label htmlFor="">Traits</label>
              <input
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register("name", { required: "Please enter a your name." })}
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
