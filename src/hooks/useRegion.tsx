import { useGetAllRegions } from "@/api/region";
import { useEffect, useState } from "react";

export default function useRegion() {
  const { isLoading: isLoadingRegions, data: regions } = useGetAllRegions();
  const [selectedRegion, setSelectedRegion] = useState<{
    state: any;
    lcda: any;
    selectedLcda: any;
    region: any;
    selectedRegion: any;
  }>({
    state: null,
    lcda: null,
    selectedLcda: null,
    region: null,
    selectedRegion: null,
  });

  // Set selected lcda
  useEffect(() => {
    if (regions) {
      const selected = [...new Set(regions.map((region) => region.lcda))];

      setSelectedRegion((prev) => ({
        ...prev,
        lcda: selected,
      }));
    }
  }, [selectedRegion.state]);

  // Set selected region
  useEffect(() => {
    if (selectedRegion.selectedLcda) {
      const selected = regions?.filter(
        (item) => item.lcda === selectedRegion.selectedLcda
      );

      setSelectedRegion((prev) => ({
        ...prev,
        region: selected,
      }));
    }
  }, [selectedRegion.selectedLcda]);
  return { isLoadingRegions, regions, selectedRegion, setSelectedRegion };
}
