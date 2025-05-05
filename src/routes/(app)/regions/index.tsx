import AppLayout from "@/components/layouts/AppLayout";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGetAllRegions, useGetServiceRegions } from "@/api/region";

export const Route = createFileRoute("/(app)/regions/")({
  component: RouteComponent,
});

function groupByLCDA(data: Region[]) {
  if (data) {
    const grouped = data.reduce((acc: any, item) => {
      if (!acc[item.lcda]) {
        acc[item.lcda] = [];
      }
      acc[item.lcda].push(item);
      return acc;
    }, {});

    // Convert the grouped object into an array
    return Object.keys(grouped).map((lcda) => ({
      lcda,
      locations: grouped[lcda] as Region[],
    }));
  }
}

function RouteComponent() {
  const { data: allRegions } = useGetAllRegions();
  const { data: serviceRegions } = useGetServiceRegions();

  const groupedItems = groupByLCDA(allRegions);
  const [activeLcda, setActiveLcda] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<
    {
      lcda: string;
      regionId: string;
    }[]
  >([]);

  const handleSelectRegion = (lcda: string, regionId: string) => {
    // Check if entry is in array
    const regionSelected = selectedRegions.some(
      (item) => item.lcda === lcda && item.regionId === regionId
    );

    if (regionSelected) {
      const newArray = selectedRegions.filter(
        (item) => item.regionId !== regionId
      );
      setSelectedRegions(newArray);
      return;
    }

    setSelectedRegions((prev) => [
      ...prev,
      {
        lcda,
        regionId,
      },
    ]);
  };

  const handleSelectAll = (lcda: string) => {
    // step 1. remove all item with lcda from selected regions array.
    // step 2. pick all regions under lcda from groupedItems array
    // step 3. push all regions to selected regions array
    const newArray = selectedRegions.filter((region) => region.lcda !== lcda);
    const regions = groupedItems?.filter((item) => item.lcda === lcda)[0];
    regions?.locations.forEach((region) => {
      newArray.push({
        lcda,
        regionId: region.id,
      });
    });

    setSelectedRegions(newArray);
  };

  const handleDeselectAll = (lcda: string) => {
    const newArray = selectedRegions.filter((region) => region.lcda !== lcda);
    setSelectedRegions(newArray);
  };

  const handleUpdateServiceRegions = () => {
    const selectedRegionsIds = selectedRegions.map((item) => item.regionId);
    console.log(selectedRegionsIds);
  };

  return (
    <AppLayout
      title="Service Regions"
      subtitle="Update your service regions. Click a region to select/deselect it"
      actions={
        <button
          className="btn bg-dark-green-clr text-white font-normal border-0"
          onClick={handleUpdateServiceRegions}
        >
          Save Changes
        </button>
      }
    >
      <>
        {groupedItems?.map((item, idx) => {
          const selectedCount = selectedRegions.filter(
            (region) => region.lcda === item.lcda
          ).length;

          const totalCount = groupedItems?.filter(
            (region) => region.lcda === item.lcda
          )[0].locations.length;

          const allSelected =
            groupedItems?.filter((region) => region.lcda === item.lcda)[0]
              .locations.length === selectedCount;
          return (
            <div className="border-b-[1px] border-b-base-300" key={idx}>
              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span
                    className="btn btn-square btn-sm"
                    onClick={() => {
                      activeLcda === item.lcda
                        ? setActiveLcda("")
                        : setActiveLcda(item.lcda);
                    }}
                  >
                    {activeLcda === item.lcda ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )}
                  </span>
                  <span className="space-x-4 flex flex-col lg:flex-row lg:items-center">
                    <p className="text-sm">{item.lcda}</p>
                    <p className="text-sm text-grey-clr font-light">
                      ({selectedCount} of {totalCount} regions Selected)
                    </p>
                  </span>
                </div>

                <label className="flex items-center space-x-4 cursor-pointer">
                  <p className="text-xs">
                    {allSelected ? "Deselect All" : "Select All"}
                  </p>

                  <input
                    type="checkbox"
                    checked={allSelected}
                    className="toggle toggle-xs checked:text-white checked:bg-dark-green-clr"
                    onChange={() =>
                      allSelected
                        ? handleDeselectAll(item.lcda)
                        : handleSelectAll(item.lcda)
                    }
                  />
                </label>
              </div>

              {activeLcda === item.lcda && (
                <div className="bg-white p-4 pb-0 shadow rounded-lg mb-4 mt-2 flex flex-wrap space-x-4 space-y-4">
                  {item.locations.map((item, idx) => {
                    const isSelected = selectedRegions.some(
                      (region) => region.regionId === item.id
                    );

                    return (
                      <div
                        className={`badge rounded-full text-xs font-light cursor-pointer ${isSelected ? "bg-dark-green-clr text-white border-dark-green-clr" : "hover:bg-base-300 border-base-300 "}`}
                        key={idx}
                        onClick={() => handleSelectRegion(item.lcda, item.id)}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </>
    </AppLayout>
  );
}
