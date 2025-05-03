import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Login() {
  return (
    <main className="flex flex-col min-h-screen [background-image:url('./assets/background.png')]">
      {/* <nav className="[app-region:drag] h-8 backdrop-blur-md" /> */}
      <div className="grow flex flex-col justify-center items-center backdrop-blur-xst">
        <div className="p-px bg-linear-180 from-zinc-800 to-zinc-900 rounded-2xl ">
          <div className="rounded-2xl bg-primary-800 p-6 shadow-2 text-white w-96">
						<h1 className="font-bold text-2xl tracking-wide text-center text-shadow-md ">Universe Chat</h1>
            <div className="mt-8 flex flex-col gap-5">
              <button className="py-4 px-5 bg-white/5 hover:bg-white/8 shadow-sunken-hover transition rounded-2xl text-left flex justify-between items-center font-medium text-zinc-100">
                Login to an existing account <ChevronRightIcon className="size-5 text-zinc-300" />
              </button>
              <button className="py-4 px-5 bg-white/5 hover:bg-white/8 shadow-sunken-hover transition rounded-2xl text-left flex justify-between items-center font-medium text-zinc-100">
                Create a new account <ChevronRightIcon className="size-5 text-zinc-300" />
              </button>
            </div>
					</div>
        </div>
      </div>
    </main>
  );
}
