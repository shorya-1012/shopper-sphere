"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/button";
import { Category } from "@prisma/client";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/lib/uploadthing";
import {
  AddProductPayload,
  ImageArray,
} from "@/lib/apiValidators/addProductValidator";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  categories: Category[];
};

const AddProductForm = ({ categories }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ImageArray[]>([]);

  const { mutate: addProduct, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: AddProductPayload = {
        name: productName,
        price: price,
        category: category,
        description: description,
        images: images,
      };

      const { data } = await axios.post("/api/products/add", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          toast({
            variant: "destructive",
            title: "Couldn't add product",
            description: "Product name should contain atleast 3 character",
          });
          return;
        }
        if (err.response?.status === 401) {
          router.push("/");
          return;
        }
        toast({
          variant: "destructive",
          title: "Couldn't add product",
          description: "Some error occured while adding product",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product Added Successfully",
      });
      router.push("/");
    },
  });

  return (
    <div className="min-h-screnn w-screen overflow-hidden flex flex-col py-5 justify-center items-center">
      <div className="flex flex-col shadow-2xl rounded-xl w-[450px] md:w-[700px] p-5">
        <div className="flex flex-col my-5 w-full font-nunito">
          <Label className="mb-2 text-lg">Product Name</Label>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-[70%] lg:w-[90%] h-[35px] rounded"
            placeholder="Enter product name"
          />
        </div>
        <div className="flex flex-col my-3 w-full">
          <Label className="mb-2 text-lg">Price (in ₹) </Label>
          <Input
            value={price}
            type="number"
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-[70%] lg:w-[90%] h-[35px] rounded"
            placeholder="Enter your Product's price"
          />
        </div>
        <div className="flex flex-col my-5 w-full">
          <Label className="mb-2 text-lg">
            Select Category For your Product
          </Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[70%] lg:w-[90%] h-[35px] border-[1px] border-zinc-900 rounded"
          >
            <option value={""} disabled={true}>
              --Select a Category--
            </option>
            {categories.map((category) => {
              return (
                <option
                  className="py-2 mx-1 h-[40px] "
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col my-3 w-full">
          <Label className="mb-2 text-lg">Description of your product</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[70%] lg:w-[90%] rounded"
            rows={5}
            placeholder="Add description of your product"
          />
        </div>
        <div className="flex flex-col my-3 w-full items-start">
          <Label className="mb-2 text-lg">
            {images.length === 2
              ? "Maximum Image Uploaded"
              : "Upload Images of your product"}
          </Label>
          {images.length !== 2 && (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (!res) throw new Error("Error");
                setImages((prev) => [...prev, { imageURL: res[0].fileUrl }]);
                toast({
                  title: "Success",
                  description: "Image Added Successfully",
                });
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>
        <Button
          variant={"outline"}
          className="rounded hover:bg-zinc-200 my-3"
          disabled={isLoading}
          onClick={() => addProduct()}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={"10px"} />
              <p>Adding</p>
            </div>
          ) : (
            "Add Product"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddProductForm;
