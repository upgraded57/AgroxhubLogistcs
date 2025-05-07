import {
  useUpdateAvatar,
  useUpdateProfile,
  useUpdateVisibilityStatus,
} from "@/api/profile";
import { useGetAllRegions } from "@/api/region";
import ButtonPending from "@/components/buttonPending";
import AppLayout from "@/components/layouts/AppLayout";
import { AdminContext } from "@/context/AdminProvider";
import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const user = use(AdminContext)?.user;
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChooseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(e.target.files[0]);
      setNewAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClearAvatar = () => {
    setNewAvatar(null);
    setAvatarFile(null);
  };

  const { mutateAsync: updateAvatar, isPending: isUpdatingAvatar } =
    useUpdateAvatar();

  const handleUpdloadAvatar = () => {
    if (avatarFile) {
      if (avatarFile.size > 2 * 1024 * 1024) {
        return toast.error("Upload error", {
          description: "Avatar size cannot exceed 2MB",
        });
      }
      const data = new FormData();
      data.append("avatar", avatarFile);
      updateAvatar(data).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["Profile", user?.id],
        });
        handleClearAvatar();
      });
    }
  };

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

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    const isChanged = checkChangedStatus(data);
    if (!isChanged) {
      return toast.warning("Operation Canceled", {
        description: "Your profile information has not changed",
      });
    }

    updateProfile(data).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Profile", user?.id],
      });
    });
  };

  // Check whether user has changed any field
  const checkChangedStatus = (data: any) => {
    const { name, email, address, contact, regionId } = data;

    const changes = [
      {
        key: "name",
        isChanged: name !== user?.name,
      },
      {
        key: "email",
        isChanged: email !== user?.email,
      },
      {
        key: "address",
        isChanged: address !== user?.address,
      },
      {
        key: "contact",
        isChanged: contact !== user?.contact,
      },
      {
        key: "regionId",
        isChanged: regionId ? regionId !== user?.regionId : false,
      },
    ];

    const isChanged = changes.some((item) => item.isChanged);
    return isChanged;
  };

  const {
    mutateAsync: updateProfileVisibility,
    isPending: isUpdatingProfileVisibility,
  } = useUpdateVisibilityStatus();

  const handleUpdateProfileVisibility = () => {
    updateProfileVisibility().then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Profile", user?.id],
      });
    });
  };

  return (
    <AppLayout
      title="Profile"
      subtitle="Manage and update your profile information"
    >
      {!user?.isVisible && <InvisibleInfo />}
      <div className="rounded-lg shadow p-4 mb-6 bg-white overflow-x-hidden">
        {/* Company Avatar */}
        <div className="flex items-center space-x-6 space-y-4">
          <AvatarComp user={user!} newAvatar={newAvatar} />
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Company Profile Picture</p>
              <small className="">
                Update your company logo. Max upload size - 2MB
              </small>
            </div>

            <div className="flex space-x-2">
              {newAvatar && (
                <button
                  type="button"
                  className="btn btn-sm btn-square"
                  onClick={handleClearAvatar}
                  disabled={isUpdatingAvatar}
                >
                  <Cross2Icon />
                </button>
              )}
              <label htmlFor="avatar">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  hidden
                  onChange={handleChooseAvatar}
                  accept="image/png, image/jpeg, image/jpg"
                />
                <span
                  className={`btn btn-sm ${isUpdatingAvatar && "pointer-events-none cursor-disabled"}`}
                >
                  Change
                </span>
              </label>
              {newAvatar && (
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleUpdloadAvatar}
                  disabled={isUpdatingAvatar}
                >
                  {isUpdatingAvatar && <ButtonPending />}
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="divider" />

        <form
          className="p-2 space-y-8"
          onSubmit={handleUpdateProfile}
          id="form"
        >
          {/* Name and Email */}
          <div className="lg:flex gap-6 space-y-6 lg:space-y-0 items-end">
            <label htmlFor="name" className="block w-full">
              <p className="text-sm">Display Name</p>
              <small>How your company name will appear to customers</small>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name}
                className="input input-bordered w-full mt-3"
                placeholder="e.g My Company Name"
              />
            </label>
            <label htmlFor="email" className="block w-full">
              <p className="text-sm">Email Address</p>
              <small>
                You will receive order notifications and general updates with
                this email
              </small>

              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user?.email}
                className="input input-bordered w-full mt-3"
                placeholder="e.g. mycompany@logistics.com"
              />
            </label>
          </div>

          {/* Company Location */}
          <div>
            <p className="text-sm">Company Location</p>
            <small>
              This will not appear to customers. It will help us match you with
              nearest orders
            </small>

            <div className="flex flex-col md:flex-row items-center gap-6 w-full mt-3">
              <select
                className="select select-bordered w-full"
                name="state"
                disabled={isLoadingRegions || !regions || regions?.length < 1}
                onChange={(e) =>
                  setSelectedRegion((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Lagos
                </option>
                <option value="Lagos">Lagos</option>
              </select>
              <select
                className="select select-bordered w-full"
                defaultValue=""
                name="lcda"
                disabled={isLoadingRegions || !selectedRegion.state}
                onChange={(e) =>
                  setSelectedRegion((prev) => ({
                    ...prev,
                    selectedLcda: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  {user?.region?.lcda}
                </option>
                {selectedRegion?.lcda?.map((item: string, idx: number) => (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                defaultValue=""
                name="regionId"
                disabled={isLoadingRegions || !selectedRegion.selectedLcda}
                onChange={(e) =>
                  setSelectedRegion((prev) => ({
                    ...prev,
                    selectedRegion: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  {user?.region?.name}
                </option>
                {selectedRegion?.region
                  ?.sort(
                    (a: Record<string, string>, b: Record<string, string>) =>
                      a.name.localeCompare(b.name)
                  )
                  .map((item: Record<string, string>, idx: number) => (
                    <option value={item.id} key={idx}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Company Physical Address */}
          <label htmlFor="address" className="block w-full">
            <p className="text-sm">Company Physical Address</p>
            <small>
              Your company's registered physical address. This will not appear
              to customers
            </small>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={user?.address || ""}
              className="input input-bordered w-full mt-3"
              placeholder="e.g. 24, Allen Avenue, Ikeja Lagos, Nigeria"
            />
          </label>

          {/* Phone Number and Submit Button */}
          <div className="lg:flex gap-6 items-end">
            <label htmlFor="contact" className="block w-full m-0">
              <p className="text-sm">Phone Number</p>
              <small>
                You may be contacted via SMS or whatsapp by Agroxhub. This is
                not visible to customers
              </small>
              <input
                type="tel"
                name="contact"
                id="contact"
                defaultValue={user?.contact || ""}
                className="input input-bordered w-full mt-3"
                placeholder="e.g. 09011223344"
              />
            </label>

            <button
              className="btn bg-dark-green-clr text-white mt-6 lg:mt-0 font-normal border-0"
              type="submit"
              disabled={isPending}
            >
              {isPending && <ButtonPending />}
              Save Changes
            </button>
          </div>
        </form>

        {/* Visibility Status */}
        <label
          htmlFor="visibility"
          className="flex w-full items-center justify-between space-x-6 mt-8 px-2"
        >
          <div>
            <p className="text-sm">Visibility Status</p>
            <small>
              You will not receive orders while your account is set to
              invisible. Only toggle this off if you do not want to receive
              orders
            </small>
          </div>

          <input
            type="checkbox"
            defaultChecked={user?.isVisible}
            id="visibility"
            disabled={isUpdatingProfileVisibility}
            onChange={handleUpdateProfileVisibility}
            className="toggle checked:bg-dark-green-clr checked:text-white mt-3"
          />
        </label>
      </div>
    </AppLayout>
  );
}

const AvatarComp = ({
  user,
  newAvatar,
}: {
  user: User;
  newAvatar: string | null;
}) => {
  const intitials = user?.name.split(" ");
  const firstInitials = intitials?.[0][0] || "";
  const secondInitials = intitials?.[1][0] || "";
  return newAvatar ? (
    <div className="avatar">
      <div className="w-16 rounded-full">
        <img src={newAvatar} />
      </div>
    </div>
  ) : user?.avatar ? (
    <div className="avatar">
      <div className="w-16 rounded-full">
        <img src={user.avatar} />
      </div>
    </div>
  ) : (
    <div className="avatar avatar-placeholder">
      <div className="bg-dark-green-clr text-white w-16 rounded-full">
        <span className="text-xl">{firstInitials + secondInitials}</span>
      </div>
    </div>
  );
};

const InvisibleInfo = () => {
  return (
    <div role="alert" className="alert alert-info mb-6 shadow-none text-white">
      <InfoCircledIcon />
      <p>
        Your account will not appear to customers while your account's
        visibility status is set to invisible
      </p>
    </div>
  );
};
