// hooks/useDamage.ts
import { getDamageTypes } from "@/services/damage.service";
import { useQuery } from "@tanstack/react-query";

export const useDamageTypes = () => {
  return useQuery({
    queryKey: ["damageTypes"],
    queryFn: getDamageTypes,
  });
};
