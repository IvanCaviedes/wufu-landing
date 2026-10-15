import type { Metadata } from "next";
import "./globals.css";
import { publicConfig } from "./config/public";
const siteUrl=publicConfig.siteUrl;
export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 title:{default:`${publicConfig.brandName} | Algo grande viene en camino`,template:`%s | ${publicConfig.brandName}`},
 description:"Muy pronto descubrirás una nueva forma de cuidar, consentir y compartir más momentos con tu mascota. Únete a la manada Wufú.",
 keywords:["Wufú","mascotas","bienestar animal","productos para mascotas","perros","gatos","lanzamiento"],
 authors:[{name:publicConfig.brandName}],creator:publicConfig.brandName,publisher:publicConfig.brandName,category:"mascotas",
 alternates:{canonical:"/"},
 openGraph:{type:"website",locale:"es_CO",url:"/",siteName:"Wufú",title:"Algo grande viene en camino | Wufú",description:"Más momentos, más historias, más vidas juntas. Sé el primero en descubrir lo nuevo de Wufú."},
 twitter:{card:"summary_large_image",title:"Algo grande viene en camino | Wufú",description:"Más momentos, más historias, más vidas juntas."},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
};
const schema={"@context":"https://schema.org","@type":"Organization",name:publicConfig.brandName,url:siteUrl,slogan:"Más vidas juntas",description:"Productos, servicios y experiencias para una vida más feliz con tu mascota."};
export default function RootLayout({children}:LayoutProps<"/">){return <html lang="es" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>{children}</body></html>}
