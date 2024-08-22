import SingleCompanyPage from "@/components/pages/single-company-page";
import { getSingleCompany } from "@/components/pages/single-company-page/action";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const data = await getSingleCompany(slug);

  if (!data) {
    notFound();
  }

  return {
    title: data.name,
    description: `${data.name} is a company in ${data.city.name}`,
  };
};

const SingleCompany = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const data = await getSingleCompany(slug);
  if (!data) {
    notFound();
  }

  return <SingleCompanyPage data={data} />;
};

export default SingleCompany;
