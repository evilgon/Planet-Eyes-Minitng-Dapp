import Image from "next/image";
import {
  ConnectWallet,
  useContract,
  useContractMetadata,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

import { useEffect, useState } from "react";

type ChainProps = {
  activeChainId: number;
};

const Interact = (props: ChainProps) => {
  // contract initialization.
  const contractAdress = "0xC3D167963217F3Ba477Dd93C3a453f9cCfA8e5e1";
  const { contract: nftDrop } = useContract(contractAdress);

  // contract metadata and supply.
  const { data: contractMetadata } = useContractMetadata(nftDrop);
  const { data: claimedSupply } = useContractRead(nftDrop, "totalSupply");
  const { data: totalSupply } = useContractRead(nftDrop, "MAX_SUPPLY");
  const { mutateAsync: mint, isLoading } = useContractWrite(nftDrop, "mint");

  const maxClaim: string = "10";

  // to check if all nfts are sold out.
  // const isSoldOut = unclaimedSupply?.toNumber() === 0;

  // the variable gets populated with the wallet address if connected
  const address = useAddress();

  // checks if the user is on an wrong network
  const isWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // sucess and error messages
  const [succes, setSucces] = useState("");
  const [errormsg, setError] = useState("");

  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    console.log(maxClaim);
  }, [maxClaim]);

  // the qty variable gets populated with the qty which user enters
  const [qty, setQty] = useState(1);

  // mint function
  const handleMint = async () => {
    setError("");
    setSucces("");

    if (!address) {
      setError("Please connect your wallet.");
      return;
    }

    if (isWrongNetwork) {
      switchNetwork && switchNetwork(props.activeChainId);
      return;
    }

    setIsMinting(true);
    try {
      await mint([address, qty]);
      setIsMinting(false);
      setSucces("Mint successful 🥳");
      setQty(1);
    } catch (error: any) {
      // console.log(qty);
      setIsMinting(false);
      setQty(1);
      setError(error.reason);
    }
  };

  // to display the loader until the data is fetched
  if (!nftDrop || !contractMetadata) {
    return (
      <div className="pre__loader w-full min-h-screen flex items-center justify-center">
        <div className="p-4 rounded-lg bg-[#ffffffd6]">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="mint__card w-[40rem] min-h-[35rem] rounded-lg p-4">
          <div className="card__btn mt-3">
            {address ? (
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Get your status
                    </label>
                    <div className="w-full flex">
                      <button
                        onClick={handleMint}
                        disabled={isMinting}
                        className="p-2 bg-[#843cff] rounded-md text-white heading w-full"
                      >
                        {isMinting
                          ? "Minting"
                          : isWrongNetwork
                          ? "Change network"
                          : "Run"}
                      </button>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 ml-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="Jane"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Get your status
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-gray-600 text-xs italic">
                      Make it as long and as crazy as you'd like
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      State
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Zip
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <ConnectWallet accentColor="#843cff" colorMode="light" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interact;
