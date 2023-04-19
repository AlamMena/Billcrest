import React from "react";
import { useSelector } from "react-redux";

export function InvoiceBeneficiary() {
  const { beneficiary } = useSelector((state) => state.invoice);

  return (
    <div className="p-3 flex space-x-3 items-center space-y-1">
      <div className="h-14 w-14">
        <img
          layout="fill"
          alt=""
          src={beneficiary.imageUrl}
          className="rounded-full w-full"
        />
      </div>
      <div className="flex flex-col">
        {/* Name */}
        <span className="font-bold">{beneficiary.name}</span>
        {/* Address */}
        <span className="text-sm">Direccion: {beneficiary.address}</span>
        {/* Phone */}
        <span className="text-sm">Tel: {beneficiary.phone}</span>
      </div>
    </div>
  );
}

export function InvoiceRecipient() {
  const { recipient } = useSelector((state) => state.invoice);

  return (
    <div className="p-3">
      {(Object.keys(recipient).length <= 0 && <span></span>) || (
        <div className="flex space-y-1 space-x-3 items-center">
          <div className="h-14 w-14">
            <img
              layout="fill"
              alt=""
              src={recipient.imageUrl}
              className="rounded-full w-full"
            />
          </div>
          <div className="flex flex-col">
            {/* Name */}
            <span className="font-bold">{recipient.name}</span>
            {/* Address */}
            <span className="text-sm">Direccion: {recipient.address}</span>
            {/* Phone */}
            <span className="text-sm">Tel: {recipient.phone}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function InvoiceSupplier() {
  const { supplier } = useSelector((state) => state.invoice);

  return (
    <div className="p-3">
      {(Object.keys(supplier).length <= 0 && <span></span>) || (
        <div className="flex space-y-1 space-x-3 items-center">
          <div className="h-14 w-14">
            <img
              layout="fill"
              alt=""
              src="https://cdn-icons-png.flaticon.com/128/3321/3321752.png"
              className="rounded-full w-full"
            />
          </div>
          <div className="flex flex-col">
            {/* Name */}
            <span className="font-bold">{supplier.name}</span>
            {/* Address */}
            <span className="text-sm">Direccion: {supplier.address}</span>
            {/* Phone */}
            <span className="text-sm">Tel: {supplier.phone}</span>
          </div>
        </div>
      )}
    </div>
  );
}
