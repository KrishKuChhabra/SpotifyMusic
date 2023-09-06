import { ProductWithPrice, Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabasse = createServerComponentClient({
    cookies: cookies,
  });
  const { data, error } = await supabasse
    .from("products")
    .select("*, prices(*)")
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order("unit_amount", { foreignTable: 'prices' });
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
export default getActiveProductsWithPrices;
