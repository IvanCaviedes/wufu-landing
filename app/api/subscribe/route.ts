import { NextResponse } from "next/server";

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request:Request){
  const data=await request.formData();
  const name=String(data.get("name")||"").trim().slice(0,60);
  const email=String(data.get("email")||"").trim().toLowerCase().slice(0,120);
  const pet=String(data.get("pet")||"").slice(0,20);
  const discoveries=String(data.get("secretos_encontrados")||"0/5");
  if(name.length<2||!emailPattern.test(email))return NextResponse.json({ok:false,error:"Datos inválidos"},{status:400});
  const rewardEligible=discoveries==="5/5";
  const apiKey=process.env.RESEND_API_KEY;
  const audience=process.env.RESEND_AUDIENCE_ID;
  if(apiKey&&audience){
    const response=await fetch(`https://api.resend.com/audiences/${audience}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({email,first_name:name,unsubscribed:false})});
    if(!response.ok)return NextResponse.json({ok:false,error:"No pudimos completar el registro"},{status:502});
  }
  return NextResponse.json({ok:true,rewardEligible,pet,configured:Boolean(apiKey&&audience)});
}
