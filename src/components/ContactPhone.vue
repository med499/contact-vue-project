<template>
  <div class="form-group-bordered">
    <label for="adress" class="form-group-bordered-label">{{
      `Téléphone (${index + 1})`
    }}</label>

    <div class="flex items-center justify-center">
      <Select
        :value="phone.code"
        @input.stop="emitPhoneUpdate('code', $event.target.value)"
        class="flex w-20 items-center justify-center rounded-r-none"
      >
        <option v-for="{ code } in countryCodes" :key="code" :value="code">
          {{ code }}
        </option>
      </Select>
      <div class="flex w-full items-center justify-center">
        <InputWithFloatingLabel
          class="w-full rounded-l-none border-l-0"
          label="Numéro"
          type="number"
          :value="phone.number"
          @input.stop="emitPhoneUpdate('number', $event.target.value)"
        ></InputWithFloatingLabel>
      </div>
    </div>
    <Select
      :value="phone.type"
      @input.stop="emitPhoneUpdate('type', $event.target.value)"
      class="w-full"
    >
      <option v-for="{ id, label } in phoneTypes" :key="id" :value="id">
        {{ label }}
      </option>
    </Select>
    <button
      class="form-group-close-btn"
      title="Retirer le numéro de téléphone"
      @click.stop="emitDelete"
    >
      Retirer
    </button>
  </div>
</template>

<script setup>
import { phoneTypes, countryCodes } from "../store";
import { phoneModel } from "../models";
const props = defineProps({
  index: Number,
  phone: {
    type: Object,
    required: false,
    default() {
      return { ...phoneModel };
    },
  },
});

const emit = defineEmits(["update:phone", "delete:phone"]);

function emitPhoneUpdate(key, value) {
  let phone = { ...props.phone };
  phone[key] = value;
  emit("update:phone", phone);
}

function emitDelete() {
  emit("delete:phone");
}
</script>
