import {
  useGetAllCategories,
  useGetDeliverables,
  useUpdateDeliverables,
} from "@/api/deliverable";
import AppLayout from "@/components/layouts/appLayout";
import Pending from "@/components/pending";
import { useQueryClient } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/deliverables/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: deliverables, isLoading } = useGetDeliverables();
  const { data: AllCategories, isLoading: isLoadingAllCategories } =
    useGetAllCategories();

  const [selectedDeliverables, setSelectedDeliverables] = useState<
    {
      id: string;
      name: string;
      unitCost: number;
    }[]
  >([]);

  // Set initial deliverable
  useEffect(() => {
    if (AllCategories && deliverables) {
      setSelectedDeliverables((prev) => {
        const existingDeliverables = deliverables.map((item) => ({
          id: item.categoryId,
          name: item.categoryName,
          unitCost: parseInt(item.unitCost),
        }));

        return [...prev, ...existingDeliverables];
      });
    }
  }, [AllCategories, deliverables]);

  const handleSelectCategory = (id: string) => {
    // Check if name exists in array
    const alreadySelected = selectedDeliverables.some((item) => item.id === id);
    if (alreadySelected) {
      const newArray = selectedDeliverables.filter((item) => item.id !== id);
      setSelectedDeliverables(newArray);
    } else {
      const selected = AllCategories?.find((item) => item.id === id);
      if (selected) {
        setSelectedDeliverables((prev) => [
          ...prev,
          { id, name: selected.name, unitCost: 0 },
        ]);
      }
    }
  };

  const handleSelectAll = () => {
    // Check if all is selected
    const allSelected = AllCategories?.length === selectedDeliverables.length;
    if (allSelected) {
      setSelectedDeliverables([]);
    } else {
      setSelectedDeliverables((prev) => {
        if (AllCategories) {
          return AllCategories.map((item) => ({
            name: item.name,
            unitCost: 0,
            id: item.id,
          }));
        } else return prev;
      });
    }
  };

  const handleSetUnitCost = (id: string, cost: string) => {
    setSelectedDeliverables((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unitCost: parseInt(cost) || 0 } : item
      )
    );
  };

  const { mutateAsync: updateDeliverables, isPending } =
    useUpdateDeliverables();

  const handleSubmit = () => {
    // Check if all unit costs are properly set
    let isError: boolean = false;
    selectedDeliverables.some((item) => {
      if ((item.name && !item.unitCost) || (item.name && item.unitCost === 0)) {
        // Alert here
        isError = true;
      }
    });

    if (isError) {
      toast.warning("Operation Incomplete", {
        description: "Enter the unit cost for every selected deliverable",
      });

      return;
    }

    updateDeliverables(selectedDeliverables).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Deliverables"],
      });
    });
  };

  const areIdentical = () => {
    if (deliverables?.length !== selectedDeliverables.length) return false;

    const normalizedA = deliverables
      .map((item) => ({
        id: item.categoryId,
        unitCost: parseInt(item.unitCost),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

    const normalizedB = [...selectedDeliverables].sort((a, b) =>
      a.id.localeCompare(b.id)
    );

    return normalizedA.every(
      (a, index) =>
        a.id === normalizedB[index].id &&
        a.unitCost === normalizedB[index].unitCost
    );
  };

  const isNotChanged = areIdentical();

  return (
    <AppLayout
      title="Deliverables"
      subtitle="Manage your deliverables here. You will only receive delivery updates for categories selected"
      actions={
        <div className="flex items-center space-x-4">
          <button
            className="btn bg-white font-normal"
            onClick={handleSelectAll}
          >
            <span className="text-grey-clr`">
              ({selectedDeliverables.length}){" "}
            </span>
            {AllCategories?.length === selectedDeliverables.length
              ? "Deselect All"
              : "Select All"}
          </button>
          <button
            disabled={
              isPending || selectedDeliverables.length === 0 || isNotChanged
            }
            className="btn bg-dark-green-clr text-white font-normal border-0"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      }
    >
      {isLoadingAllCategories || isLoading ? (
        <Pending />
      ) : (
        <div className="list">
          {AllCategories?.map((category, idx) => {
            const selected = selectedDeliverables.find(
              (item) => item.id === category.id
            );
            const unitCost = selected ? selected.unitCost : 0;
            return (
              <div className="list-row hover:bg-base-300 flex flex-col lg:flex-row gap-0 lg:gap-4 items-start lg:items-center justify-start lg:justify-between h-auto">
                <label
                  className="flex items-center space-x-4 rounded-none w-full cursor-pointer"
                  key={idx}
                  htmlFor={category.id}
                >
                  <input
                    type="checkbox"
                    id={category.id}
                    value={category.id}
                    checked={selectedDeliverables.some(
                      (item) => item.id === category.id
                    )}
                    onChange={() => handleSelectCategory(category.id)}
                    className="checkbox checkbox-lg checkbox-success text-white border-[1px] border-grey-clr checked:border-success"
                  />
                  <p>{category.name}</p>
                </label>
                {selectedDeliverables.some(
                  (item) => item.id === category.id
                ) && (
                  <div className="w-full lg:w-max flex items-center justify-between lg:justify-start gap-4 mt-2 lg:mt-0 min-w-max">
                    <small>
                      Set your cost per KG <br /> in NGN Naira:
                    </small>
                    <label className="input max-w-[150px] input-sm">
                      <span className="label">NGN</span>
                      <input
                        type="number"
                        placeholder="200"
                        min={1}
                        onFocus={(e) => e.target.select()}
                        defaultValue={unitCost}
                        onChange={(e) =>
                          handleSetUnitCost(category.id, e.target.value)
                        }
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
