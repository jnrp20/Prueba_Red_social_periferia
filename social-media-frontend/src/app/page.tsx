import { redirect } from "next/navigation";

export default function Home() {
 redirect("/login");
return(

    <div className="bg-white w-screen h-screen"><h1 className="text-black text-3xl">hola</h1></div>
    
);

}