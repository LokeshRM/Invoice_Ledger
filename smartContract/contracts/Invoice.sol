// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract INVOICE_LEDGER {
    struct invoice {
        string sellerPAN;
        string buyerPAN;
        uint256 invoiceAmount;
        string invoiceDate;
        bool payment;
    }

    mapping(string => mapping(uint256 => invoice)) public invoice_list;

    mapping(string => uint256) public noOfInvoices;

    function createInvoice(
        string memory _buyerPAN,
        string memory _sellerPAN,
        string memory _date,
        uint256 _amount
    ) public {
        uint256 _id = noOfInvoices[_buyerPAN];
        if (_id == 0) {
            invoice_list[_buyerPAN][_id] = invoice(
                _sellerPAN,
                _buyerPAN,
                _amount,
                _date,
                false
            );
            _id += 1;
            noOfInvoices[_buyerPAN] = _id;
        } else {
            invoice_list[_buyerPAN][_id] = invoice(
                _sellerPAN,
                _buyerPAN,
                _amount,
                _date,
                false
            );
            _id += 1;
            noOfInvoices[_buyerPAN] = _id;
        }
    }

    function paymentStatus(
        string memory _buyerPAN,
        uint256 _id,
        bool _paymentStatus
    ) public {
        invoice storage details = invoice_list[_buyerPAN][_id];
        details.payment = _paymentStatus;
    }

    function listOfInvoice(string memory _buyerPAN)
        public
        view
        returns (invoice[] memory)
    {
        uint256 length = noOfInvoices[_buyerPAN];
        invoice[] memory list = new invoice[](length);
        for (uint256 i = 0; i < length; i++) {
            list[i] = invoice_list[_buyerPAN][i];
        }
        return list;
    }
}
