"use client"
import FormInput from "@/components/molecules/forms/FormInput"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import usePlacesAutocomplete, {GeoReturn, getGeocode, getLatLng} from 'use-places-autocomplete'


const CreateBranchForm = () => {
    const [selected, setSelected] = useState(null)

    const form = useForm()

    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()
    return(
<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <div>
            <h2>
                Create store form
            </h2>
            <div>
                <Form {...form}>
                    <form>
                        <FormInput control={form.control} name="name" label="Branch Name" placeholder="Enter store branch excact name"/>
                        <FormInput control={form.control} name="location" label="Branch location" placeholder="Enter branch location"/>
                        <PlacesAutocomplete setSelected={setSelected}/>
                        <Map
      style={{width: '70vw', height: '70vh'}}
      defaultCenter={selected ?? {lat: 0.0236, lng: 37.9062}}
      defaultZoom={10}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
    {selected && <Marker position={selected}/>}
                    </form>
                </Form>
            </div>
        </div>
        </APIProvider>
    )
}

export default CreateBranchForm

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";

const PlacesAutocomplete = ({setSelected}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({ callbackName: "placesloaded" });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleSelect = async (val: string) => {
    setValue(val, false);
    const results = await getGeocode({address: val})

    const {lat, lng} = getLatLng(results[0])
    setSelected({lat, lng})
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <Input value={value} onChange={handleInput} disabled={!ready} />
      <ComboboxInput value={value} onChange={handleInput} disabled />
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