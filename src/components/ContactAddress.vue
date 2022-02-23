<template>
  <div class="form-group-bordered">
    <label for="adress" class="form-group-bordered-label">{{
      `Adresse (${index + 1})`
    }}</label>
    <InputWithFloatingLabel
      class="mb-0.5 lg:col-span-1"
      label="Numéro de rue"
      type="number"
      :value="address.streetNumber"
      @input.stop="emitAddressUpdate('streetNumber', $event.target.value)"
    ></InputWithFloatingLabel>
    <InputWithFloatingLabel
      class="mb-0.5 lg:col-span-2"
      label="Adresse"
      type="text"
      :value="address.address1"
      @input.stop="emitAddressUpdate('address1', $event.target.value)"
    ></InputWithFloatingLabel>
    <InputWithFloatingLabel
      class="mb-0.5 lg:col-span-2"
      label="Complément adresse"
      type="text"
      :value="address.address2"
      @input.stop="emitAddressUpdate('address2', $event.target.value)"
    ></InputWithFloatingLabel>
    <InputWithFloatingLabel
      class="mb-0.5"
      label="Ville"
      type="text"
      :value="address.city"
      @input.stop="emitAddressUpdate('city', $event.target.value)"
    ></InputWithFloatingLabel>
    <InputWithFloatingLabel
      class="mb-0.5"
      label="Code postal"
      type="text"
      :value="address.postalCode"
      @input.stop="emitAddressUpdate('postalCode', $event.target.value)"
    ></InputWithFloatingLabel>
    <InputWithFloatingLabel
      class="mb-0.5"
      label="Pays"
      type="text"
      :value="address.country"
      @input.stop="emitAddressUpdate('country', $event.target.value)"
    ></InputWithFloatingLabel>
    <Select
      class="mb-0.5 w-full"
      :value="address.type"
      @input.stop="emitAddressUpdate('type', $event.target.value)"
    >
      <option v-for="{ id, label } in addressTypes" :key="id" :value="id">
        {{ label }}
      </option>
    </Select>
    <button
      class="form-group-close-btn"
      title="Retirer l'adresse"
      @click.stop="emitDelete"
    >
      Retirer
    </button>
  </div>
</template>

<script setup>
import { addressTypes } from "../store";
import { addressModel } from "../models";
const props = defineProps({
  index: Number,
  address: {
    type: Object,
    required: false,
    default() {
      return { ...addressModel };
    },
  },
});

const emit = defineEmits(["update:address", "delete:address"]);

function emitAddressUpdate(key, value) {
  let address = { ...props.address };
  address[key] = value;
  emit("update:address", address);
}

function emitDelete() {
  emit("delete:address");
}
</script>
