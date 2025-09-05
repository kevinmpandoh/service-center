import { getBrands, getDeviceModels } from "@/services/device.serivce";
import { useQuery } from "@tanstack/react-query";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
};

export const useDeviceModels = (brandId) => {
  return useQuery({
    queryKey: ["deviceModels", brandId],
    queryFn: () => getDeviceModels(brandId),
    enabled: !!brandId, // hanya jalan kalau ada brandId
  });
};
