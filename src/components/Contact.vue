<template>
  <div class="bg-white p-5">
    <header class="mb-8 flex flex-col items-center">
      <h2 class="mb-1 text-2xl font-bold">Création de contact</h2>
      <p class="text-xs font-light">Page de création de contact</p>
    </header>
    <div class="form-group">
      <label for="lastname" class="form-group-label">Nom</label>
      <Input type="text" class="w-full" v-model="contact.lastname" />
    </div>
    <div class="form-group">
      <label for="firstname" class="form-group-label">Prénom</label>
      <Input type="text" class="w-full" v-model="contact.firstname" />
    </div>
    <div class="form-group">
      <label
        for="firstname"
        class="form-group-label"
        :class="{ 'text-third': $v.email.$errors.length }"
        >Email</label
      >
      <Input
        type="email"
        class="w-full"
        :class="{ 'text-third border-third': $v.email.$errors.length }"
        v-model="contact.email"
      />
    </div>
    <div class="form-group">
      <label for="birthday" class="form-group-label">Date de naissance</label>
      <Input type="date" class="w-full" v-model="contact.birthday" />
    </div>
    <div class="w-full">
      <ContactAddress
        v-for="(address, index) in contact.addresses"
        :key="index"
        :index="index"
        :address="address"
        @update:address="updateAddress(index, $event)"
        @delete:address="deleteAddress(index)"
        class="mb-6 w-full last-of-type:mb-0"
      />
      <Button
        class="!bg-secondary float-right mb-6 !h-8 w-full lg:w-1/2"
        @click="addAddress"
      >
        Ajouter une adresse
      </Button>
    </div>
    <div class="w-full">
      <ContactPhone
        v-for="(phone, index) in contact.phones"
        :key="index"
        :index="index"
        :phone="phone"
        @update:phone="updatePhone(index, $event)"
        @delete:phone="deletePhone(index)"
        class="mb-6 w-full last-of-type:mb-0"
      />
      <Button
        class="!bg-secondary float-right mb-6 !h-8 w-full lg:w-1/2"
        @click="addPhone"
      >
        Ajouter un téléphone
      </Button>
      <Button class="mb-6 h-10 w-full" @click="save"> Enregistrer </Button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { getPhoneAndAddressTypes } from "../api/contact-api";
import { getCountryCodes } from "../api/country-code-api";
import { saveContact } from "../api/saving-api";
import * as store from "../store";
import { contactModel, addressModel, phoneModel } from "../models";
import useVuelidate from "@vuelidate/core";
import { email } from "@vuelidate/validators";

const contact = reactive({ ...contactModel });

const rules = {
  email: {
    email,
  },
};

const $v = useVuelidate(rules, contact);

function updateAddress(addressIndex, address) {
  let addresses = [...contact.addresses];
  addresses[addressIndex] = address;
  contact.addresses = addresses;
}

function addAddress() {
  contact.addresses = [...contact.addresses, { ...addressModel }];
}

function deleteAddress(addressIndex) {
  let addresses = [...contact.addresses];
  addresses.splice(addressIndex, 1);
  contact.addresses = addresses;
}

function updatePhone(phoneIndex, phone) {
  let phones = [...contact.phones];
  phones[phoneIndex] = phone;
  contact.phones = phones;
}

function addPhone() {
  contact.phones = [...contact.phones, { ...phoneModel }];
}

function deletePhone(phoneIndex) {
  let phones = [...contact.phones];
  phones.splice(phoneIndex, 1);
  contact.phones = phones;
}

function setPhoneTypes(phoneTypes) {
  store.phoneTypes.value = phoneTypes;
}

function setAddressTypes(addressTypes) {
  store.addressTypes.value = addressTypes;
}

function setCountryCodes(countryCodes) {
  store.countryCodes.value = countryCodes;
}

function save() {
  $v.value.$touch();
  if (!$v.value.$invalid) {
    saveContact(contact);
  }
}

onMounted(async () => {
  let countryCodes = await getCountryCodes();
  setCountryCodes(countryCodes);

  let { phoneTypes, addressTypes } = await getPhoneAndAddressTypes();
  setPhoneTypes(phoneTypes);
  setAddressTypes(addressTypes);

  const hasAddress = contact.addresses.length > 0;
  const hasPhoneNumber = contact.phones.length > 0;
  if (!hasAddress) addAddress();
  if (!hasPhoneNumber) addPhone();
});
</script>
