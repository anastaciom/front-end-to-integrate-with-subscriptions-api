import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-2/4 h-28 flex justify-between items-center flex-col">
        <p className="text-4xl font-bold">Welcome</p>
        <button className="rounded-lg bg-slate-800 p-2">
          <Link to={"/plans"} className="text-lg">
            Subscriptions
          </Link>
        </button>
      </div>
    </div>
  );
};

export { WelcomePage };
