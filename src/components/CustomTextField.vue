<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps([
  "fieldRules",
  "errors",
  "title",
  "label",
  "placeholder",
  "name",
  "type",
  "hidden",
  "value",
  "modelValue",
]);

const emit = defineEmits(["update:modelValue"]);

const handleInput = (value) => {
  emit("update:modelValue", value);
};

const hasErrors = ref(props.errors?.length > 0 || false);
</script>

<template>
  <div class="block">
    <v-text-field
      :label="label"
      filled
      dense
      :name="name"
      :type="type"
      :rules="fieldRules"
      :placeholder="placeholder"
      :value="modelValue"
      required
      @update:modelValue="handleInput"
    ></v-text-field>
  </div>
</template>
