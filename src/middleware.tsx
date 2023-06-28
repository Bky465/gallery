import { request } from "http";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default function middleware(req:NextRequest){
       const url= req.nextUrl.clone();
       let isLogin=req.cookies.get("logged")
       if(!isLogin){
        if (req.nextUrl.pathname =="/") {
                 return NextResponse.redirect(new URL('/login',req.nextUrl))
          }
       }
       if(isLogin){
          if(req.nextUrl.pathname =="/login"||req.nextUrl.pathname =="/signup"){
            return NextResponse.redirect(new URL('/',req.nextUrl))
          }
       }
}
