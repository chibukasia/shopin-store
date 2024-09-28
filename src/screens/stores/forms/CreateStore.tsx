"use client";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FileDropzone from "@/components/molecules/forms/FileDropzone";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import FormTextarea from "@/components/molecules/forms/FormTextArea";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import uploadFile from "@/utils";
import { createStore } from "../api";
import { useRouter } from "next/navigation";

const storeSchema = z.object({
  store_name: z
    .string({ required_error: "Store name required" })
    .min(3, { message: "Store name too short" })
    .max(50, { message: "Store name too long" }),
  country: z.string({ required_error: "Country required" }),
  logo: z
    .instanceof(FileList, { message: "Store logo is required" })
    .optional(),
  description: z
    .string({ required_error: "Store description is required" })
    .min(50, { message: "Store description too short" }),
  documents: z
    .instanceof(FileList, { message: "Upload at least one dociment" })
    .optional(),
});
const CreateStoreScreen = () => {
  const [selectedLogo, setSelectedLogo] = useState<FileList>();
  const [regCert, setRegCert] = useState<FileList>();
  const [uploading, setUploading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(storeSchema),
  });

  const router = useRouter()
  const onSubmit = async (data: any) => {
    setUploading(true);
    if (!selectedLogo || !regCert) return;
    const logo_url = await uploadFile(selectedLogo);
    const reg_cert_url = await uploadFile(regCert);

    if (logo_url && reg_cert_url) {
      
      const formData = {
        ...data,
        logo: logo_url,
        documents: [reg_cert_url],
      };

      createStore(formData).then((data) =>{
        router.push('/stores')
      }).catch(error=>{
        if (error.response) {
          if (error.response.status === 401) {
            // alert(pathname)
            router.push("/signin");
            return;
          }

          console.log(error);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }).finally(() => setUploading(false))
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3">
          <FormInput
            name="store_name"
            label="Store Name"
            control={form.control}
            placeholder="Enter store name"
          />
          <FormSelect
            name="country"
            label="Country"
            control={form.control}
            placeholder="Select country..."
            items={[
              { label: "Kenya", value: "Kenya" },
              { label: "Uganda", value: "Uganda" },
              { label: "Tanzania", value: "Tanzania" },
              { label: "Rwanda", value: "Rwanda" },
            ]}
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="Store description"
            placeholder="Describe your store"
          />
          <div>
            <FileDropzone
              control={form.control}
              name="logo"
              label="Store Logo"
              setAcceptedFiles={setSelectedLogo}
              multiple={false}
              accept={{ "image/png": [".png", ".jpeg", ".jpg"] }}
            />
            {selectedLogo && selectedLogo[0].name}
          </div>
          <div>
            <FileDropzone
              control={form.control}
              name="documents"
              label="Registration certificate or Licence"
              description="Upload either a business registration certificate or licence"
              multiple={false}
              setAcceptedFiles={setRegCert}
              accept={{ "application/pdf": [".pdf"] }}
            />
            <p>{regCert && regCert[0].name}</p>
          </div>

          <ActionButton
            title="Create Store"
            type="submit"
            loaderText="Creating store..."
            loading={uploading || false}
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateStoreScreen;
