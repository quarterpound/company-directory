import HomePage from "@/components/pages/home";
import Image from "next/image";

export default function Home() {
  return (
    <HomePage
      filters={{
        search: "",
        services: [],
        specialities: [],
        city: [],
        industry: [],
        page: 0,
        limit: 10,
      }}
    />
  );
}
