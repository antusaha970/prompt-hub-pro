import Footer from "@components/Footer/Footer";
import Nav from "@components/Nav/Nav";
import Provider from "@components/Provider/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Prompt Hub",
  description: "Discover prompt around the world with convenience",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
