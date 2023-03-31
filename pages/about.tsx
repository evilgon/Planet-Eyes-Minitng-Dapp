import React from "react";
import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>Planets of the eyes</title>
      </Head>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="about__content mint__card p-4 rounded-lg w-5/6 md:w-3/5">
          <h1 className="heading text-xl font-bold">Planets of the eyes</h1>
          <p className="body-font mt-4">
            We are the planets of the eye. We have a unique 9000 NFT We are a
            project for ordinary people in society. We do not want rich people
            to have NFT alone We will put NFTs up for sale in several phases. In
            each phase, prices increase compared to the previous phase. This
            will allow those who buy and hold faster to make the most profit
            Join our{" "}
            <a
              href="https://discord.gg/uT6mxShz"
              target={"_blank"}
              className="text-green-600"
            >
              Discord
            </a>{" "}
            for more information and a project roadmap.
          </p>
          <div>
            <p className="mt-6 body-font">Made with ❤️ by Harry Anderson</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
