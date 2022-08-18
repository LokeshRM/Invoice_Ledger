import Head from "next/head";
import { Contract, providers } from "ethers";
import web3modal from "web3modal";
import { useState, useEffect, useRef } from "react";
import { _address, abi } from "../contract";

export default function Home() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [dataIvoice, setDataInvoice] = useState([]);
    const web3modalRef = useRef();
    const dateRef = useRef();
    const sellerRef = useRef();
    const buyerRef = useRef();
    const amountRef = useRef();
    const buyerPaymentRef = useRef();
    const idRef = useRef();
    const statusRef = useRef();
    const fetchBuyerRef = useRef();

    useEffect(() => {
        if (!walletConnected) {
            web3modalRef.current = new web3modal({
                network: "ropsten",
                providerOptions: {},
                disableInjectedProvider: false,
            });
            connectWallet();
        }
    }, [walletConnected]);

    const connectWallet = async () => {
        try {
            await getProvider();
            setWalletConnected(true);
        } catch (err) {
            console.log(err);
        }
    };

    const getProvider = async (needSigner = false) => {
        const instance = await web3modalRef.current.connect();
        const provider = new providers.Web3Provider(instance);
        const { chainId } = await provider.getNetwork();
        if (chainId !== 5) {
            window.alert("change network to goerli");
            throw new Error("change to goerli network");
        }
        if (needSigner) {
            const signer = provider.getSigner();
            return signer;
        }
        return provider;
    };

    const updateInvoice = async () => {
        try {
            const signer = await getProvider(true);
            const contract = new Contract(_address, abi, signer);
            const tx = await contract.createInvoice(
                buyerRef.current.value,
                sellerRef.current.value,
                dateRef.current.value,
                amountRef.current.value
            );
            await tx.wait();
            window.alert("sucess");
        } catch (err) {
            console.log(err);
        }
    };

    const paymentUpdate = async () => {
        try {
            const signer = await getProvider(true);
            const contract = new Contract(_address, abi, signer);
            var status = false;
            if (statusRef.current.value == "paid") {
                status = true;
            }
            const tx = await contract.paymentStatus(
                buyerPaymentRef.current.value,
                idRef.current.value,
                status
            );
            await tx.wait();
            window.alert("sucess");
        } catch (err) {
            console.log(err);
            window.alert("please check yes to update");
        }
    };

    const fetchInvoice = async () => {
        try {
            const provider = await getProvider();
            const contract = new Contract(_address, abi, provider);
            const data = await contract.listOfInvoice(
                fetchBuyerRef.current.value
            );
            console.log(data);
            setDataInvoice(data);
        } catch (err) {
            console.log(err);
        }
    };

    const renderOptions = () => {
        if (!walletConnected) {
            return (
                <button
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-fuchsia-400/80 hover:shadow-fuchsia-500/50 mb-2"
                    onClick={connectWallet}
                >
                    connect
                </button>
            );
        } else {
            return (
                <div className="flex flex-col md:flex-row justify-evenly pt-16">
                    <div className="flex font-mono text-md font-light">
                        <div>
                            <input
                                type="text"
                                placeholder="buyerPAN"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={buyerRef}
                            />
                            <input
                                type="text"
                                placeholder="sellerPAN"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={sellerRef}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={amountRef}
                            />
                            <input
                                type="date"
                                placeholder="date of payment"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={dateRef}
                            />
                            <button
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-fuchsia-400/80 hover:shadow-fuchsia-500/50 mb-2"
                                onClick={updateInvoice}
                            >
                                Add Invoice
                            </button>
                        </div>
                        <div className="ml-10">
                            <input
                                type="text"
                                placeholder="buyerPAN"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={buyerPaymentRef}
                            />
                            <input
                                type="number"
                                placeholder="id"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={idRef}
                            />
                            <select
                                name="cars"
                                className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                                ref={statusRef}
                            >
                                <option value="paid">paid</option>
                                <option value="not paid">not paid</option>
                            </select>
                            <button
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 shadow-md shadow-fuchsia-400/80 hover:shadow-fuchsia-500/50 mb-2"
                                onClick={paymentUpdate}
                            >
                                Update payment
                            </button>
                        </div>
                    </div>
                    <div className="ml-10 font-mono text-md font-light">
                        <input
                            type="text"
                            placeholder="buyerPAN"
                            className="my-4 block h-8 w-30 rounded bg-[#24292d] shadow shadow-blue-400/50"
                            ref={fetchBuyerRef}
                        />
                        <button
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-pink-500 shadow-md shadow-fuchsia-400/80 hover:shadow-fuchsia-500/50 mb-2"
                            onClick={fetchInvoice}
                        >
                            fetch data
                        </button>
                        <div className="pb-10 mt-10 grid gap-y-8 gap-x-20 grid-cols-2 justify-evenly">
                            {dataIvoice.map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="mx-auto p-4 rounded-md shadow-md shadow-pink-500/80"
                                    >
                                        <p>Buyer PAN : {x.buyerPAN}</p>
                                        <p>seller PAN : {x.sellerPAN}</p>
                                        <p>
                                            Invoice Amount :{" "}
                                            {x.invoiceAmount.toString()}
                                        </p>
                                        <p>Invoice Date : {x.invoiceDate}</p>
                                        <p>
                                            Payment Status:{" "}
                                            {x.payment ? "paid" : "not paid"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="bg-[#24292d] min-h-screen text-white">
            <Head>
                <title>invoice ledger</title>
            </Head>
            <div>
                <p className="font-sans font-bold text-3xl text-center pt-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-900">
                    INVOICE LEDGER
                </p>
                {renderOptions()}
            </div>
        </div>
    );
}
