import ActionButton from "@/components/atoms/buttons/ActionButton"
import FileDropzone from "@/components/molecules/forms/FileDropzone"
import FormInput from "@/components/molecules/forms/FormInput"
import FormSelect from "@/components/molecules/forms/FormSelect"
import FormTextarea from "@/components/molecules/forms/FormTextArea"
import { Form } from "@/components/ui/form"
import { useState } from "react"
import {useForm } from "react-hook-form"

const EditStore = () => {
    const [selectedLogo, setSelectedLogo] = useState<FileList>();
  const [regCert, setRegCert] = useState<FileList>();
  const [uploading, setUploading] = useState<boolean>(false);
    const form = useForm({
    })

    const onSubmit = (data: any) => {

    }
    return(
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 ">
          <FormInput
            
            {...form.register("store_name")}
          />
          <FormSelect
            {...form.register("country")}
            items={[
              { label: "Kenya", value: "Kenya" },
              { label: "Uganda", value: "Uganda" },
              { label: "Tanzania", value: "Tanzania" },
              { label: "Rwanda", value: "Rwanda" },
            ]}
          />
          <FormTextarea
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
    )
}

export default EditStore