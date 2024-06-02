export function formatCurrency(value){
    return new Intl.NumberFormat("en-GB", {
         style: "currency",
         currency: "NGN",
         maximumFractionDigits: 0,
       }).format(value);
 }
 