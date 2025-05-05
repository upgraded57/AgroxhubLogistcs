import AppLayout from "@/components/layouts/AppLayout";
import { AllCategories } from "@/lib/categories";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/deliverables/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedDeliverables, setSelectedDeliverables] = useState<
    {
      name: string;
      unitCost: number;
    }[]
  >([]);

  const handleSelectCategory = (name: string) => {
    // Check if name exists in array
    const alreadySelected = selectedDeliverables.some(
      (item) => item.name === name
    );
    if (alreadySelected) {
      const newArray = selectedDeliverables.filter(
        (item) => item.name !== name
      );
      setSelectedDeliverables(newArray);
    } else {
      setSelectedDeliverables((prev) => [...prev, { name, unitCost: 0 }]);
    }
  };

  const handleSelectAll = () => {
    // Check if all is selected
    const allSelected = AllCategories.length === selectedDeliverables.length;
    if (allSelected) {
      setSelectedDeliverables([]);
    } else {
      setSelectedDeliverables(() =>
        AllCategories.map((item) => ({ name: item.name, unitCost: 0 }))
      );
    }
  };

  const handleSetUnitCost = (categoryName: string, cost: string) => {
    setSelectedDeliverables((prev) =>
      prev.map((item) =>
        item.name === categoryName
          ? { ...item, unitCost: parseInt(cost) || 0 }
          : item
      )
    );
  };

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

    console.log(selectedDeliverables);
  };

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
            {AllCategories.length === selectedDeliverables.length
              ? "Deselect All"
              : "Select All"}
          </button>
          <button
            disabled={selectedDeliverables.length === 0}
            className="btn bg-dark-green-clr text-white font-normal border-0"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      }
    >
      <div className="list">
        {AllCategories.map((category, idx) => (
          <div className="list-row hover:bg-base-300 flex flex-col lg:flex-row gap-0 lg:gap-4 items-start lg:items-center justify-start lg:justify-between h-auto">
            <label
              className="flex items-center space-x-4 rounded-none w-full cursor-pointer"
              key={idx}
              htmlFor={category.name}
            >
              <input
                type="checkbox"
                id={category.name}
                value={category.name}
                checked={selectedDeliverables.some(
                  (item) => item.name === category.name
                )}
                onChange={() => handleSelectCategory(category.name)}
                className="checkbox checkbox-lg checkbox-success text-white border-[1px] border-grey-clr checked:border-success"
              />
              <p>{category.name}</p>
            </label>
            {selectedDeliverables.some(
              (item) => item.name === category.name
            ) && (
              <div className="w-full lg:w-max flex items-center justify-between lg:justify-start gap-4 mt-2 lg:mt-0 min-w-max">
                <p className="text-xs font-light">
                  Set your cost per KG <br /> in NGN Naira:
                </p>
                <label className="input max-w-[150px] input-sm">
                  <span className="label">NGN</span>
                  <input
                    type="number"
                    placeholder="200"
                    onChange={(e) =>
                      handleSetUnitCost(category.name, e.target.value)
                    }
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
