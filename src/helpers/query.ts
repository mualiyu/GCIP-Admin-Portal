import axios from "axios";
import { useState } from "react";
interface QueryParams {
  method: string;
  url: string;
  bodyData: {};
  token?:string;
}
export default async function query({ method, url, bodyData,token='' }: QueryParams) {
  let headers1={
    "Content-Type": "application/json",
    'x-auth-token':token
  }
  let headers2={
    "Content-Type": "application/json"
  }
  const conditionalHeader=token?headers1:headers2
  try {
    if (method=='GET') {
    var response = await fetch(`https://api.grants.amp.gefundp.rea.gov.ng${url}`)
    }else{
      var response = await fetch(`https://api.grants.amp.gefundp.rea.gov.ng${url}`, {
        method: method,
        headers:conditionalHeader,
        body: JSON.stringify(bodyData),
      });
    }
    
    const data = await response.json();
    if (data.status) {
      return { success: true, data: data };
    } else {
      return { success: false, data: data };
    }
  } catch (err) {
    return { success: false, error: err };
  }
}
