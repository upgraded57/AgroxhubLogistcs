import { Cross2Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState, type Dispatch, type SetStateAction } from "react";

export default function OrderTable({ products }: { products: Product[] }) {
  const [images, setImages] = useState<Array<string>>([])

  const handleShowModal = (type: "images") => {
    const modalId = type === "images"? "imagesModal" : ""
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.showModal();
  };

  const handleCloseModal = (type: "images") => {
    const modalId = type === "images"? "imagesModal" : ""
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-sm table-pin-rows">
          <thead>
            <tr>
              <th className="font-medium">Product</th>
              <th className="font-medium">Quantity</th>
              <th className="font-medium">Unit Weight</th>
              <th className="font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="hover:bg-light-grey-clr">
                <td className="w-full">{product.name}</td>
                <td className="w-max text-nowrap">
                  {product.quantity} {product.unit}
                </td>
                <td className="w-max text-nowrap">{product.unit}</td>
                <td className="w-max">
                  <div className="dropdown dropdown-left dropdown-center">
                    <div tabIndex={0} role="button">
                      <button className="btn btn-sm btn-ghost btn-square">
                        <DotsVerticalIcon />
                      </button>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content bg-base-100 menu rounded-box z-1 w-max p-2 shadow-sm border-[1px] border-base-300"
                    >
                      <li>
                        <button className="btn btn-ghost font-normal w-max" onClick={() => {
                            setImages(product.images)
                            handleShowModal("images")
                          }}
                        >
                          View Product Images
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ImageViewerModal 
          onClose = {() => handleCloseModal("images")} 
          images = {images}
          setImages = {setImages}
        />
    </>
  );
}

const ImageViewerModal = ({
  onClose,
  images,
  setImages
}: {
  onClose: () => void;
  images: Array<string>;
  setImages: Dispatch<SetStateAction<Array<string>>>
}) => {
  
  const [current, setCurrent] = useState(0)

  const handleClose = () => {
    if (window.location.hash && window.location.hash.includes("item")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setCurrent(0)
    onClose()
    setImages([])
  };

  return (
    <dialog id="imagesModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-lg">Product Images</h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={handleClose}
          >
            <Cross2Icon />
          </button>
        </div>

        <div className="carousel gap-4 w-full rounded-lg overflow-hidden">
          {images.map((img, idx) => (
            <div id={`item${idx}`} className="carousel-item w-full overflow-hidden h-[400px] skeleton">
              <img
                src={img}
                className="w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          {images.map((_, idx) => (
            <a href={`#item${idx}`} className={`btn btn-xs ${idx === current && "bg-dark-green-clr text-white"}`} onClick={() => setCurrent(idx)}>{idx + 1}</a>
          ))}
        </div>
      </div>
    </dialog>
  );
};

