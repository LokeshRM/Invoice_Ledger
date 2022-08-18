export const _address = "0x0D6c3F7b44fE939e00a80D88a7d204bfeB30F5a2";
export const abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_buyerPAN",
                type: "string",
            },
            {
                internalType: "string",
                name: "_sellerPAN",
                type: "string",
            },
            {
                internalType: "string",
                name: "_date",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "createInvoice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_buyerPAN",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "_paymentStatus",
                type: "bool",
            },
        ],
        name: "paymentStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "invoice_list",
        outputs: [
            {
                internalType: "string",
                name: "sellerPAN",
                type: "string",
            },
            {
                internalType: "string",
                name: "buyerPAN",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "invoiceAmount",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "invoiceDate",
                type: "string",
            },
            {
                internalType: "bool",
                name: "payment",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_buyerPAN",
                type: "string",
            },
        ],
        name: "listOfInvoice",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "sellerPAN",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "buyerPAN",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "invoiceAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "invoiceDate",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "payment",
                        type: "bool",
                    },
                ],
                internalType: "struct PAN.invoice[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "noOfInvoices",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
