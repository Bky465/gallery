'use client'
import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer"
];

export default function Dropdown () {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className="flex items-center justify-center p-12 ">
        
    </div>
  );
}
