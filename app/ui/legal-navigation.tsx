"use client";
import type { MouseEvent, ReactNode } from "react";
export default function LegalNavigation({children}:{children:ReactNode}){function navigate(event:MouseEvent<HTMLDivElement>){const anchor=(event.target as HTMLElement).closest("a");if(anchor?.getAttribute("href")==="/"){event.preventDefault();window.location.replace(new URL("/#inicio",window.location.origin).href)}}return <div onClick={navigate}>{children}</div>}
