import AppLayout from "@/components/layouts/AppLayout";

import { AllCategories } from "@/lib/categories";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/deliverables/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>(
    []
  );

  const handleSelectCategory = (name: string) => {
    // Check if name exists in array
    const alreadySelected = selectedDeliverables.some((item) => item === name);
    if (alreadySelected) {
      const newArray = selectedDeliverables.filter((item) => item !== name);
      setSelectedDeliverables(newArray);
    } else {
      setSelectedDeliverables((prev) => [...prev, name]);
    }
  };

  const handleSelectAll = () => {
    // Check if all is selected
    const allSelected = AllCategories.length === selectedDeliverables.length;
    if (allSelected) {
      setSelectedDeliverables([]);
    } else {
      setSelectedDeliverables(() => [
        ...AllCategories.map((item) => item.name),
      ]);
    }
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
          <button className="btn bg-dark-green-clr text-white font-normal border-0">
            Save Changes
          </button>
        </div>
      }
    >
      <div className="list">
        {AllCategories.map((category, idx) => (
          <label
            className="list-row hover:bg-base-300 flex items-center space-x-4 rounded-none"
            key={idx}
            htmlFor={category.name}
          >
            <input
              type="checkbox"
              id={category.name}
              value={category.name}
              checked={selectedDeliverables.includes(category.name)}
              onChange={() => handleSelectCategory(category.name)}
              className="checkbox checkbox-lg checkbox-success text-white border-grey-clr checked:border-success"
            />
            <p>{category.name}</p>
          </label>
        ))}
      </div>
    </AppLayout>
  );
}
