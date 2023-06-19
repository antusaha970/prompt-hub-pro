import Feed from "@components/Feed/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const revalidate = 60;
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="head_text text-center">
        Explore Prompt created by People around the world
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          See Prompt and also a sample ans for that prompt
        </span>
      </h1>
      <p className="text-center desc">
        Prompt Hub Is an open-source AI prompting tool.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
