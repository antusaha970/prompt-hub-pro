import Feed from "@components/Feed/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Explore and distribute diverse content for discovery and sharing
        purposes
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Prompts enhanced by the power of artificial intelligence.
        </span>
      </h1>
      <p className="text-center desc">
        Promptopia Is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <Feed />
    </section>
  );
};

export default Home;
