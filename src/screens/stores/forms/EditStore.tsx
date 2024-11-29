import ActionButton from "@/components/atoms/buttons/ActionButton";
import FileDropzone from "@/components/molecules/forms/FileDropzone";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import FormTextarea from "@/components/molecules/forms/FormTextArea";
import { Form } from "@/components/ui/form";
import { Store } from "@/global-types";
import uploadFile, { authRedirect } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { updateStoreDetails } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EditStore = (props: { data: Store, setShowModal: (show: boolean) =>void }) => {
  const [selectedLogo, setSelectedLogo] = useState<File[]>();
  const [regCert, setRegCert] = useState<File[]>();
  const [uploading, setUploading] = useState<boolean>(false);
  
  const queryClient = useQueryClient()

  const form = useForm<FieldValues>({
    defaultValues: {
      store_name: props.data.store_name,
      country: props.data.country,
      description: props.data.description,
    },
  });

  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: ['store-details', props.data.id],
    mutationFn: (data: any) => updateStoreDetails(data.id, data.data),
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ['store-details', 'stores', props.data.id,]})
      toast.success("Store updated successfully")
      setUploading(false)
      props.setShowModal(false)
    },
    onError(error: any){
      console.log(error)
      setUploading(false)
      toast.error('Could not update store')
    }
  })
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
    mutate({id: props.data.id, data: formData})
  };

  if (!props.data) return <p>Loading... </p>;
  return (
    <div>
      {isError && <p>Could not update store details</p>}
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
            loading={uploading || isPending }
          />
        </form>
      </Form>
    </div>
  );
};

export default EditStore;
