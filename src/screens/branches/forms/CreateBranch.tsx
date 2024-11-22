"use client";
import FormInput from "@/components/molecules/forms/FormInput";
import { Form } from "@/components/ui/form";
import { useForm, UseFormSetValue } from "react-hook-form";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { ChangeEvent, useEffect, useState } from "react";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FormTextarea from "@/components/molecules/forms/FormTextArea";
import FormSelect from "@/components/molecules/forms/FormSelect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { branchSchema } from "./branch-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { counties } from "@/utils/data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserStores } from "@/screens/stores/api";
import { createBranch, fetchBranchAdmins } from "../api";
import { BranchFormData } from "../types";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const hours = [
  { label: "00:00", value: "00:00" },
  { label: "01:00", value: "01:00" },
  { label: "02:00", value: "02:00" },
  { label: "03:00", value: "03:00" },
  { label: "04:00", value: "04:00" },
  { label: "05:00", value: "05:00" },
  { label: "06:00", value: "06:00" },
  { label: "07:00", value: "07:00" },
  { label: "08:00", value: "08:00" },
  { label: "09:00", value: "09:00" },
  { label: "10:00", value: "10:00" },
  { label: "11:00", value: "11:00" },
  { label: "12:00", value: "12:00" },
  { label: "13:00", value: "13:00" },
  { label: "14:00", value: "14:00" },
  { label: "15:00", value: "15:00" },
  { label: "16:00", value: "16:00" },
  { label: "17:00", value: "17:00" },
  { label: "18:00", value: "18:00" },
  { label: "19:00", value: "19:00" },
  { label: "20:00", value: "20:00" },
  { label: "21:00", value: "21:00" },
  { label: "22:00", value: "22:00" },
  { label: "23:00", value: "23:00" },
];

const CreateBranchForm = () => {
  const [selected, setSelected] = useState({ lat: 0.0236, lng: 37.9062 });
  const [scheduleType, setScheduleType] = useState<string>("all day");

  const { data: stores, isLoading: storesLoading } = useQuery({
    queryKey: [],
    queryFn: () => fetchUserStores(),
  });
  const { data: branchAdmins, isLoading: branchAdminsLoading } = useQuery({
    queryKey: ["branch-admins"],
    queryFn: fetchBranchAdmins,
  });

  const {mutate, isPending} = useMutation({
    mutationKey: ['branch'],
    mutationFn: (data: BranchFormData) => createBranch(data),
    onSuccess(data, variables, context) {
        console.log(data)
    },
    onError(error, variables, context) {
        console.log(error)
    },
  })

  const form = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      town: '',
      description: '',
    }
  });

  useEffect(() => {
    const address = form.getValues("address");
    if (address) {
      form.clearErrors("address");
    }
  }, [form, selected]);

  useEffect(() => {
    if (scheduleType === "all day") {
      form.setValue("monday_opens", "00:00");
      form.setValue("monday_closes", "00:00");
      form.setValue("tuesday_opens", "00:00");
      form.setValue("tuesday_closes", "00:00");
      form.setValue("wednesday_opens", "00:00");
      form.setValue("wednesday_closes", "00:00");
      form.setValue("thursday_opens", "00:00");
      form.setValue("thursday_closes", "00:00");
      form.setValue("friday_opens", "00:00");
      form.setValue("friday_closes", "00:00");
      form.setValue("saturday_opens", "00:00");
      form.setValue("saturday_closes", "00:00");
      form.setValue("sunday_opens", "00:00");
      form.setValue("sunday_closes", "00:00");
    }
  }, [form, scheduleType])
  
  const onSubmit = (data: z.infer<typeof branchSchema>) => {

    const formData = {
      branch_name: data.branch_name,
      county_or_province: data.county_or_province,
      address: data.address,
      town: data.town,
      description: data.description,
      user_id: data.branch_admin,
      store_id: data.store,
      operational_hours: 
        {
          monday_opens: data.monday_opens,
          monday_closes: data.monday_closes,
          tuesday_opens: data.tuesday_opens,
          tuesday_closes: data.tuesday_closes,
          wednesday_opens: data.wednesday_opens,
          wednesday_closes: data.wednesday_closes,
          thursday_opens: data.thursday_opens,
          thursday_closes: data.thursday_closes,
          friday_opens: data.friday_opens,
          friday_closes: data.friday_closes,
          saturday_closes: data.saturday_closes,
          saturday_opens: data.saturday_opens,
          sunday_opens: data.sunday_opens,
          sunday_closes: data.saturday_closes,
        }
    }
    mutate(formData);
  };
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Create store </h2>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="md:flex gap-2 w-full">
                <div className="md:w-1/2">
                  <FormInput
                    control={form.control}
                    name="branch_name"
                    label="Branch Name"
                    placeholder="Enter store branch excact name"
                  />
                </div>
                <div className="md:w-1/2">
                  <FormSelect
                    control={form.control}
                    items={counties.map((county) => ({
                      label: county.name,
                      value: county.name,
                    }))}
                    name="county_or_province"
                    label="County"
                    placeholder="Select branch county"
                  />
                </div>
              </div>

              <div className="md:flex gap-2 w-full">
                <div className="md:w-1/2">
                  <FormSelect
                    items={
                      (branchAdmins &&
                        branchAdmins.map((admin) => ({
                          label: admin.name,
                          value: admin.id,
                        }))) ?? [
                        { label: "John Does", value: "738h8r-fvrf4-r42-f" },
                      ]
                    }
                    control={form.control}
                    name="branch_admin"
                    label={
                      <p>
                        Select Branch Manager/Admin (
                        <span className="text-xs italic">
                          Create a branch admin first
                        </span>
                        )
                      </p>
                    }
                    placeholder="Select the branch manager/admin"
                  />
                </div>
                <div className="md:w-1/2">
                  <FormSelect
                    items={
                      (stores &&
                        stores?.map((store) => ({
                          label: store.store_name,
                          value: store.id,
                        }))) ??
                      []
                    }
                    control={form.control}
                    name="store"
                    label={
                      <p>
                        Select Store (
                        <span className="text-xs italic">
                          Create a store first if empty
                        </span>
                        )
                      </p>
                    }
                    placeholder="Select store to associate with branch"
                  />
                </div>
              </div>
              <div className="md:flex gap-2 w-full">
                <div className="md:w-1/2 space-y-2">
                  <PlacesAutocomplete
                    setSelected={setSelected}
                    setAddress={form.setValue}
                    error={form.formState.errors.address?.message}
                  />
                  <FormInput
                    control={form.control}
                    name="town"
                    label={"Town (Optional)"}
                  />
                  <FormTextarea
                    control={form.control}
                    name="description"
                    label="Branch description (Optional)"
                    placeholder="Give brief description  of the branch"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="py-3">
                    <p>Branch Operation Hours</p>
                    <RadioGroup
                      defaultValue="all day"
                      onValueChange={(value) => setScheduleType(value)}
                      className="py-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all day" id="all-day" />
                        <Label htmlFor="all-day">
                          24/7 - All day and night
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom">Custom</Label>
                      </div>
                    </RadioGroup>
                    {scheduleType === "custom" ? (
                      <div className="grid px-4">
                        {days.map((day) => (
                          <div
                            className="flex w-80 justify-between items-center"
                            key={day}
                          >
                            <p>{day}</p>
                            <div className="flex gap-3">
                              <FormSelect
                                control={form.control}
                                name={`${day.toLowerCase()}_opens`}
                                items={hours}
                              />
                              <FormSelect
                                control={form.control}
                                name={`${day.toLowerCase()}_closes`}
                                items={hours}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex justify-center py-4">
                <ActionButton
                  type="submit"
                  title="Submit"
                  loading={isPending}
                  loaderText="Submitting..."
                  width="w-64"
                />
              </div>

              <div className="flex justify-center">
                <div className="mt-4">
                  <Map
                    key={selected.lng + selected.lat}
                    className="sm:w-screen lg:w-[90vw] sm:h-80 lg:h-[60vh]"
                    defaultCenter={selected}
                    defaultZoom={10}
                    zoom={10}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                  >
                    {selected && <Marker position={selected} />}
                  </Map>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </APIProvider>
  );
};

export default CreateBranchForm;

interface ComboProps {
  setSelected: (selected: { lng: number; lat: number }) => void;
  setAddress: UseFormSetValue<any>;
  error?: string;
}
const PlacesAutocomplete = (props: ComboProps) => {
  const { setSelected, setAddress, error } = props;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ callbackName: "placesloaded" });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (val: string) => {
    setValue(val, false);
    const results = await getGeocode({ address: val });

    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng });
    setAddress("address", val);
    clearSuggestions();
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <p className="pb-2">
        Branch Address (
        <span className="text-xs italic">
          Select from suggestion for accurate proximity
        </span>
        )
      </p>

      <ComboboxInput
        // {...field}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        className="focus:ring-purple-500 focus:border-primary w-full border border-muted rounded-lg p-2"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
