import React from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/methods";

export default function InvoiceTotals() {
  const invoice = useSelector((state) => state.invoice);
  const { subTotal, discountAmount, taxAmount, total, payments } = invoice;

  return (
    <div className=" p-4 flex flex-col">
      <div className="flex justify-end p-2">
        <span className="">Subtotal:</span>
        <span className=" w-32 text-right overflow-hidden">
          {formatCurrency(subTotal)}
        </span>
      </div>
      <div className="flex justify-end p-2">
        <span className="">Descuento:</span>
        <span className=" w-32 text-right overflow-hidden text-red-600">
          {(discountAmount <= 0 && <span>-</span>) || (
            <span>-{formatCurrency(discountAmount)}</span>
          )}
        </span>
      </div>
      <div className="flex justify-end p-2">
        <span className="">Taxes:</span>
        <span className=" w-32 text-right overflow-hidden">
          {(taxAmount <= 0 && <span>-</span>) || (
            <span>{formatCurrency(taxAmount)}</span>
          )}
        </span>
      </div>
      <div className="flex justify-end p-2 font-bold">
        <span className="">Precio Total:</span>
        <span className=" w-32 text-right overflow-hidden">
          {formatCurrency(total)}
        </span>
      </div>
      <div className="flex justify-end p-2">
        <span className="">Monto a pagar:</span>
        <span className=" w-32 text-right overflow-hidden">
          {(payments[0].amount <= 0 && <span>-</span>) || (
            <span>{formatCurrency(payments[0].amount)}</span>
          )}
        </span>
      </div>
    </div>
  );
}
