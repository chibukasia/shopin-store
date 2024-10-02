import ActionButton from "@/components/atoms/buttons/ActionButton";
import FileDropzone from "@/components/molecules/forms/FileDropzone";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import FormTextarea from "@/components/molecules/forms/FormTextArea";
import { Form } from "@/components/ui/form";
import { Store } from "@/global-types";
import uploadFile from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { updateStoreDetails } from "../api";

const EditStore = (props: { data: Store, setShowModal: (show: boolean) =>void }) => {
  const [selectedLogo, setSelectedLogo] = useState<FileList>();
  const [regCert, setRegCert] = useState<FileList>();
  const [uploading, setUploading] = useState<boolean>(false);
  const form = useForm<FieldValues>({
    defaultValues: {
      store_name: props.data.store_name,
      country: props.data.country,
      description: props.data.description,
    },
  });

  const onSubmit = async (data: any) => {
    setUploading(true)
    let logo_url
    let cert_url
    if(selectedLogo){
      const logo = await uploadFile(selectedLogo)
      logo_url = logo
    }
    
    if(regCert){
      const url = await uploadFile(regCert)
      cert_url = url
    }

    const formData = {
      ...data,
      logo: logo_url ?? props.data.logo,
      documents: cert_url ? [cert_url]: [props.data.documents[0]]
    }
    updateStoreDetails(props.data.id, formData).then(() =>{
      props.setShowModal(false)
    }).catch(error=> console.log(error)).finally(() =>setUploading(false))
  };

  if (!props.data) return <p>Loading... </p>;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 ">
          <FormInput
            label="Store Name"
            control={form.control}
            {...form.register("store_name")}
          />
          <FormSelect
            {...form.register("country")}
            label="Country"
            control={form.control}
            items={[
              { label: "Kenya", value: "Kenya" },
              { label: "Uganda", value: "Uganda" },
              { label: "Tanzania", value: "Tanzania" },
              { label: "Rwanda", value: "Rwanda" },
            ]}
          />
          <FormTextarea
            control={form.control}
            label="Store description"
            {...form.register("description")}
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
            <Image
              src={props.data.logo}
              width={50}
              height={50}
              alt={props.data.store_name}
              className="border rounded-lg hover:brightness-50"
            />
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
            title="Edit Store"
            type="submit"
            loaderText="Edititng store..."
            loading={uploading || false}
          />
        </form>
      </Form>
    </div>
  );
};

export default EditStore;
